import { MARKDOWN_TOKEN } from "./MarkdownToken";

/**
 * Contract representing a singular node found in a parsed markdown tree.
 */
export interface IMarkdownNode {
    /**
     * The type of markdown token this node represents.
     */
    type: MARKDOWN_TOKEN,

    /**
     * The content found within this node. Can be child nodes or string data.
     */
    content?: (string | IMarkdownNode)[],

    /**
     * An array of additional data used to generate more complex custom markdown elements.
     * The size and contents of this variable are dependant on token type and are handled
     * case-by-case.
     */
    data?: string[],
}

/**
 * Contract that represents a singular markdown expression match.
 */
export interface IMarkdownMatchData {
    /**
     * The input string data used to generate the token.
     */
    stream: string,

    /**
     * The token that was matched.
     */
    tokenMatch?: MARKDOWN_TOKEN,
}
