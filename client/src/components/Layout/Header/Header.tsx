import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { ACCESS_LEVEL, userAuthStore } from "../../../stores/userAuth.store";
import { getServerURI } from "../../../utils/URIHelper";
import { LogoutIcon } from "../../../assets/svg/icons/Actions";
import { MenuToggle, DashboardIcon, NewPostIcon, SettingsIcon } from "../../../assets/svg/icons/Menus";
import { PrimaryNavigation } from "../Navigation/PrimaryNavigation";
import './Header.css';

export function Header(): ReactElement {
    const {userInfo, setUserInfo, userLoggedIn, setUserLoggedIn} = userAuthStore();

    function toggleNavigation(forceState?: boolean): void {
        const mobileNavigation = document.querySelector('.mobile-navigation');
        const navigationToggle = document.querySelector('.mobile-nav-toggle');
        let newState: string;
        if (forceState === undefined) {
            const visibility = mobileNavigation.getAttribute('data-visible');
            newState = (visibility === "false") ? "true" : "false";
        } else {
            newState = (forceState) ? "true" : "false";
        }
        
        mobileNavigation.setAttribute('data-visible', newState);
        navigationToggle.setAttribute('data-visible', newState);
        navigationToggle.setAttribute('aria-expanded', newState);
    }

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
                        <div className="vertical-break" />
                        <Link to='/login' onClick={handleLogout}><LogoutIcon />Logout</Link>
                    </div>
                </div>
            )}
        </>
    );
}

