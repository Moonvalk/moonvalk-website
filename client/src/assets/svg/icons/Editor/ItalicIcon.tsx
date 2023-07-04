import { ReactElement } from "react";

/**
 * Called to generate an icon component for display.
 * @return {ReactElement} The SVG icon represented as a JSX element.
 */
export function ItalicIcon(): ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <title>Italic</title>
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M11 5l6 0"></path>
            <path d="M7 19l6 0"></path>
            <path d="M14 5l-4 14"></path>
        </svg>
    );
}
