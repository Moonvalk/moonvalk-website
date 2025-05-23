import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { AppleIcon, BandcampIcon, FacebookIcon, GithubIcon, GooglePlayIcon, InstagramIcon, SteamIcon, TwitterIcon, YouTubeIcon } from "../../../assets/svg/icons/Socials";
import './Footer.css';

/**
 * Called to generate a footer element for the bottom of base pages.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function Footer(): ReactElement {
    return (
        <footer>
            {/* <div className='logo-icon'></div> */}
            <div className='footer-links'>
                <Link to={`/press`}>Press</Link>
                <Link to={`/support`}>Support</Link>
                <Link to={`/contact`}>Contact</Link>
                <Link to={`/changelog`}>Changelog</Link>
            </div>
            <div className='social-links'>
                <div className='social-links-group'>
                    <Link className="facebook" target="_blank" to="https://www.facebook.com/MoonvalkStudios">
                        <FacebookIcon />
                    </Link>
                    <Link className="youtube" target="_blank" to="https://www.youtube.com/@moonvalk3082">
                        <YouTubeIcon />
                    </Link>
                    <Link className="twitter" target="_blank" to="https://twitter.com/mnvalk">
                        <TwitterIcon />
                    </Link>
                    <Link className="instagram" target="_blank" to="https://www.instagram.com/moonvalk/">
                        <InstagramIcon />
                    </Link>
                    <div className="break_vertical hide_mobile" />
                </div>
                <div className='social-links-group'>
                    <Link className='apple' target='_blank' to='/'>
                        <AppleIcon />
                    </Link>
                    <Link className='google' target='_blank' to='/'>
                        <GooglePlayIcon />
                    </Link>
                    <Link className='steam' target="_blank" to='/'>
                        <SteamIcon />
                    </Link>
                    <div className="break_vertical" />
                    <Link className="bandcamp" target="_blank" to="https://moonvalk.bandcamp.com/">
                        <BandcampIcon />
                    </Link>
                    <Link className="github" target="_blank" to="https://github.com/Moonvalk">
                        <GithubIcon />
                    </Link>
                </div>
            </div>
            <hr className="break_footer" />
            <p className="copyright">
                &#169;2025 Moonvalk LLC. All Rights Reserved.
            </p>
        </footer>
    );
}

