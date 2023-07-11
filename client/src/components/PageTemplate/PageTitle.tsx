import { ReactElement, useLayoutEffect } from "react";
import { getPageTitle } from "../../utils/URIHelper";

/**
 * Properties used for setting page titles.
 */
interface IPageTitleProps {
    /**
     * The title of this page.
     */
    title?: string,
}

/**
 * Generates a new PageTitle component that will not render. This simply adjusts the tab name for the current page.
 * @param {IPageTitleProps} props_ - Properties object used to set page title attributes.
 * @return {ReactElement} A new JSX element.
 */
export function PageTitle(props_: IPageTitleProps): ReactElement {
    /**
     * Called on page load before initial paint to establish page title.
     */
    useLayoutEffect(() => {
        document.title = getPageTitle(props_.title);
    }, []);

    // Return a blank element as we have nothing to render here.
    return (
        <>
        </>
    );
}
