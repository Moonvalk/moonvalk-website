import { ReactElement } from "react";
import { PortfolioTimelineBlock } from "./PortfolioTimelineBlock"
import { BoltIcon, BriefcaseIcon, HistoryIcon, KeyboardIcon, PaintIcon, PaintbrushIcon } from "../../../assets/svg/icons/Misc";

/**
 * Called to generate the experience timeline section found on the portfolio page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PortfolioExperienceTimeline(): ReactElement {
    return (
        <div className='experience-wrapper'>
            <h1 className='page-title'>
                <div className='tritone-icon'>
                    <div className='tritone-one'><HistoryIcon /></div>
                    <div className='tritone-two'><HistoryIcon /></div>
                    <div className='tritone-three'><HistoryIcon /></div>
                </div>
                Experience
            </h1>
            <hr className='hr_small' />
            <div className='timeline'>
                <PortfolioTimelineBlock position='Owner'
                    company='Moonvalk Studios'
                    companyClass='moonvalk'
                    description={<>
                            Moonvalk is my company under which I release mobile / desktop experiences.
                            I primarily develop games using Unity (C#) and create my own assets using a wide array of tools.
                            Below are some of the main things I do:
                            <ul>
                                <li>Programming within a variety of different languages and engines to produce apps, web applications, and video games for PC and mobile devices.</li>
                                <li>Composing music and audio effects for games and other video media.</li>
                                <li>Designing 2D/3D character, environment, and UI assets in varying styles.</li>
                                <li>Film/video production including trailer arrangement and screenwriting.</li>
                                <li>Full-stack development and management of studio website built on the MERN stack (MongoDB, Express, React, and NodeJS).</li>
                            </ul>
                        </>}
                    date='April 2012 - Present'
                    skills={['Unity', 'C#', 'TypeScript', 'NodeJS', 'React', 'Aseprite', 'C++']}
                    icon={<BoltIcon />} />
                <PortfolioTimelineBlock position='Software Engineer II'
                    company='Boom Entertainment'
                    companyClass='boom'
                    description={<>
                            During my tenure at Boom Entertainment I primarily built online gambling titles with cross-platform functionality.
                            Many of the games I engineered became massive hits (Lucky Money Tree, Money Mansion, Half Court Shot, etc.) and continue to perform well in the months following their release.
                            <ul>
                                <li>Programmed in TypeScript / JavaScript to build out game designs, create proprietary engine features, and make major performance upgrades.</li>
                                <li>Made pivotal improvements to the company workflow and overall product UI.</li>
                                <li>Used popular web libraries such as ThreeJS, React, TweenJS, and Spine to quickly spin up products.</li>
                                <li>Worked closely with a team of designers, audio engineer, and artists to get each game over the finish line.</li>
                                <li>Assisted in design and project management to meet deadlines for clients.</li>
                            </ul>
                        </>}
                    date='July 2022 - June 2023'
                    link='https://www.booment.com/'
                    skills={['TypeScript', 'React', 'ThreeJS', 'Spine', 'Photoshop', 'Git']}
                    icon={<KeyboardIcon />} />
                <PortfolioTimelineBlock position='Game Developer III'
                    company='Ainsworth Game Technology'
                    companyClass='ainsworth'
                    description={<>
                            Within this role I created over a dozen unique and art-clone gambling gaming titles for land based casinos.
                            Over my tenure with this company I blossomed into an experienced engineer with a focus on writing clean, understandable, and efficient code.
                            I took charge on polishing products beyond previous expectations and pushed the design team to help us stand out. 
                            <ul>
                                <li>Game development with the use of C#, GLSL, XML, and proprietary engine.</li>
                                <li>Worked with a small team to create quality products that meet all jurisdictional requirements</li>
                                <li>Documentation of company software and training materials.</li>
                                <li>Creation and management of new tools for assisting in development and math simulations.</li>
                            </ul>
                        </>}
                    date='January 2020 - July 2022'
                    link='https://www.agtslots.com/us'
                    skills={['C#', 'GLSL', 'Wordpress', 'Perforce', 'XML']}
                    icon={<KeyboardIcon />} />
                <PortfolioTimelineBlock position='Lead Graphic Desginer'
                    company='Alter Reality Games'
                    companyClass='arg'
                    description={<>
                            While working for Alter Reality Games I led the team into an incredibly successful Kickstarter campaign for their trading card game, Argent Saga.
                            This involved long hours creating marketing video & graphic assets.
                            Following the game launch I helped to support sales, design products, travel across the country for events, and more.
                            <ul>
                                <li>Built the Argent Saga website storefront via WordPress including custom front and back-end pages.</li>
                                <li>Designed custom graphic elements for social media, advertising, video, product design, product packaging, and more.</li>
                                <li>Proofread Argent Saga (TCG) cards for errors and game design.</li>
                                <li>Helped manage the online community, filmed and live streamed gameplay content, and hosted events across the United States.</li>
                            </ul>
                        </>}
                    date='May 2019 - December 2019'
                    link='https://www.alterealitygames.com/'
                    skills={['Photoshop', 'Illustrator', 'Premiere Pro', 'Blender']}
                    icon={<PaintbrushIcon />} />
                <PortfolioTimelineBlock position='Contractor'
                    company='Facility Compliance Solutions'
                    companyClass='fcs'
                    description={<>
                            <ul>
                                <li>Managed and designed the official company website using Wordpress, JavaScript, HTML, and CSS.</li>
                                <li>Serviced lock out-tag out OSHA standard procedures (cataloging of machinery and heating systems) throughout University Hospitals in Cleveland, Ohio.</li>
                                <li>Construction, fire stopping expertise, and team management amongst other tasks.</li>
                            </ul>
                        </>}
                    date='November 2017 - May 2019'
                    link='https://the-fcs.com/'
                    skills={['Wordpress', 'JavaScript', 'HTML', 'CSS', 'Photoshop']}
                    icon={<BriefcaseIcon />} />
            </div>
        </div>
    );
}
