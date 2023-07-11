import { ReactElement, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { userAuthStore, ACCESS_LEVEL } from "../../stores/User";
import { getServerURI } from "../../utils/URIHelper";
import { SmartSuspense } from "../SmartSuspense/SmartSuspense";
import { UniversalLoader } from "../SmartSuspense/UniversalLoader";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import './Layout.css';

/**
 * Called to generate a general page layout for all base pages.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function Layout(): ReactElement {
    /**
     * Data and setters pulled from the user authentication store.
     */
    const {userInfo, setUserInfo, userLoggedIn, setUserLoggedIn} = userAuthStore();

    /**
     * Called on page initial load before paint to request user data.
     */
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
            <div className='page_container'>
                {userLoggedIn && (
                    <div className='margin_header' />
                )}
                <SmartSuspense fallback={<UniversalLoader />}>
                    <Outlet />
                </SmartSuspense>
            </div>
            <Footer />
        </main>
    );
}
