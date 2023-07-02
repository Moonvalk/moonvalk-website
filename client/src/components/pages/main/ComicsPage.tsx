import {ReactElement} from 'react';
import { ComicsIcon } from '../../icons/menus/ComicsIcon';
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