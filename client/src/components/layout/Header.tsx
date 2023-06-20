import { ReactElement, useState } from "react";
import './Header.css';
import { Link } from "react-router-dom";
import { MenuToggle } from "../icons/MenuToggle";
import { DashboardIcon } from "../icons/DashboardIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import { PrimaryNavigation } from "./PrimaryNavigation";
import { NewPostIcon } from "../icons/NewPostIcon";

export default function Header(): ReactElement {
    const [admin, setAdmin] = useState(true);

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
            {admin && (
                <div className='user-navigation'>
                    <div className='user-links'>

                            <Link to='/'><DashboardIcon />Dashboard</Link>
                            <Link to='/'><NewPostIcon />New Post</Link>

                        <div className="socials-break"></div>
                        <Link to='/'><LogoutIcon />Logout</Link>
                    </div>
                </div>
            )}
        </>
    );
}

