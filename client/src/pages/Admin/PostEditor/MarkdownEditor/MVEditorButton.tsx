import { ReactElement } from "react";
import { MARKDOWN_TOKEN } from "../../../../utils/Markdown/MarkdownToken";
import { MARKDOWN_EXPRESSIONS } from "../../../../utils/Markdown/MarkdownExpressions";

// export const enum EDITOR_ADJUSTMENT {
//     GENERATE = 'generate',
//     ITALICIZE = '*/*',
//     BOLD = '**/**',
//     UNDERLINE = '_/_',
//     STRIKETHROUGH = '__/__',
//     CLASS = '$[/]',

// }

// function getMarkdownExpression(token_: MARKDOWN_TOKEN): string {
//     return Object.keys(MARKDOWN_EXPRESSIONS).find(key => MARKDOWN_EXPRESSIONS[key] === token_);
// }

// export const MAP_OF_EDITOR_ADJUSTMENTS = new Map<EDITOR_ADJUSTMENT, string[]>([
//     [EDITOR_ADJUSTMENT.GENERATE, ['generate']],
//     [EDITOR_ADJUSTMENT.ITALICIZE, [getMarkdownExpression(MARKDOWN_TOKEN.ITALIC)]],
//     [EDITOR_ADJUSTMENT.BOLD, [getMarkdownExpression(MARKDOWN_TOKEN.BOLD)]],
//     [EDITOR_ADJUSTMENT.UNDERLINE, [getMarkdownExpression(MARKDOWN_TOKEN.UNDERLINE)]],
//     [EDITOR_ADJUSTMENT.STRIKETHROUGH, [getMarkdownExpression(MARKDOWN_TOKEN.STRIKETHROUGH)]],
//     [EDITOR_ADJUSTMENT.CLASS, [getMarkdownExpression(MARKDOWN_TOKEN.CLASS),
//         getMarkdownExpression(MARKDOWN_TOKEN.CLOSING)]],
//     [EDITOR_ADJUSTMENT.GENERATE, ['generate']],
//     [EDITOR_ADJUSTMENT.GENERATE, ['generate']],
// ])

// interface IMVEditorButtonProps {
//     title: string,
// }

// export function MVEditorButton(): ReactElement {
//     return (

//     );
// }
