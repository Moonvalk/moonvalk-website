import { ReactElement } from 'react';
import { PressIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { PromptElement } from '../../../components/Prompt/PromptElement';
import { MessageIcon } from '../../../assets/svg/icons/Actions';

export function PressPage(): ReactElement {
    return (
        <PageTemplate title='Press' icon={<PressIcon />} pageWrap='page-small'>
            <PromptElement icon={<MessageIcon />} text='Press-kits and high quality format media coming soon...' />
        </PageTemplate>
    );
}