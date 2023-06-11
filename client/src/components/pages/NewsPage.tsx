import {ReactElement, useEffect} from 'react';
import './NewsPage.css';
import '../Layout.css';
import { PageTitle } from '../context/PageTitle';

export default function NewsPage(): ReactElement {
    return (
        <div className="content">
            <PageTitle title="News" />
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