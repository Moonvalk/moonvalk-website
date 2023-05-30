import { ReactElement } from "react";
import './Header.css';
import { Link } from "react-router-dom";

export default function Header(): ReactElement {
    return (
        <>
            <div className='header'>
                <input type='checkbox' id='check' />
                <label htmlFor='check' className='check-button'>
                    <i className='fas fa-bars'></i>
                </label>
                <div className='logo'></div>
                <div className='navigation'>
                    <Link to={`/`}>Home</Link>
                    <Link to={`/games`}>Games</Link>
                    <Link to={`/blog`}>Blog</Link>
                    <Link to={`/about`}>About</Link>
                </div>
                <div className='user-details'>
                    <Link to={`/login`}>Log In</Link>
                    <Link to={`/register`}>Register</Link>
                </div>
            </div>
            <div className='media-player'></div>
        </>
    );
}

