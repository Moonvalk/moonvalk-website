import {ReactElement, useEffect} from 'react';
import { PageTitle } from '../../layout/PageTitle';
import { ComicsIcon } from '../../icons/ComicsIcon';

export function ComicsPage(): ReactElement {
    return (
        <div className="content">
            <PageTitle title="Comics" />
            <div className='header-margin' />
            <h1><ComicsIcon />Comics</h1>
            <hr />
            <div className="page">
                <p className="center">
                    Stay tuned, new stories coming soon...
                </p>
            </div>
        </div>
    );
}