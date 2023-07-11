
/**
 * All available tokens to be represented as nodes within a markdown post tree.
 */
export const enum MARKDOWN_TOKEN {
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
    CLASS,
    CLOSING,
    PROMPT,
}
