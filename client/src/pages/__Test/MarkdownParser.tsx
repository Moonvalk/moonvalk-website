import { ReactElement, createElement } from "react";
import { ImageComponent } from "../../components/Image/ImageComponent";

const enum MARKDOWN_TOKEN {
    PARAGRAPH,
    BREAK,
    ITALIC,
    BOLD,
    UNDERLINE,
    STRIKETHROUGH,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    BLOCKQUOTE,
    HORIZONTAL_RULE,
    CODE,
    ORDERED_LIST,
    UNORDERED_LIST,
    LINK_TITLE,
    LINK,
    IMAGE,
    HTML,
}

const MARKDOWN_EXPRESSIONS: Record<string, MARKDOWN_TOKEN> = {
    '*': MARKDOWN_TOKEN.ITALIC,
    '**': MARKDOWN_TOKEN.BOLD,
    '_': MARKDOWN_TOKEN.UNDERLINE,
    '__': MARKDOWN_TOKEN.STRIKETHROUGH,
    '#': MARKDOWN_TOKEN.H1,
    '##': MARKDOWN_TOKEN.H2,
    '###': MARKDOWN_TOKEN.H3,
    '####': MARKDOWN_TOKEN.H4,
    '#####': MARKDOWN_TOKEN.H5,
    '######': MARKDOWN_TOKEN.H6,
    '>': MARKDOWN_TOKEN.BLOCKQUOTE,
    '___': MARKDOWN_TOKEN.HORIZONTAL_RULE,
    '`': MARKDOWN_TOKEN.CODE,
    '-': MARKDOWN_TOKEN.UNORDERED_LIST,
    '![': MARKDOWN_TOKEN.IMAGE,
    '[': MARKDOWN_TOKEN.LINK,
    '<[': MARKDOWN_TOKEN.HTML,
};

const MARKDOWN_COMPONENTS = new Map<MARKDOWN_TOKEN, string | React.FunctionComponent>([
    [MARKDOWN_TOKEN.PARAGRAPH, 'p'],
    [MARKDOWN_TOKEN.BREAK, 'br'],
    [MARKDOWN_TOKEN.ITALIC, 'i'],
    [MARKDOWN_TOKEN.BOLD, 'b'],
    [MARKDOWN_TOKEN.UNDERLINE, 'u'],
    [MARKDOWN_TOKEN.STRIKETHROUGH, 's'],
    [MARKDOWN_TOKEN.H1, 'h1'],
    [MARKDOWN_TOKEN.H2, 'h2'],
    [MARKDOWN_TOKEN.H3, 'h3'],
    [MARKDOWN_TOKEN.H4, 'h4'],
    [MARKDOWN_TOKEN.H5, 'h5'],
    [MARKDOWN_TOKEN.H6, 'h6'],
    [MARKDOWN_TOKEN.BLOCKQUOTE, 'blockquote'],
    [MARKDOWN_TOKEN.HORIZONTAL_RULE, 'hr'],
    [MARKDOWN_TOKEN.CODE, 'code'],
    [MARKDOWN_TOKEN.UNORDERED_LIST, 'li'],
    [MARKDOWN_TOKEN.IMAGE, ImageComponent],
    [MARKDOWN_TOKEN.LINK, 'a'],
    [MARKDOWN_TOKEN.HTML, 'div'],
]);

interface IMarkdownBlock {
    type: MARKDOWN_TOKEN,
    content?: (string | IMarkdownBlock)[],
    data?: string[],
    className?: string,
}

