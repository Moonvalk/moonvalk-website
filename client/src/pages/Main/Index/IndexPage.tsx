import { ReactElement, lazy } from 'react';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { SmartSuspense } from '../../../components/SmartSuspense/SmartSuspense';
import { UniversalLoader } from '../../../components/SmartSuspense/UniversalLoader';
import { HomeIcon } from '../../../assets/svg/icons/Menus';
import { MessageIcon } from '../../../assets/svg/icons/Actions';
import { PromptElement } from '../../../components/Prompt/PromptElement';
import { InfoIcon } from '../../../assets/svg/icons/Misc';

export function IndexPage(): ReactElement {
    const LazyCarousel = lazy(() => import('../../../components/ThreeView/ThreeView'));

    return (
        <PageTemplate hideHeader>
            <SmartSuspense fallback={<UniversalLoader />} fallbackDelay={0}>
                <LazyCarousel />
            </SmartSuspense>
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
