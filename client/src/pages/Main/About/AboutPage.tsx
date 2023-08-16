import { ReactElement } from 'react';
import { AboutIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { InfoIcon, PaletteIcon } from '../../../assets/svg/icons/Misc';
import { Link } from 'react-router-dom';
import { PromptElement } from '../../../components/Prompt/PromptElement';
import { ImageComponent } from '../../../components/Image/ImageComponent';
import { IconTritone } from '../../../components/Icons/IconTritone';
import './AboutPage.css';

/**
 * Called to generate the about page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function AboutPage(): ReactElement {
    return (
        <PageTemplate title='About' icon={<IconTritone baseSVG={<AboutIcon />} />}
            pageWrap='page_small' description='Moonvalk Studios is the creation and alias of solo independent game developer Zack Harmon.'>
            <PromptElement icon={<InfoIcon />} text={<>
                <span className='color_highlight1'>Moonvalk Studios</span> is the creation and alias of solo independent game developer Zack Harmon.
            </>} />
            <div className='about-avatar-container'>
                <div className='about-avatar-border' />
                <ImageComponent source='../uploads/images/zack2.webp' className='about-avatar' backgroundImage />
            </div>
            <p className="text_body align_left indent">
                Zack has been creating games, artwork, music, and practicing design for over thirteen years.
                Just recently he decided to take the plunge and work on his projects fulltime.
                He loves to collaborate and connect with others in the game development community. He also loves card games and Mexican food *wink*.
            </p>
            <br />
            <div className='about-buttons'>
                <Link to={'/portfolio'} className='button_basic'>
                    <div className='icon'><PaletteIcon /></div>
                    Visit My Portfolio
                </Link>
            </div>
            <br />
            <p className="text_body align_center">
                Use the <Link className='link_basic' to='/contact'>Contact Form</Link> to get in touch.
            </p>
        </PageTemplate>
    );
}