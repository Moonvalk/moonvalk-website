import { PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { PageTitle } from "./PageTitle";
import { Navigate, Outlet } from "react-router-dom";
import { IUserInfo, userAuthStore } from "../../stores/userAuth.store";
import { getServerURI } from "../../utils/URIHelper";

export const enum AccessLevel {
    UNKNOWN = 0,
    USER = 1,
    MANAGER = 2,
    ADMIN = 3,
}

interface IPageTemplateProps {
    title?: string,
    icon?: React.ReactNode | undefined,
    hideHeader?: boolean,
    accessLevel?: AccessLevel | undefined,
    pageWrap?: string,
}

export function PageTemplate(props: PropsWithChildren<IPageTemplateProps>): ReactElement {
    const [authorized, setAuthorized] = useState(true);
    const [redirectPage, setRedirectPage] = useState('/404');
    const {userInfo, setUserInfo} = userAuthStore();

    useEffect(() => {
        function handleSetAuthorization(): void {
            setAuthorized(false);
            switch (props.accessLevel) {
                case AccessLevel.ADMIN:
                    if (userInfo?.administrator) {
                        console.log('Authorized this page as an admin');
                        setAuthorized(true);
                        return;
                    }
                    setRedirectPage('/login');
                    break;
                case AccessLevel.UNKNOWN:
                case AccessLevel.USER:
                case AccessLevel.MANAGER:
                default:
                    setAuthorized(true);
                    return;
            }
        }

        async function handleGetUserInfo(): Promise<void> {
            if (userInfo !== null) {
                return;
            }
            const response = await fetch(getServerURI('api/profile'));
            const userData = await response.json();
            if (userData?.id) {
                setUserInfo(userData);
                console.log('Set valid user data now');
            }
            handleSetAuthorization();
        }

        handleGetUserInfo();
    }, [setUserInfo]);

    if (!authorized) {
        return <Navigate to={redirectPage} />
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
