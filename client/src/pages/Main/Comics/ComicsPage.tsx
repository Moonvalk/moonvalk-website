import { ReactElement } from 'react';
import { ComicsIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { MessageIcon } from '../../../assets/svg/icons/Actions';
import { PromptElement } from '../../../components/Prompt/PromptElement';

export function ComicsPage(): ReactElement {
    return (
        <PageTemplate title='Comics' icon={<ComicsIcon />} pageWrap='page_small'>
            <PromptElement icon={<MessageIcon />} text='Stay tuned; stories coming soon!' />
        </PageTemplate>
    );
}