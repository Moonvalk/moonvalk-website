import { ReactElement, useEffect, useState } from "react";
import './Header.css';
import { Link } from "react-router-dom";
import { MenuToggle } from "../icons/MenuToggle";
import { DashboardIcon } from "../icons/DashboardIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import { PrimaryNavigation } from "./PrimaryNavigation";
import { NewPostIcon } from "../icons/NewPostIcon";
import { SettingsIcon } from "../icons/SettingsIcon";
import { IUserInfo, userAuthStore } from "../../stores/userAuth.store";
import { getServerURI } from "../../utils/URIHelper";

export function Header(): ReactElement {
    const {userInfo, setUserInfo} = userAuthStore();

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

    useEffect(() => {
        if (userInfo?.id) {
            return;
        }
        fetch(getServerURI('api/profile'), {
            credentials: 'include',
        }).then((response_) => {
            response_.json().then((userInfo_: IUserInfo) => {
                if (!userInfo_.id) {
                    return;
                }
                setUserInfo(userInfo_);
            });
        });
    }, [setUserInfo]);

    async function handleLogout(): Promise<void> {
        const response = await fetch(getServerURI('api/logout'), {
            credentials: 'include',
            method: 'POST',
        });
        if (!response.ok) {
            alert('Failed to log out.');
        }
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
            {userInfo !== null && (
                <div className='user-navigation'>
                    <div className='user-links'>
                        {userInfo.administrator && (
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

