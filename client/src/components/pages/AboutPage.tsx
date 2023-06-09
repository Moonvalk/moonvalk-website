import {ReactElement} from 'react';
import '../Layout.css';

export function AboutPage(): ReactElement {
    return (
        <div className="content">
            <div className="header-margin"></div>
            <div className="page">
                <h1>About</h1>
                <hr />
                <p className="center">
                    Check back in later; the gremlins only work when nobody is watching.
                </p>
            </div>
        </div>
    );
}