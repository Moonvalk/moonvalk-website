import { ReactElement } from "react";
import './Footer.css';
import { Link } from "react-router-dom";
import { FacebookIcon } from "./icons/socials/FacebookIcon";
import { YouTubeIcon } from "./icons/socials/YouTubeIcon";
import { TwitterIcon } from "./icons/socials/TwitterIcon";
import { InstagramIcon } from "./icons/socials/InstagramIcon";
import { AppleIcon } from "./icons/socials/AppleIcon";
import { GooglePlayIcon } from "./icons/socials/GooglePlayIcon";
import { SteamIcon } from "./icons/socials/SteamIcon";
import { BandcampIcon } from "./icons/socials/BandcampIcon";
import { GithubIcon } from "./icons/socials/GithubIcon";

export default function Footer(): ReactElement {
    return (
        <footer>
            <div className='footer-links'>
                <Link to={`/press`}>Press</Link>
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
                    <div className="socials-break hide-mobile"></div>
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
                    <div className="socials-break"></div>
                    <Link className="bandcamp" target="_blank" to="https://moonvalk.bandcamp.com/">
                        <BandcampIcon />
                    </Link>
                    <Link className="github" target="_blank" to="https://github.com/Moonvalk">
                        <GithubIcon />
                    </Link>
                </div>
            </div>
            <hr className="footer-break" />
            <div className='logo-icon'></div>
            <p className="copyright">
                &#169;2023 Moonvalk Studios LLC. All Rights Reserved.
            </p>
        </footer>
    );
}

