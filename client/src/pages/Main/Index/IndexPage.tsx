import { ReactElement } from 'react';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { MessageIcon } from '../../../assets/svg/icons/Actions';
import { PromptElement } from '../../../components/Prompt/PromptElement';
import { InfoIcon } from '../../../assets/svg/icons/Misc';
import { ThreeView } from '../../../components/ThreeView/ThreeView';

/**
 * Called to generate the main homepage.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function IndexPage(): ReactElement {
    return (
        <PageTemplate hideHeader>
            <ThreeView />
            <div className='margin_header' />
            <h1 className='page-title'>
                <MessageIcon />
                Welcome
            </h1>
            <hr className='hr_small' />
            <div className='page_small'>
                <p className='text_body indent align_justified'>
                    <span className='color_highlight1'>Moonvalk</span> is a brand spanking new game studio developing and publishing mobile / desktop experiences.
                    Our focus is keeping things fun by using retro themes in clever new ways.
                </p>
                <br />
                <PromptElement icon={<InfoIcon />} text='Explore our work in progress website to learn more!' />
            </div>
        </PageTemplate>
    );
}
