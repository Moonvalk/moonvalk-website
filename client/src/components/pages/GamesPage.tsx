import {ReactElement, useEffect} from 'react';
import './GamesPage.css';
import '../Layout.css';

export function GamesPage(): ReactElement {
    useEffect(() => {
        document.title = 'Moonvalk Studios | Games';
    }, []);

    return (
        <div className="content">
            <div className="header-margin"></div>
            <div className="page">
                <h1>Games</h1>
                <hr />
                <p>
                </p>
            </div>
        </div>
    );
}