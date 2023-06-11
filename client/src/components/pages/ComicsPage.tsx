import {ReactElement, useEffect} from 'react';
import './ComicsPage.css';
import '../Layout.css';

export function ComicsPage(): ReactElement {
    useEffect(() => {
        document.title = 'Moonvalk Studios | Comics';
    }, []);

    return (
        <div className="content">
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