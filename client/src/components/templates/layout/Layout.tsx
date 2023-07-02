import { ReactElement, useEffect, useLayoutEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import './styles/Layout.css';
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SmartSuspense } from "../../loading/SmartSuspense";
import { UniversalLoader } from "../../loading/UniversalLoader";
import { ACCESS_LEVEL, userAuthStore } from "../../../stores/userAuth.store";
import { getServerURI } from "../../../utils/URIHelper";

export function Layout(): ReactElement {
    const {userInfo, setUserInfo, userLoggedIn, setUserLoggedIn} = userAuthStore();

    useLayoutEffect(() => {
        async function handleGetUserInfo(): Promise<void> {
            if (userInfo !== null) {
                return;
            }
            const response = await fetch(getServerURI('api/profile'));
            const userData = await response.json();
            if (userData?.id) {
                setUserInfo(userData);
                setUserLoggedIn(true);
            } else {
                setUserInfo({
                    id: null,
                    username: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    accessLevel: ACCESS_LEVEL.UNKNOWN,
                });
            }
        }
        handleGetUserInfo();
    }, []);

    return (
        <main>
            <Header />
            <div className='page-container'>
                {userLoggedIn && (
                    <div className='header-margin' />
                )}
                <SmartSuspense fallback={<UniversalLoader />}>
                    <Outlet />
                </SmartSuspense>
            </div>
            <Footer />
        </main>
    );
}