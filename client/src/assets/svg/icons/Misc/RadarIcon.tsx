import { ReactElement } from "react";

/**
 * Called to generate an icon component for display.
 * @return {ReactElement} The SVG icon represented as a JSX element.
 */
export function RadarIcon(): ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M21 12h-8a1 1 0 1 0 -1 1v8a9 9 0 0 0 9 -9"></path>
            <path d="M16 9a5 5 0 1 0 -7 7"></path>
            <path d="M20.486 9a9 9 0 1 0 -11.482 11.495"></path>
        </svg>
    );
}
