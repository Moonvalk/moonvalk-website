import { ReactElement, useEffect, useRef } from "react";
import { BarbellIcon, BrainIcon, ContrastIcon } from "../../../assets/svg/icons/Misc";
import { IconTritone } from "../../../components/Icons/IconTritone";
import { CodeIcon } from "../../../assets/svg/icons/Editor";
import { isDeviceMobile } from "../../../utils/DetectMobile";

/**
 * Called to generate the skills section found on the portfolio page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PortfolioSectionSkills(): ReactElement {
    const skillsSectionRef = useRef<HTMLDivElement>();
    const skillsSectionTopRef = useRef<HTMLDivElement>();
    const skillsSectionBottomRef = useRef<HTMLDivElement>();
    let deviceIsMobile: boolean = false;

    const requestRef = useRef<any>();
    const previousTimeRef = useRef<number>();

    function animate(time_: number): void {
        if (previousTimeRef.current) {
            const portalEdgeSpeed = 0.03;
            const portalEdgeElapsed = (time_ * portalEdgeSpeed);
            const sinWave = (Math.sin(time_ * 0.001));
            const defaultBackgroundSize = 22;

            if (skillsSectionTopRef.current) {
                skillsSectionTopRef.current.style.backgroundPositionX = `${portalEdgeElapsed}rem`;
                skillsSectionBottomRef.current.style.backgroundPositionX = `${portalEdgeElapsed}rem`;
                if (!deviceIsMobile) {
                    skillsSectionRef.current.style.backgroundSize = `${sinWave + defaultBackgroundSize}rem`;
                }
            }
        }
        previousTimeRef.current = time_;
        requestRef.current = requestAnimationFrame(animate);
    }

    useEffect(() => {
        deviceIsMobile = isDeviceMobile();
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            // Clean up listener.
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <>
            <div className='portfolio_section_top skills' ref={skillsSectionTopRef}></div>
            <div className='skills-section' ref={skillsSectionRef}>
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
                        As a self taught developer I am a huge advocate for <span className='color_highlight1'>continued learning</span>. I am always searching for new technologies and improvements in my day-to-day.
                        The tech industry changes so rapidly it feels like there's a new framework or language out every single day.
                        After years of persistent effort I've become a jack-of-all-trades of sorts. Learn about my <span className='color_highlight1'>strongest skills</span> below.</p>
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
                            <div className='skill-item'>Webpack</div>
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
                            <div className='skill-item'>Godot</div>
                            <div className='skill-item'>Blender</div>
                            <div className='skill-item'>Photoshop</div>
                            <div className='skill-item'>Affinity Suite</div>
                            <div className='skill-item'>DaVinci Resolve</div>
                            <div className='skill-item'>Aseprite</div>
                            <div className='skill-item'>FL Studio</div>
                            <div className='skill-item'>Bitwig</div>
                            <div className='skill-item'>Git</div>
                            <div className='skill-item'>GM Studio</div>
                            <div className='skill-item'>Wordpress</div>
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
            <div className='portfolio_section_bottom skills' ref={skillsSectionBottomRef}></div>
        </>
    );
}
