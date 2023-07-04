import { PropsWithChildren, ReactElement, useLayoutEffect, useState } from "react";
import { PageTitle } from "./PageTitle";
import { Navigate } from "react-router-dom";
import { ACCESS_LEVEL, userAuthStore } from "../../stores/User";

interface IPageTemplateProps {
    title?: string,
    icon?: React.ReactNode,
    hideHeader?: boolean,
    accessLevel?: ACCESS_LEVEL,
    pageWrap?: string,
}

export function PageTemplate(props: PropsWithChildren<IPageTemplateProps>): ReactElement {
    const [authorized, setAuthorized] = useState(true);
    const [redirectPage, setRedirectPage] = useState('/404');
    const {userInfo, userLoggedIn} = userAuthStore();

    useLayoutEffect(() => {
        function handleSetAuthorization(): void {
            if (userInfo === null || props.accessLevel === undefined) {
                return;
            }
            if (userInfo.accessLevel >= props.accessLevel) {
                setAuthorized(true);
                return;
            }
            setAuthorized(false);
            setRedirectPage(userLoggedIn ? '/404' : '/login');
        }
        handleSetAuthorization();
    }, [userInfo]);

    if (!authorized) {
        return <Navigate to={redirectPage} />;
    }

    return (
        <div className='content'>
            <PageTitle title={props.title} />
            {!props.hideHeader && (
                <>
                    <div className='header-margin' />
                    <h1 className='page-title'>
                        {props.icon ?? props.icon}
                        {props.title}
                    </h1>
                    <hr className={props.pageWrap === 'page' ? 'hr-fade' : 'hr-small'} />
                </>
            )}
            {props.pageWrap && (
                <div className={props.pageWrap}>
                    {props.children}
                </div>
            )}
            {!props.pageWrap && (
                <>
                    {props.children}
                </>
            )}
        </div>
    )
}
