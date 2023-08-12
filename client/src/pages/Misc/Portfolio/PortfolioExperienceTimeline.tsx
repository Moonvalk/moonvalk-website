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
                            <ul>
                                <li>Programming within a variety of different languages and engines to produce apps, web applications, and video games for PC and mobile devices.</li>
                                <li>Composing music and audio effects for games and other video media.</li>
                                <li>Designing and animating 2D/3D character artwork in varying styles.</li>
                                <li>Film/video production including trailer arrangement and screenwriting.</li>
                                <li>Creation of professional interactive elements and reactive UI that helps to tell a story.</li>
                                <li>Full-stack development and management of studio website built on MERN stack (MongoDB, Express, React, and NodeJS).</li>
                            </ul>
                        </>}
                    date='April 2012 - Present'
                    skills={['Unity', 'C#', 'TypeScript', 'NodeJS', 'React', 'Aseprite', 'C++']}
                    icon={<BoltIcon />} />
                <PortfolioTimelineBlock position='Software Engineer II'
                    company='Boom Entertainment'
                    companyClass='boom'
                    description={<>
                            <ul>
                                <li>Developed multiple successful online gambling titles with cross-platform functionality.</li>
                                <li>Primarily used TypeScript to build out game designs, create proprietary engine features, and make major performance improvements.</li>
                                <li>Used libraries such as ThreeJS, React, and Spine JS to quickly spin up products.</li>
                                <li>Worked closely with a team of designers, audio engineer, and artists to get each game over the finish line.</li>
                                <li>Assisted in design and project management to meet deadlines for clients.</li>
                                <li>Made pivotal improvements to the company workflow and overall product UI.</li>
                            </ul>
                        </>}
                    date='July 2022 - June 2023'
                    link='https://www.booment.com/'
                    skills={['TypeScript', 'React', 'ThreeJS', 'Spine', 'Photoshop']}
                    icon={<KeyboardIcon />} />
                <PortfolioTimelineBlock position='Game Developer III'
                    company='Ainsworth Game Technology'
                    companyClass='ainsworth'
                    description={<>
                            <ul>
                                <li>Development of multiple shipped casino slot machine and gambling gaming titles with the use of C#, GLSL, XML, and proprietary engine.</li>
                                <li>Working closely with a team of artists, game designers, mathematicians, and an audio engineer to create a quality product that meets all jurisdictional requirements.</li>
                                <li>Continued documentation of company software and training materials.</li>
                                <li>Management and creation of new tools for assisting in development.</li>
                                <li> Assisted in review of peer projects and running math simulations.</li>
                            </ul>
                        </>}
                    date='January 2020 - August 2022'
                    link='https://www.agtslots.com/us'
                    skills={['C#', 'GLSL', 'Wordpress', 'Perforce']}
                    icon={<KeyboardIcon />} />
                <PortfolioTimelineBlock position='Lead Graphic Desginer'
                    company='Alter Reality Games'
                    companyClass='arg'
                    description={<>
                            <ul>
                                <li>Designed custom graphic elements for web and social media, advertising, video, product design, product packaging, and more.</li>
                                <li>Built website storefront through WordPress including custom coded front and back-end pages.</li>
                                <li>Use of Adobe software to edit templates, fonts, artwork, and layouts.</li>
                                <li>Proofreader of Argent Saga (TCG) cards (includes cross referencing with game design system).</li>
                                <li>Managed online community, filmed/livestreamed, and hosted events across the United States.</li>
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
                                <li>Managed and designed the official company website.</li>
                                <li>Serviced lock out-tag out OSHA standard procedures (cataloging of machinery and heating systems) throughout University Hospitals in Cleveland, OH.</li>
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
