import {ReactElement, useEffect} from 'react';
import { PageTitle } from '../../layout/PageTitle';
import { ComicsIcon } from '../../icons/ComicsIcon';

export function ComicsPage(): ReactElement {
    return (
        <div className="content">
            <PageTitle title="Comics" />
            <div className="page-small">
                <h1>Comics</h1>
                <hr />
                <div className='prompt'>
                    <ComicsIcon />
                    <p className="center">
                        Stay tuned, new stories coming soon...
                    </p>
                </div>
            </div>
        </div>
    );
}