import { ReactElement } from 'react';
import { ComicsIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { MessageIcon } from '../../../assets/svg/icons/Actions';
import { PromptElement } from '../../../components/Prompt/PromptElement';
import { IconTritone } from '../../../components/Icons/IconTritone';

/**
 * Called to generate the comics page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function ComicsPage(): ReactElement {
    return (
        <PageTemplate title='Comics' icon={<IconTritone baseSVG={<ComicsIcon />} />}
            pageWrap='page_small' description='Stay tuned; stories coming soon!'>
            <PromptElement icon={<MessageIcon />} text='Stay tuned; stories coming soon!' />
        </PageTemplate>
    );
}