const NEW_LINE_EXPRESSION = /(?:\r|\n|\r\n)/g;
const MAXIMUM_EXPRESSION_LENGTH = 6;

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
     * The current set of block data.
     */
    protected blocks: IMarkdownBlock[];

    /**
     * The current set of tokens applied to generate block data.
     */
    protected tokens: MARKDOWN_TOKEN[];

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
        this.blocks = [];
        
        // Split each line and feed it into our converter. This will build a tree of markdown blocks that can
        // be used as instructions to create ReactElements.
        const lines = input_.split(NEW_LINE_EXPRESSION);
        this.convertMarkdownToBlocks(lines);

        // Create each block as a ReactElement.
        const elements: ReactElement[] = [];
        this.blocks.forEach((block: IMarkdownBlock) => {
            elements.push(this.renderBlock(block));
        });

        return (
            <>
                {elements}
            </>
        );
    }

    protected convertMarkdownToBlocks(lines_: string[]): void {
        lines_.forEach((line: string) => {
            this.tokens = [];
            const chars = line.split('');
            this.blocks.push(this.handleCharInput(chars));
        });
    }

    protected handleCharInput(source_: string[]): IMarkdownBlock {
        if (source_.length === 0) {
            return this.generateBlock(MARKDOWN_TOKEN.BREAK, null);
        }

        let content: (string | IMarkdownBlock)[] = [];
        let parameterData;
        let currentRead = '';
        while (source_.length > 0) {
            // Get current character and check for expressions.
            let char = source_.shift();
            let match = MARKDOWN_EXPRESSIONS[char];
            let charsToCheck = MAXIMUM_EXPRESSION_LENGTH;
            while (charsToCheck > 0) {
                const extendedMatch = MARKDOWN_EXPRESSIONS[char + source_[0]];
                if (extendedMatch) {
                    char += source_.shift();
                    match = extendedMatch;
                }
                charsToCheck--;
            }

            if (match) {
                if (this.tokens.includes(match)) {
                    this.tokens.splice(this.tokens.findIndex(value => value === match));
                    content.push(currentRead);
                    currentRead = '';
                    return this.generateBlock(match, content);
                } else {
                    if (currentRead !== '') {
                        content.push(currentRead);
                    }
                    currentRead = '';
                    this.tokens.push(match);
                    switch (match) {
                        default:
                            
                            break;
                        case MARKDOWN_TOKEN.IMAGE:
                        case MARKDOWN_TOKEN.LINK:
                        case MARKDOWN_TOKEN.HTML:
                            const data = this.appendStringUntilCharacter(source_, ']').split(',');
                            parameterData = [...data];
                            content.push(this.generateBlock(match, null, parameterData));
                    }
                    if (source_.length > 0) {
                        content.push(this.handleCharInput(source_));
                    }
                }
            } else {
                currentRead += char;
            }
        }
        if (currentRead !== '') {
            content.push(currentRead);
        }
        const token = (this.tokens.length > 0 ?
            this.tokens[0] : MARKDOWN_TOKEN.PARAGRAPH);
        for (let index = 0; index < content.length; index++) {
            const item = content[index];
            if (typeof item !== 'string') {
                if (item.type === token && item.content) {
                    content = item.content;
                    parameterData = item.data;
                    break;
                }
            }
        }
        return this.generateBlock(token, content, parameterData);
    }

    protected appendStringUntilCharacter(source_: string[], char_: string): string {
        let output = '';
        while (source_.length > 0) {
            if (source_[0] === char_) {
                source_.shift();
                return output;
            }
            output += source_.shift();
        }
        return output;
    }

    /**
     * Called to generate a new block and place it into the current tree.
     * @param {MARKDOWN_TOKEN} type_ - The type of markdown element that will be placed represented by a token.
     * @param {(string | IMarkdownBlock)[]} content_ - The content to be placed within this block.
     * @param {string[]} data_ - Additional data sent dependent on type of token.
     * @return {void} void
     */
    protected generateBlock(type_: MARKDOWN_TOKEN, content: (string | IMarkdownBlock)[], data_?: string[]): IMarkdownBlock {
        const block: IMarkdownBlock = {
            type: type_,
            content: content?.length > 0 ? content : null,
            data: data_,
        };
        return block;
    }

    /**
     * Called to render the current block and all children as ReactElements.
     * @param block_ - The block to be rendered.
     * @return {ReactElement} A parent element with a tree of all children blocks represented as JSX.
     */
    protected renderBlock(block_: IMarkdownBlock): ReactElement {
        const component = MARKDOWN_COMPONENTS.get(block_.type);
        if (typeof component === 'undefined') {
            return;
        } else {
            const getChild = (content_: string | IMarkdownBlock): string | ReactElement => {
                if (!content_) {
                    return null;
                }
                return (typeof content_ === 'string' ? content_ : this.renderBlock(content_));
            }
            const key = 'element_' + (++MarkdownParser._instance.keyCount);

            switch (component) {
                case ImageComponent:
                    return (
                        <ImageComponent key={key} alt={block_.data[0]} source={block_.data[1]} />
                    );
                case 'a':
                    return (
                        <a key={key} href={block_.data[1]}>{block_.data[0]}</a>
                    );
                case 'div':
                    return (
                        <div key={key} dangerouslySetInnerHTML={{__html: block_.data[0]}} />
                    );
                default:
                    return createElement(component, {
                        key: key,
                        },
                        block_.content && block_.content?.map((node) => getChild(node))
                    );
            }
        }
    }
}
