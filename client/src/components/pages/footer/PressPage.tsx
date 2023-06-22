import {ReactElement, useEffect} from 'react';
import { PageTitle } from '../../layout/PageTitle';

export function PressPage(): ReactElement {
    return (
        <div className="content">
            <PageTitle title="Press" />
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