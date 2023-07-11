import { ReactElement } from 'react';
import { GamesIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { PromptElement } from '../../../components/Prompt/PromptElement';
import { MessageIcon } from '../../../assets/svg/icons/Actions';

export function GamesPage(): ReactElement {
    return (
        <PageTemplate title='Games' icon={<GamesIcon />} pageWrap='page_small'>
            <PromptElement icon={<MessageIcon />} text='Announcing new projects soon!' />
        </PageTemplate>
    );
}