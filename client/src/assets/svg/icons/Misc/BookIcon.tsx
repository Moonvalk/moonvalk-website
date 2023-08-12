import { ReactElement } from "react";

/**
 * Called to generate an icon component for display.
 * @return {ReactElement} The SVG icon represented as a JSX element.
 */
export function BookIcon(): ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
            <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
            <path d="M3 6l0 13"></path>
            <path d="M12 6l0 13"></path>
            <path d="M21 6l0 13"></path>
        </svg>
    );
}
