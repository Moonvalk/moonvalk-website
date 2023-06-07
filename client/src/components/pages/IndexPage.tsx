import {ReactElement} from 'react';
import '../Layout.css';
import './IndexPage.css';

export function IndexPage(): ReactElement {
    return (
        <div className="content">
            <canvas className="carousel"></canvas>
            <div className="page">
                <h1>Home</h1>
                <hr />
                <p>
                </p>
            </div>
        </div>
    );
}