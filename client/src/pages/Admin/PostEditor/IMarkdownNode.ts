import { MARKDOWN_TOKEN } from "./MarkdownToken";

export interface IMarkdownNode {
    type: MARKDOWN_TOKEN,
    content?: (string | IMarkdownNode)[],
    data?: string[],
    className?: string,
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
