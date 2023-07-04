import { ReactElement } from "react";

/**
 * Called to generate an icon component for display.
 * @return {ReactElement} The SVG icon represented as a JSX element.
 */
export function UnorderedListIcon(): ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <title>Unordered List</title>
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 6l11 0"></path>
            <path d="M9 12l11 0"></path>
            <path d="M9 18l11 0"></path>
            <path d="M5 6l0 .01"></path>
            <path d="M5 12l0 .01"></path>
            <path d="M5 18l0 .01"></path>
        </svg>
    );
}
