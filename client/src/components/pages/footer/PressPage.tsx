import {ReactElement} from 'react';
import { PressIcon } from '../../icons/PressIcon';
import { PageTemplate } from '../../templates/PageTemplate';

export function PressPage(): ReactElement {
    return (
        <PageTemplate title='Press' icon={<PressIcon />} pageWrap='page'>
            <p className="body-text center">
                Press-kits and high quality format media coming soon...
            </p>
        </PageTemplate>
    );
}