import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { GamesIcon, NewsIcon, ComicsIcon, AboutIcon, ShopIcon } from "../../../assets/svg/icons/Menus";

/**
 * Properties available to the PrimaryNavigation component.
 */
interface IPrimaryNavigationProps {
    /** Callback executed when a page is selected. */
    onPageSelect: () => void,

    /** Flag that determines if this navigation is used for mobile. */
    isMobile: boolean,
}

/**
 * Called to generate a new navigation menu for display in header / mobile menus.
 * @param {IPrimaryNavigationProps} props_ - Properties used to generate this navigation.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PrimaryNavigation(props_: IPrimaryNavigationProps): ReactElement {
    return (
        <nav className={props_.isMobile ? 'show_mobile' : 'hide_mobile'}>
            <ul id="primary-navigation" data-visible="false" className={
                props_.isMobile ? "mobile-navigation primary-navigation flex" : "primary-navigation flex"}>
                <li><Link onClick={props_.onPageSelect} to={`/games`}>
                        <GamesIcon />
                        <span>Games</span>
                    </Link></li>
                <li><Link id='news' onClick={props_.onPageSelect} to={`/news`}>
                        <NewsIcon />
                        <span>News</span>
                    </Link></li>
                <li>
                    <a href='https://www.etsy.com/shop/Moonvalk' onClick={props_.onPageSelect} target="_blank">
                        <ShopIcon />
                        <span>Shop</span>
                    </a></li>
                <li><Link onClick={props_.onPageSelect} to={`/comics`}>
                        <ComicsIcon />
                        <span>Comics</span>
                    </Link></li>
                <li><Link onClick={props_.onPageSelect} to={`/about`}>
                        <AboutIcon />
                        <span>About</span>
                    </Link></li>
            </ul>
        </nav>
    );
}
