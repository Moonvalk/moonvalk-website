import { ReactElement } from "react";
import { BookIcon } from "../../../assets/svg/icons/Misc";
import { IconTritone } from "../../../components/Icons/IconTritone";

/**
 * Called to generate the story section found on the portfolio page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PortfolioSectionStory(): ReactElement {
    return (
        <>
            <div className='portfolio_section_top story'></div>
            <div className='portfolio_story_section'>
                <div className='container'>
                    <h1 className='page-title'>
                        <IconTritone baseSVG={<BookIcon />} />
                        My Story
                    </h1>
                    <hr className='color-break' />
                    <p className='align_left indent text_body'>
                        Since a young age I have been passionate for the arts. Comic books and other media piqued my interest with their vibrant larger-than-life tales.
                        It was my dream to not just be another consumer. I vowed to become a storyteller, an architect, and most importantly <span className='color_highlight1'>a creator</span> who allows others to embrace their imagination.
                    </p>
                    <br/>
                    <p className='align_left indent text_body'>
                        As my interest in animation blossomed I eventually learned how to build interactive media- and got hooked forever.
                        I spent my teenage years building games which would eventually go on to win <span className='color_highlight1'>national awards</span> and acclaim.
                        My skill set grew and I pivoted into a professional career as a Software Engineer about <span className='color_highlight1'>four years ago</span>.
                        Today I am an artistic professional with extensive project experience from concept to distribution.
                        My expansive job history provides me with a unique angle from all facets of product development.
                        I have worked as a game developer, a lead graphic artist, a product designer, a musician, and even a full-stack web developer.
                        And I love it all.
                    </p>
                    <br/>
                    <p className='align_left indent text_body'>
                        Currently I build mobile and desktop experiences under the alias <span className='color_highlight1'>Moonvalk Studios</span>.
                        I am always open to new opportunities and will gladly free up some time to discuss future endeavors and collaborations.
                    </p>
                </div>
            </div>
            <div className='portfolio_section_bottom story'></div>
        </>
    );
}
