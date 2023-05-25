import {ReactElement} from 'react';
import './GamesPage.css';
import '../Layout.css';

export function GamesPage(): ReactElement {
    return (
        <div className='page'>
            <h2>Games</h2>
            <hr />
            <p className='main-text'>
                Check out all of our current releases:
            </p>
        </div>
    );
}