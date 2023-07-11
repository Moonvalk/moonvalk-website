import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { userAuthStore, ACCESS_LEVEL } from "../../../stores/User";
import { getServerURI } from "../../../utils/URIHelper";
import { LogoutIcon } from "../../../assets/svg/icons/Actions";
import { MenuToggle, DashboardIcon, NewPostIcon, SettingsIcon } from "../../../assets/svg/icons/Menus";
import { PrimaryNavigation } from "../Navigation/PrimaryNavigation";
import './Header.css';

/**
 * Called to generate a new header element for display on base pages.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function Header(): ReactElement {
    /**
     * Authentication data pulled from the user auth store.
     */
    const {userInfo, setUserInfo, userLoggedIn, setUserLoggedIn} = userAuthStore();

    /**
     * Toggles the navigation state for mobile.
     * @param {boolean} forceState_ - Optional ability to force the navigation menu on or off.
     * @return {void} void
     */
    function toggleNavigation(forceState_?: boolean): void {
        const mobileNavigation = document.querySelector('.mobile-navigation');
        const navigationToggle = document.querySelector('.mobile-nav-toggle');
        let newState: string;
        if (forceState_ === undefined) {
            const visibility = mobileNavigation.getAttribute('data-visible');
            newState = (visibility === "false") ? "true" : "false";
        } else {
            newState = (forceState_) ? "true" : "false";
        }
        
        mobileNavigation.setAttribute('data-visible', newState);
        navigationToggle.setAttribute('data-visible', newState);
        navigationToggle.setAttribute('aria-expanded', newState);
    }

    /**
     * Called to handle logging the current user out.
     * @return {Promise<void>} void
     */
    async function handleLogout(): Promise<void> {
        const response = await fetch(getServerURI('api/logout'), {
            credentials: 'include',
            method: 'POST',
        });
        if (!response.ok) {
            alert('Failed to log out.');
        }
        setUserLoggedIn(false);
        setUserInfo(null);
    }

    return (
        <>
            <PrimaryNavigation isMobile={true} onPageSelect={() => toggleNavigation(false)} />
            <header className="primary-header">
                <button onClick={() => toggleNavigation()} className="mobile-nav-toggle" data-visible="false" aria-controls="primary-navigation" aria-expanded="false">
                    <span className="sr-only">Menu</span>
                    <MenuToggle />
                </button>
                <Link to={`/`}>
                    <div className="logo"></div>
                </Link>
                <PrimaryNavigation isMobile={false} onPageSelect={() => toggleNavigation(false)} />
            </header>
            <div className="header-rgb"></div>
            {userLoggedIn && (
                <div className='user-navigation'>
                    <div className='user-links'>
                        {userInfo?.accessLevel >= ACCESS_LEVEL.ADMIN && (
                            <>
                                <Link to='/dashboard'><DashboardIcon />Dashboard</Link>
                                <Link to='/create'><NewPostIcon />New Post</Link>
                            </>
                        )}
                        <Link to='/settings'><SettingsIcon />Settings</Link>
                        <div className="break_vertical" />
                        <Link to='/login' onClick={handleLogout}><LogoutIcon />Logout</Link>
                    </div>
                </div>
            )}
        </>
    );
}

