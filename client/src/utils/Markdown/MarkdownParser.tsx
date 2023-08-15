import { ReactElement, createElement } from "react";
import { IMarkdownMatchData, IMarkdownNode } from "./IMarkdownNode";
import { MARKDOWN_EXPRESSIONS, MARKDOWN_COMPONENTS, MARKDOWN_MATCHING_PAIRS, PARAMETER_DATA_SPLIT_CHARACTER } from "./MarkdownExpressions";
import { MARKDOWN_TOKEN } from "./MarkdownToken";
import { InfoIcon } from "../../assets/svg/icons/Misc";
import { ImageComponent } from "../../components/Image/ImageComponent";
import { MAP_OF_ICON_COMPONENTS, ICON_COMPONENT } from "../IconMap";
import { PromptElement } from "../../components/Prompt/PromptElement";
import { StringHelper } from "../StringHelper";

/**
 * Object used for parsing custom format markdown text used primarily for news post content.
 */
export class MarkdownParser {
    /**
     * The singleton instance of this manager.
     */
    protected static _instance: MarkdownParser;

    /**
     * Keeps track of the key counter used for generating new key ids as ReactElements are made.
     */
    protected keyCount: number = 0;

    /**
     * The current set of markdown data represented as a tree of nodes.
     */
    protected nodes: IMarkdownNode[];

    /**
     * The current set of tokens applied to generate block data.
     */
    protected tokens: MARKDOWN_TOKEN[];

    /**
     * Stores reference to the maximum character length of any given singular expression to check for.
     */
    protected maximumExpressionLength: number = 1;

    /**
     * Default constructor.
     */
    public constructor() {
        // Determine maximum expression length to check for based on expression record data.
        const allExpressions = Object.keys(MARKDOWN_EXPRESSIONS);
        allExpressions.forEach((expression: string) => {
            if (expression.length > this.maximumExpressionLength) {
                this.maximumExpressionLength = expression.length;
            }
        });
    }

    /**
     * Gets the singleton instance of this manager or creates a new one.
     * @return {MarkdownParser} The instance of this manager.
     */
    public static get instance(): MarkdownParser {
        if (!MarkdownParser._instance) {
            MarkdownParser._instance = new MarkdownParser();
        }
        return MarkdownParser._instance;
    }

    /**
     * Called to render the input markdown string as a series of React Elements.
     * @param {string} input_ - The input markdown text for generating.
     * @return {ReactElement} A parent ReactElement representing a parsed tree of data.
     */
    public renderMarkdown(input_: string): ReactElement {
        if (input_ === '') {
            return;
        }

        // Reset tokens and block data for new input.
        this.tokens = [];
        this.nodes = [];
        
        // Split each line and feed it into our converter. This will build a tree of markdown blocks that can
        // be used as instructions to create ReactElements.
        input_ = input_.replace(/(?:\r)/g, '');
        const lines = input_.split(StringHelper.expressions.newLine);
        this.convertMarkdownToNodes(lines);

        // Create each block as a ReactElement.
        const elements: ReactElement[] = [];
        this.nodes.forEach((block: IMarkdownNode) => {
            elements.push(this.renderNode(block));
        });

        return (
            <div>
                {elements}
            </div>
        );
    }

    /**
     * Converts input markdown source into a node tree used for rendering as ReactElements.
     * @param {string[]} lines_ - Individual lines of markdown to be parsed.
     * @return {void} void
     */
    protected convertMarkdownToNodes(lines_: string[]): void {
        lines_.forEach((line: string) => {
            this.tokens = [];
            const chars = line.split('');
            if (chars.length === 0) {
                this.nodes.push(this.generateNode(MARKDOWN_TOKEN.BREAK, null));
            }
            this.nodes.push(this.handleCharInput(chars));
        });
    }

