import {ReactElement} from 'react';
import './NewsPage.css';
import '../Layout.css';

export function NewsPage(): ReactElement {
    return (
        <div className="content">
            <div className="header-margin"></div>
            <div className="page">
                <h1>News</h1>
                <hr />
                <p className="center">
                    Check back in later; the gremlins only work when nobody is watching.
                </p>
            </div>
        </div>
    );
}