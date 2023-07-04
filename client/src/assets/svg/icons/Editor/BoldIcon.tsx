import { ReactElement } from "react";

/**
 * Called to generate an icon component for display.
 * @return {ReactElement} The SVG icon represented as a JSX element.
 */
export function BoldIcon(): ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <title>Bold</title>
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z"></path>
            <path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7"></path>
        </svg>
    );
}
