import { PropsWithChildren, ReactElement, useLayoutEffect, useState } from "react";
import { PageTitle } from "./PageTitle";
import { Navigate } from "react-router-dom";
import { ACCESS_LEVEL, userAuthStore } from "../../stores/User";

/**
 * Properties available to a base PageTemplate component.
 */
interface IPageTemplateProps {
    /**
     * The title to be displayed on this page.
     */
    title?: string,

    /**
     * An icon to be displayed with the title on this page.
     */
    icon?: React.ReactNode,

    /**
     * Flag that when false will hide the page header with title and icon.
     */
    hideHeader?: boolean,

    /**
     * The access level required by a user to view this page. When an access level threshold is not
     * met the user will be redirected to a login / 404 page.
     */
    accessLevel?: ACCESS_LEVEL,

    /**
     * An optional surrounding element to wrap page contents in. This is the name of a class such
     * as 'page_large' or 'page_small'.
     */
    pageWrap?: string,
}

/**
 * Generates a new page template component for displaying most basic page elements.
 * @param {PropsWithChildren<IPageTemplateProps>} props_ - Properties used to define how this template displays itself.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PageTemplate(props_: PropsWithChildren<IPageTemplateProps>): ReactElement {
    /**
     * Handles determining whether the current user is authorized to view this page.
     */
    const [authorized, setAuthorized] = useState(true);

    /**
     * Stores the URI that will be used for redirects when authorization fails.
     */
    const [redirectPage, setRedirectPage] = useState('/404');

    /**
     * Gathers user info pulled on page load from the user auth store.
     */
    const {userInfo, userLoggedIn} = userAuthStore();

    /**
     * Called on initial page load before paint to handle authorization for this page.
     */
    useLayoutEffect(() => {
        function handleSetAuthorization(): void {
            if (userInfo === null || props_.accessLevel === undefined) {
                return;
            }
            if (userInfo.accessLevel >= props_.accessLevel) {
                setAuthorized(true);
                return;
            }
            setAuthorized(false);
            setRedirectPage(userLoggedIn ? '/404' : '/login');
        }
        handleSetAuthorization();
    }, [userInfo]);

    // In the event the user is not authorized, push them to the redirect.
    if (!authorized) {
        return <Navigate to={redirectPage} />;
    }

    return (
        <div className='content'>
            <PageTitle title={props_.title} />
            {!props_.hideHeader && (
                <>
                    <div className='margin_header' />
                    <h1 className='page-title'>
                        {props_.icon ?? props_.icon}
                        {props_.title}
                    </h1>
                    <hr className={props_.pageWrap === 'page_large' ? 'hr_fade' : 'hr_small'} />
                </>
            )}
            {props_.pageWrap && (
                <div className={props_.pageWrap}>
                    {props_.children}
                </div>
            )}
            {!props_.pageWrap && (
                <>
                    {props_.children}
                </>
            )}
        </div>
    );
}
