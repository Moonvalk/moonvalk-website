import { ReactElement, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { userAuthStore, ACCESS_LEVEL } from "../../stores/User";
import { getServerURI } from "../../utils/URIHelper";
import { SmartSuspense } from "../SmartSuspense/SmartSuspense";
import { UniversalLoader } from "../SmartSuspense/UniversalLoader";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import './Layout.css';

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