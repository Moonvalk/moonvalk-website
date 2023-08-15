import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { PreviewIcon, SendIcon } from "../../../assets/svg/icons/Actions";
import { InfoIcon } from "../../../assets/svg/icons/Misc";
import { LinkedInIcon, GithubIcon } from "../../../assets/svg/icons/Socials";
import { PromptElement } from "../../../components/Prompt/PromptElement";

/**
 * Called to generate the main summary section for the portfolio page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PortfolioSectionMain(): ReactElement {
    return (
        <div className='page_medium'>
            <p className='align_left color_highlight1 text_large font_abel'>Howdy, my name is</p>
            <h1 className='text_extra-large'>ZACK HARMON</h1>
            <PromptElement icon={<InfoIcon />} class='tight' hideTextWrapper
                text={<p className='font_abel text_medium'>
                    I'm a self-taught Software Engineer and Graphic Designer who specializes in Game Development.
                    </p>} />
            <br/>
            <div className='portfolio_link_container'>
                <a className='button_basic' href='../uploads/docs/Zack_Harmon_Resume_8-2023.pdf' target='_blank'>
                    <PreviewIcon />View Resume
                </a>
                <Link to={'https://www.linkedin.com/in/moonvalk/'} target='_blank' className='portfolio_link linked-in'>
                    <LinkedInIcon />
                </Link>
                <Link to={'https://github.com/Moonvalk'} target='_blank' className='portfolio_link'>
                    <GithubIcon />
                </Link>
                <Link to={'/contact'} className='portfolio_link'>
                    <SendIcon />
                </Link>
            </div>
        </div>
    );
}
