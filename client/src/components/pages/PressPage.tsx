import {ReactElement, useEffect} from 'react';
import './ComicsPage.css';
import '../Layout.css';

export function PressPage(): ReactElement {

    useEffect(() => {
        document.title = 'Moonvalk Studios | Press';
    }, []);

    return (
        <div className="content">
            <div className="header-margin"></div>
            <div className="page">
                <h1>Press</h1>
                <hr />
                <p className="center">
                    Press-kits and high quality format media coming soon...
                </p>
            </div>
        </div>
    );
}