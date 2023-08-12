import { ReactElement } from 'react';
import { PressIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { PromptElement } from '../../../components/Prompt/PromptElement';
import { MessageIcon } from '../../../assets/svg/icons/Actions';
import { IconTritone } from '../../../components/Icons/IconTritone';

export function PressPage(): ReactElement {
    return (
        <PageTemplate title='Press' icon={<IconTritone baseSVG={<PressIcon />} />} pageWrap='page_small'>
            <PromptElement icon={<MessageIcon />} text='Press-kits and high quality format media coming soon...' />
        </PageTemplate>
    );
}