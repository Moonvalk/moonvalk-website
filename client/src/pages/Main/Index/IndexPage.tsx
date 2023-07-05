import { ReactElement } from 'react';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { MessageIcon } from '../../../assets/svg/icons/Actions';
import { PromptElement } from '../../../components/Prompt/PromptElement';
import { InfoIcon } from '../../../assets/svg/icons/Misc';
import { ThreeView } from '../../../components/ThreeView/ThreeView';

export function IndexPage(): ReactElement {
    return (
        <PageTemplate hideHeader>
            <ThreeView />
            <div className='header-margin' />
            <h1 className='page-title'>
                <MessageIcon />
                Welcome
            </h1>
            <hr className='hr-small' />
            <div className='page-small'>
                <p className='body-text indent justify'>
                    <span className='color_highlight1'>Moonvalk</span> is a brand spanking new game studio developing and publishing mobile / desktop experiences.
                    Our focus is keeping things fun by using retro themes in clever new ways.
                </p>
                <br />
                <PromptElement icon={<InfoIcon />} text='Explore our work in progress website to learn more!' />
            </div>
        </PageTemplate>
    );
}
