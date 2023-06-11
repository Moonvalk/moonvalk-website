import {ReactElement, useEffect} from 'react';
import './ComicsPage.css';
import '../Layout.css';
import { PageTitle } from '../context/PageTitle';

export default function ComicsPage(): ReactElement {
    return (
        <div className="content">
            <PageTitle title="Comics" />
            <div className="header-margin"></div>
            <div className="page">
                <h1>Comics</h1>
                <hr />
                <p className="center">
                    Stay tuned, new stories coming soon...
                </p>
            </div>
        </div>
    );
}