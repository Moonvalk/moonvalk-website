import { ReactElement } from "react";

/**
 * Called to generate an icon component for display.
 * @return {ReactElement} The SVG icon represented as a JSX element.
 */
export function ImportantIcon(): ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
            <path d="M12 9v4"></path>
            <path d="M12 16v.01"></path>
        </svg>
    );
}
