import { ImageComponent } from "../../components/Image/ImageComponent";
import { PromptElement } from "../../components/Prompt/PromptElement";
import { MARKDOWN_TOKEN } from "./MarkdownToken";

/**
 * A record of all available markdown expressions to be parsed from text.
 */
export const MARKDOWN_EXPRESSIONS: Record<string, MARKDOWN_TOKEN> = {
    '*': MARKDOWN_TOKEN.ITALIC,
    '**': MARKDOWN_TOKEN.BOLD,
    '~': MARKDOWN_TOKEN.UNDERLINE,
    '~~': MARKDOWN_TOKEN.STRIKETHROUGH,
    '^^1': MARKDOWN_TOKEN.H1,
    '^^2': MARKDOWN_TOKEN.H2,
    '^^3': MARKDOWN_TOKEN.H3,
    '^^4': MARKDOWN_TOKEN.H4,
    '^^5': MARKDOWN_TOKEN.H5,
    '^^6': MARKDOWN_TOKEN.H6,
    '+>': MARKDOWN_TOKEN.BLOCKQUOTE,
    '+[': MARKDOWN_TOKEN.PROMPT,
    '---': MARKDOWN_TOKEN.HORIZONTAL_RULE,
    '`': MARKDOWN_TOKEN.CODE,
    '+': MARKDOWN_TOKEN.UNORDERED_LIST,
    '![': MARKDOWN_TOKEN.IMAGE,
    '[': MARKDOWN_TOKEN.LINK,
    '!![': MARKDOWN_TOKEN.HTML,
    '$[': MARKDOWN_TOKEN.CLASS,
    ']': MARKDOWN_TOKEN.CLOSING,
};

/**
 * A map of all markdown components to be created by token type.
 */
export const MARKDOWN_COMPONENTS = new Map<MARKDOWN_TOKEN, string | React.FunctionComponent>([
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
    [MARKDOWN_TOKEN.CLASS, 'span'],
    [MARKDOWN_TOKEN.PROMPT, PromptElement],
]);

/**
 * A map containing matching pairs of markdown expressions for closing tags.
 */
export const MARKDOWN_MATCHING_PAIRS = new Map<string, MARKDOWN_TOKEN[]>([
    [']', [
        MARKDOWN_TOKEN.CLOSING,
        MARKDOWN_TOKEN.IMAGE,
        MARKDOWN_TOKEN.LINK,
        MARKDOWN_TOKEN.HTML,
        MARKDOWN_TOKEN.CLASS,
        MARKDOWN_TOKEN.PROMPT,
    ]],
]);

/**
 * A character used to split parameter data sections within links, images, html, and class tokens.
 */
export const PARAMETER_DATA_SPLIT_CHARACTER = '&;';
