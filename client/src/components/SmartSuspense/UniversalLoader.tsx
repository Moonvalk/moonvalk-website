import { ReactElement } from "react";

/**
 * Generates a universal loader element for display while awaiting pages and other elements to load.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function UniversalLoader(): ReactElement {
    return (
        <div className='loader'>
            <div className='loader_spinner'></div>
        </div>
    );
}
