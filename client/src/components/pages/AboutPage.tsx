import {ReactElement, useEffect} from 'react';
import '../Layout.css';
import { PageTitle } from '../context/PageTitle';

export default function AboutPage(): ReactElement {
    return (
        <div className="content">
            <PageTitle title="About" />
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