import { ReactElement } from 'react';
import { PressIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';

export function PressPage(): ReactElement {
    return (
        <PageTemplate title='Press' icon={<PressIcon />} pageWrap='page'>
            <p className="body-text center">
                Press-kits and high quality format media coming soon...
            </p>
        </PageTemplate>
    );
}