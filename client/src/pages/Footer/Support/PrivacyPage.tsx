import { ReactElement } from 'react';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { PromptElement } from '../../../components/Prompt/PromptElement';
import { MessageIcon } from '../../../assets/svg/icons/Actions';
import { IconTritone } from '../../../components/Icons/IconTritone';
import { InfoIcon } from "../../../assets/svg/icons/Misc";

export function PrivacyPage(): ReactElement {
    return (
        <PageTemplate title='Privacy' icon={<IconTritone baseSVG={<InfoIcon />} />} pageWrap='page_medium'>
            <PromptElement icon={<MessageIcon />} text='Privacy details coming soon...' />
        </PageTemplate>
    );
}