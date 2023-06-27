import {ReactElement, useEffect} from 'react';
import { PageTitle } from '../../layout/PageTitle';
import { PressIcon } from '../../icons/PressIcon';

export function PressPage(): ReactElement {
    return (
        <div className="content">
            <PageTitle title="Press" />
            <div className='header-margin' />
            <h1><PressIcon />Press</h1>
            <hr />
            <div className="page">
                <p className="center">
                    Press-kits and high quality format media coming soon...
                </p>
            </div>
        </div>
    );
}