import { ReactElement } from "react";
import { PromptElement } from "../../../components/Prompt/PromptElement";
import { BarbellIcon, BrainIcon, ContrastIcon } from "../../../assets/svg/icons/Misc";
import { IconTritone } from "../../../components/Icons/IconTritone";
import { ImageComponent } from "../../../components/Image/ImageComponent";
import { CodeIcon } from "../../../assets/svg/icons/Editor";

/**
 * Called to generate the skills section found on the portfolio page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PortfolioSectionSkills(): ReactElement {
    return (
        <>
            <div className='portfolio_section_top skills'></div>
            <div className='skills-section'>
                {/* <div className='skills-cover-image'>
                    <ImageComponent source='../uploads/images/skills_section.webp' />
                </div> */}
                <div className='container'>
                    <h1 className='page-title'>
                        <IconTritone baseSVG={<BarbellIcon />} />
                        Skills
                    </h1>
                    <hr className='color-break' />
                    
                    <p className='align_left indent text_body'>
                        I am a huge advocate for continued learning. I am always searching for new technologies and improvements in my day-to-day.
                        After years of persistent effort I've become a jack-of-all-trades of sorts. Learn about my strongest skills below.</p>
                </div>
                
                <div className='skill-tree-wrapper'>
                    <div className='skills-wrapper'>
                        <div className='section-highlight dots'>
                            <h1 className='page-title'>
                                <IconTritone baseSVG={<CodeIcon />} />
                                Technologies
                            </h1>
                        </div>
                        <div className='skill-item-wrapper color_highlight1'>
                            <div className='skill-item'>C#</div>
                            <div className='skill-item'>TypeScript</div>
                            <div className='skill-item'>JavaScript (ES6)</div>
                            <div className='skill-item'>React</div>
                            <div className='skill-item'>ThreeJS</div>
                            <div className='skill-item'>NodeJS</div>
                            <div className='skill-item'>GLSL</div>
                            <div className='skill-item'>Python</div>
                            <div className='skill-item'>C++</div>
                            <div className='skill-item'>HTML</div>
                            <div className='skill-item'>CSS</div>
                            <div className='skill-item'>GML</div>
                            <div className='skill-item'>Express</div>
                            <div className='skill-item'>MongoDB</div>
                        </div>
                    </div>
                    <div className='skills-wrapper'>
                        <div className='section-highlight dots'>
                            <h1 className='page-title'>
                                <IconTritone baseSVG={<ContrastIcon />} />
                                Tools
                            </h1>
                        </div>
                        <div className='skill-item-wrapper color_highlight2'>
                            <div className='skill-item'>Unity</div>
                            <div className='skill-item'>Blender</div>
                            <div className='skill-item'>Photoshop</div>
                            <div className='skill-item'>Illustrator</div>
                            <div className='skill-item'>Premiere Pro</div>
                            <div className='skill-item'>After Effects</div>
                            <div className='skill-item'>Aseprite</div>
                            <div className='skill-item'>FL Studio</div>
                            <div className='skill-item'>Git</div>
                            <div className='skill-item'>MS Office</div>
                            <div className='skill-item'>GM Studio</div>
                        </div>
                    </div>
                    <div className='skills-wrapper'>
                        <div className='section-highlight dots'>
                            <h1 className='page-title'>
                                <IconTritone baseSVG={<BrainIcon />} />
                                Knowledge
                            </h1>
                        </div>
                        <div className='skill-item-wrapper color_highlight6'>
                            <div className='skill-item'>Full-Stack Web Development</div>
                            <div className='skill-item'>Game Design</div>
                            <div className='skill-item'>Project Management</div>
                            <div className='skill-item'>Motion Graphics</div>
                            <div className='skill-item'>Logo Design</div>
                            <div className='skill-item'>Marketing</div>
                            <div className='skill-item'>SEO</div>
                            <div className='skill-item'>UI / UX</div>
                            <div className='skill-item'>Photography</div>
                            <div className='skill-item'>Music</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='portfolio_section_bottom skills'></div>
        </>
    );
}