    /**
     * Handles parsing individual character array output generated from a markdown post.
     * @param {string[]} source_ - The source character array to parse into blocks.
     * @return {IMarkdownNode} Provides a new markdown node for rendering.
     */
    protected handleCharInput(source_: string[]): IMarkdownNode {
        let content: (string | IMarkdownNode)[] = [];
        let currentRead = '';
        const pushCurrentRead = () => {
            if (currentRead !== '') {
                content.push(currentRead);
            }
            currentRead = '';
        };

        while (source_.length > 0) {
            // Parse for any expression matches via current stream of characters.
            const parseData = this.getExpressionMatch(source_);

            // Handle match scenarios now.
            if (parseData.tokenMatch) {
                if (this.isTokenClosingTag(parseData)) {
                    // This match was previously tokenized so we know this is a closing tag.
                    this.spliceLatestMatchingToken(parseData.tokenMatch);
                    
                    let parameterData: string[];
                    switch (parseData.tokenMatch) {
                        case MARKDOWN_TOKEN.LINK:
                        case MARKDOWN_TOKEN.HTML:
                        case MARKDOWN_TOKEN.PROMPT:
                            parameterData = currentRead.split(PARAMETER_DATA_SPLIT_CHARACTER);
                            currentRead = '';
                            break;
                        case MARKDOWN_TOKEN.CLASS:
                            if (typeof content[0] === 'string') {
                                parameterData = content[0].split(PARAMETER_DATA_SPLIT_CHARACTER);
                                content[0] = parameterData[1];
                            } else {
                                parameterData = currentRead.split(PARAMETER_DATA_SPLIT_CHARACTER);
                                currentRead = parameterData[1];
                            }
                            break;
                        case MARKDOWN_TOKEN.IMAGE:
                            if (typeof content[0] === 'string') {
                                parameterData = content[0].split(PARAMETER_DATA_SPLIT_CHARACTER);
                                content[0] = parameterData[2];
                            } else {
                                parameterData = currentRead.split(PARAMETER_DATA_SPLIT_CHARACTER);
                                currentRead = parameterData[2];
                            }
                            break;
                    }
                    pushCurrentRead();
                    return this.generateNode(parseData.tokenMatch, content, parameterData);
                } else {
                    // This match is new so we must push current read and tokenize this
                    // opening tag occurrence. We handle the following input as a child. 
                    pushCurrentRead();
                    this.tokens.push(parseData.tokenMatch);
                    
                    if (source_.length > 0) {
                        content.push(this.handleCharInput(source_));
                    }
                }
            } else {
                // No expression matches so we are safe to push this character into our read.
                currentRead += parseData.stream;
            }
        }

        // Generate a parent block now that all source characters have been parsed for this element.
        return this.generateParentNode(content, currentRead);
    }

    /**
     * Finds the latest stored token match and removes it from the queue considering it closed.
     * @param {MARKDOWN_TOKEN} tokenMatch_ - The token to match a closing tag for.
     * @return {void} void
     */
    protected spliceLatestMatchingToken(tokenMatch_: MARKDOWN_TOKEN): void {
        for (let index = this.tokens.length - 1; index > -1; index--) {
            if (this.tokens[index] === tokenMatch_) {
                this.tokens.splice(index, 1);
                break;
            }
        }
    }

    /**
     * Called to generate a parent block when provided source characters for a line have been
     * fully parsed for markdown expressions.
     * @param {(string | IMarkdownBlock)[]} content_ - The existing content for this node previously parsed.
     * @param {string} currentRead_ - The current read data stored as a valid non-expression string.
     * @return {IMarkdownNode} Returns a new node element used to render markdown data.
     */
    protected generateParentNode(
        content_: (string | IMarkdownNode)[],
        currentRead_: string,
    ): IMarkdownNode {
        // Add current read to content when a valid string is built.
        if (currentRead_ !== '') {
            content_.push(currentRead_);
        }

        // Determine the token used to generate this block.
        let token = (this.tokens.length > 0 ?
            this.tokens[0] : MARKDOWN_TOKEN.PARAGRAPH);
        let parameterData: string[];

        // Check to make sure that no child content uses the same token. If we happen to find
        // a child using the same token we can reassign that content now.
        for (const item of content_) {
            if (typeof item !== 'string') {
                if (item.type === token && item.content || content_.length === 1 && this.tokens.length === 0) {
                    token = item.type;
                    content_ = item.content;
                    parameterData = item.data;
                    break;
                }
            }
        }
        return this.generateNode(token, content_, parameterData);
    }

    /**
     * Handles finding any valid markdown expression matches and provides the data found.
     * @param {string[]} source_ - The source string as a character array.
     * @return {IMarkdownMatchData} Data representing any expressions found.
     */
    protected getExpressionMatch(source_: string[]): IMarkdownMatchData {
        const char = source_.shift();
        const current: IMarkdownMatchData = {
            stream: char,
            tokenMatch: MARKDOWN_EXPRESSIONS[char],
        };

        // Handle checking for extended expressions (multi-character length).
        let charsToCheck = this.maximumExpressionLength;
        let matchLength = 0;
        let phrase = char;
        while (charsToCheck > 0) {
            const currentSourceChar = this.maximumExpressionLength - charsToCheck;
            if (source_.length <= currentSourceChar) {
                break;
            }
            phrase += source_[currentSourceChar];
            const extendedMatch = MARKDOWN_EXPRESSIONS[phrase];
            if (extendedMatch) {
                // Store extended matches and the length that occurred so we can pull it out of source
                // when finished.
                current.tokenMatch = extendedMatch;
                matchLength = currentSourceChar + 1;
            }
            charsToCheck--;
        }
        for (let index = 0; index < matchLength; index++) {
            current.stream += source_.shift();
        }
        return current;
    }

