import { ReactElement } from "react";
import { PromptElement } from "../../../components/Prompt/PromptElement";
import { BarbellIcon } from "../../../assets/svg/icons/Misc";

/**
 * Called to generate the skills section found on the portfolio page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PortfolioSectionSkills(): ReactElement {
    return (
        <>
            <h1 className='page-title'>
                <div className='tritone-icon'>
                    <div className='tritone-one'><BarbellIcon /></div>
                    <div className='tritone-two'><BarbellIcon /></div>
                    <div className='tritone-three'><BarbellIcon /></div>
                </div>
                Skills & Tools
            </h1>
            <hr className='hr_small' />
            <PromptElement text={
            <div>
                <p className='font_abel color_highlight1 align_center'>
                    SKILLS & TOOLS
                </p>
                <ul style={{margin: '1rem'}}>
                    <li>Adobe Photoshop</li>
                    <li>Adobe Illustrator</li>
                    <li>Adobe Premiere Pro</li>
                    
                </ul>
            </div>
        } />
        </>
        
    );
}
