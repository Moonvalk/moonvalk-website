import { ReactElement, useLayoutEffect } from "react";
import { getPageTitle } from "../../utils/URIHelper";
import ReactGA from 'react-ga4';

// Initialize analytics manager.
ReactGA.initialize('G-DMBERNYBX8');

/**
 * Properties used for setting page metadata.
 */
interface IPageMetaProps {
    /**
     * The title of this page.
     */
    title?: string,

    /**
     * Page description to be placed within a meta tag for SEO purposes.
     */
    description?: string,
}

/**
 * A default page description used when none is provided.
 */
const DEFAULT_PAGE_DESCRIPTION = 'Moonvalk is an indie game developer and publisher focused on creating fun retro style experiences.';

/**
 * Generates a new PageMeta component that will not render. This simply adjusts the tab name
 * and metadata for the current page.
 * @param {IPageMetaProps} props_ - Properties object used to set page title attributes.
 * @return {ReactElement} A new JSX element.
 */
export function PageMeta(props_: IPageMetaProps): ReactElement {
    /**
     * Called on page load before initial paint to establish page title.
     */
    useLayoutEffect(() => {
        document.title = getPageTitle(props_.title);
        const metaElement = document.querySelector('meta[name="description"]');
        if (metaElement) {
            metaElement.setAttribute("content", `${props_.description ? props_.description : DEFAULT_PAGE_DESCRIPTION}`);
        }

        // Send analytics data.
        ReactGA.send({
            hitType: 'pageview',
            page: window.location.pathname,
            title: document.title,
        });
    }, [props_]);

    // Return a blank element as we have nothing to render here.
    return (
        <>
        </>
    );
}