    /**
     * Called to determine if the provided token is a valid closing tag based on previously stored tokens.
     * @param {IMarkdownMatchData} parseData_ - The parse data found when looking for markdown expressions.
     * @return {boolean} True when there is a valid closing tag found.
     */
    protected isTokenClosingTag(parseData_: IMarkdownMatchData): boolean {
        // Determine if this is a valid closing tag used for paired elements.
        if (parseData_.tokenMatch === MARKDOWN_TOKEN.CLOSING) {
            const matchingTokens = MARKDOWN_MATCHING_PAIRS.get(parseData_.stream);
            for (let index = this.tokens.length - 1; index > -1; index--) {
                // Only return true when this token matches a valid opening tag already tokenized.
                if (matchingTokens.includes(this.tokens[index])) {
                    parseData_.tokenMatch = this.tokens[index];
                    return true;
                }
            }
        }

        // Handle none paired closing tags now.
        if (this.tokens.includes(parseData_.tokenMatch)) {
            const matchingTokens = MARKDOWN_MATCHING_PAIRS.get(']');
            if (matchingTokens.includes(parseData_.tokenMatch)) {
                return false;
            }
            return true;
        }
        return false;
    }

    /**
     * Called to generate a new node and place it into the current tree.
     * @param {MARKDOWN_TOKEN} type_ - The type of markdown element that will be placed represented by a token.
     * @param {(string | IMarkdownNode)[]} content_ - The content to be placed within this node.
     * @param {string[]} data_ - Additional data sent dependent on type of token.
     * @return {void} void
     */
    protected generateNode(
        type_: MARKDOWN_TOKEN,
        content: (string | IMarkdownNode)[],
        data_?: string[],
    ): IMarkdownNode {
        const block: IMarkdownNode = {
            type: type_,
            content: content?.length > 0 ? content : null,
            data: data_,
        };
        return block;
    }

    /**
     * Called to render the current block and all children as ReactElements.
     * @param {IMarkdownNode} node_ - The node to be rendered.
     * @return {ReactElement} A parent element with a tree of all children blocks represented as JSX.
     */
    protected renderNode(node_: IMarkdownNode): ReactElement {
        const component = MARKDOWN_COMPONENTS.get(node_.type);
        if (typeof component === 'undefined') {
            return;
        } else {
            // Increment key count for new elements.
            const key = 'element_' + (++MarkdownParser._instance.keyCount);

            // Selectively render components based on type.
            switch (component) {
                case ImageComponent:
                    return (
                        <ImageComponent key={key} alt={node_.data[0]} source={node_.data[1]}
                            caption={node_.content && node_.content?.map((node) => this.renderMarkdownContent(node))} />
                    );
                case 'a':
                    return (
                        <a key={key} className='link_basic' href={node_.data[1]} target='_blank'>
                            {node_.data[0]}
                            {node_.content && node_.content?.map((node) => this.renderMarkdownContent(node))}
                        </a>
                    );
                case 'div':
                    return (
                        <div key={key} dangerouslySetInnerHTML={{__html: node_.data[0]}} />
                    );
                case 'span':
                    return (
                        <span key={key} className={node_.data[0]}>
                            {node_.content && node_.content?.map((node) => this.renderMarkdownContent(node))}
                        </span>
                    );
                case 'hr':
                    return (
                        <hr className='hr_small' key={key} />
                    );
                case PromptElement:
                    return (
                        <PromptElement key={key} class='tight' icon={node_.data[1] ?
                            MAP_OF_ICON_COMPONENTS.get(node_.data[1] as ICON_COMPONENT) : <InfoIcon />}
                            text={node_.content && node_.content?.map((node) => this.renderMarkdownContent(node))} />
                    )
                default:
                    return createElement(component, {
                        key: key,
                        },
                        node_.content && node_.content?.map((node) => this.renderMarkdownContent(node))
                    );
            }
        }
    }

    /**
     * Called to selectively render markdown block content or return string data when no
     * component is necessary.
     * @param {string | IMarkdownNode} content_ - The child content element to handle.
     * @return {(string | ReactElement)} The new element to be rendered.
     */
    protected renderMarkdownContent(content_: string | IMarkdownNode): (string | ReactElement) {
        if (!content_) {
            return null;
        }
        return (typeof content_ === 'string' ? content_ : this.renderNode(content_));
    }
}
