import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { AboutIcon } from "./icons/AboutIcon";
import { ComicsIcon } from "./icons/ComicsIcon";
import { GamesIcon } from "./icons/GamesIcon";
import { NewsIcon } from "./icons/NewsIcon";

export interface IPrimaryNavigationProps {
    onPageSelect: () => void,
    isMobile: boolean,
}

export function PrimaryNavigation(props: IPrimaryNavigationProps): ReactElement {
    return (
        <nav className={props.isMobile ? 'show-mobile' : 'hide-mobile'}>
            <ul id="primary-navigation" data-visible="false" className={
                props.isMobile ? "mobile-navigation primary-navigation flex" : "primary-navigation flex"}>
                <li><Link onClick={props.onPageSelect} to={`/games`}>
                        <GamesIcon />
                        <span>Games</span>
                    </Link></li>
                <li><Link id='news' onClick={props.onPageSelect} to={`/news`}>
                        <NewsIcon />
                        <span>News</span>
                    </Link></li>
                <li><Link onClick={props.onPageSelect} to={`/comics`}>
                        <ComicsIcon />
                        <span>Comics</span>
                    </Link></li>
                <li><Link onClick={props.onPageSelect} to={`/about`}>
                        <AboutIcon />
                        <span>About</span>
                    </Link></li>
            </ul>
        </nav>
    );
}
