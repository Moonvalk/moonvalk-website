import { ReactElement } from 'react';
import { AboutIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { InfoIcon } from '../../../assets/svg/icons/Misc';
import { Link } from 'react-router-dom';
import { PromptElement } from '../../../components/Prompt/PromptElement';
import './AboutPage.css';

/**
 * Called to generate the about page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function AboutPage(): ReactElement {
    return (
        <PageTemplate title='About' icon={<AboutIcon />} pageWrap='page_small'
            description='Moonvalk Studios is the creation and alias of solo independent game developer Zack Harmon.'>
            <PromptElement icon={<InfoIcon />} text={<>
                <span className='color_highlight1'>Moonvalk Studios</span> is the creation and alias of solo independent game developer Zack Harmon.
                </>} />
            <div className='about-avatar-container'>
                <div className='about-avatar-border' />
                <div className='about-avatar' />
            </div>
            <p className="text_body align_justified indent">
                Zack has been making games, artwork, music, and design for over thirteen years.
                Just recently he decided to take the plunge and work on his projects fulltime.
                He loves to collaborate and connect with others in the game dev community. He also loves mexican food *wink*.
            </p>
            <br />
            <br />
            <p className="text_body align_center">
                Use the <Link className='link_basic' to='/contact'>Contact Form</Link> to get in touch.
            </p>
        </PageTemplate>
    );
}