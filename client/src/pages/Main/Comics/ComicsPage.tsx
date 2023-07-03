import { ReactElement } from 'react';
import { ComicsIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';

export function ComicsPage(): ReactElement {
    return (
        <PageTemplate title='Comics' icon={<ComicsIcon />} pageWrap='page'>
            <p className="body-text center">
                Stay tuned, new stories coming soon...
            </p>
        </PageTemplate>
    );
}