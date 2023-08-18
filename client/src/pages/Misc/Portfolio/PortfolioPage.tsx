import { ReactElement } from 'react';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { ParallaxElement } from '../../../components/Parallax/ParallaxElement';
import { ImageComponent } from '../../../components/Image/ImageComponent';
import { PortfolioExperienceTimeline } from './PortfolioExperienceTimeline';
import { PortfolioSectionStory } from './PortfolioSectionStory';
import { PortfolioSectionMain } from './PortfolioSectionMain';
import { PortfolioSectionSkills } from './PortfolioSectionSkills';
import { PortfolioSectionProjects } from './PortfolioSectionProjects';
import './PortfolioPage.css';
import '../../Main/About/AboutPage.css';

/**
 * Called to generate the main portfolio page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PortfolioPage(): ReactElement {
    return (
        <PageTemplate title='Portfolio'
            description='Moonvalk Studios is the creation and alias of solo independent game developer Zack Harmon.'
            hideHeader>
            <div className='cover-image-container'>
                <ParallaxElement scrollSpeed={0.5}>
                    <ImageComponent className='cover-image behind' source={'../uploads/images/portfolio_cover.webp'} backgroundImage />
                </ParallaxElement>
            </div>
            <div className='about-avatar-container large'>
                <ImageComponent source='../uploads/images/zack2.webp' className='about-avatar large' backgroundImage />
            </div>
            <PortfolioSectionMain />
            <PortfolioSectionStory />
            <PortfolioExperienceTimeline />
            <PortfolioSectionSkills />
            <PortfolioSectionProjects />
        </PageTemplate>
    );
}