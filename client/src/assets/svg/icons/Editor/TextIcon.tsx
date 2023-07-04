import { ReactElement } from "react";

/**
 * Called to generate an icon component for display.
 * @return {ReactElement} The SVG icon represented as a JSX element.
 */
export function TextIcon(): ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <title>Text</title>
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
            <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
            <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
            <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
            <path d="M12 16v-7"></path>
            <path d="M9 9h6"></path>
        </svg>
    );
}
