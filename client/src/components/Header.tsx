import { ReactElement } from "react";
import './Header.css';
import { Link } from "react-router-dom";
import { MenuToggle } from "./icons/MenuToggle";
import { GamesIcon } from "./icons/GamesIcon";
import { NewsIcon } from "./icons/NewsIcon";
import { ComicsIcon } from "./icons/ComicsIcon";
import { AboutIcon } from "./icons/AboutIcon";

export default function Header(): ReactElement {

    function toggleNavigation(forceState?: boolean): void {
        const primaryNavigation = document.querySelector('.primary-navigation');
        const navigationToggle = document.querySelector('.mobile-nav-toggle');
        let newState: string;
        if (forceState === undefined) {
            const visibility = primaryNavigation.getAttribute('data-visible');
            newState = (visibility === "false") ? "true" : "false";
        } else {
            newState = (forceState) ? "true" : "false";
        }
        
        primaryNavigation.setAttribute('data-visible', newState);
        navigationToggle.setAttribute('data-visible', newState);
        navigationToggle.setAttribute('aria-expanded', newState);
    }

    return (
        <>
            <header className="primary-header flex">
                <button onClick={() => toggleNavigation()} className="mobile-nav-toggle" data-visible="false" aria-controls="primary-navigation" aria-expanded="false">
                    <span className="sr-only">Menu</span>
                    <MenuToggle />
                </button>
                <Link to={`/`}>
                    <div className="logo"></div>
                </Link>
                <nav>
                    <ul id="primary-navigation" data-visible="false" className="primary-navigation flex">
                        <li><Link onClick={() => toggleNavigation(false)} to={`/games`}>
                                <GamesIcon />
                                <span>Games</span>
                            </Link></li>
                        <li><Link onClick={() => toggleNavigation(false)} to={`/news`}>
                                <NewsIcon />
                                <span>News</span>
                            </Link></li>
                        <li><Link onClick={() => toggleNavigation(false)} to={`/comics`}>
                                <ComicsIcon />
                                <span>Comics</span>
                            </Link></li>
                        <li><Link onClick={() => toggleNavigation(false)} to={`/about`}>
                                <AboutIcon />
                                <span>About</span>
                            </Link></li>
                    </ul>
                </nav>
                {/* <div className='user-navigation'>
                    <p>Logged in as moonvalk</p>
                    <Link to='/'>Dashboard</Link>
                </div> */}
            </header>
            <div className="header-rgb"></div>
        </>
    );
}

