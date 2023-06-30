import {ReactElement, useEffect} from 'react';
import { PageTitle } from '../../templates/PageTitle';
import { ComicsIcon } from '../../icons/ComicsIcon';
import { PageTemplate } from '../../templates/PageTemplate';

export function ComicsPage(): ReactElement {
    return (
        <PageTemplate title='Comics' icon={<ComicsIcon />} pageWrap='page'>
            <p className="body-text center">
                Stay tuned, new stories coming soon...
            </p>
        </PageTemplate>
    );
}