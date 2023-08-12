import { ReactElement } from "react";
import { PromptElement } from "../../../components/Prompt/PromptElement";
import { BoltIcon, RadarIcon } from "../../../assets/svg/icons/Misc";
import { IconTritone } from "../../../components/Icons/IconTritone";

/**
 * Called to generate the projects section found on the portfolio page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PortfolioSectionProjects(): ReactElement {
    return (
        <>
            <h1 className='page-title'>
                <IconTritone baseSVG={<RadarIcon />} />
                Notable Projects
            </h1>
            <hr className='hr_small' />
            <PromptElement text={
            <div>
                <p className='font_abel color_highlight1 align_center'>
                    NOTABLE PROJECTS
                </p>
                <ul style={{margin: '1rem'}}>
                    <li>
                        Gongbat

                    </li>
                </ul>
            </div>
        } />
        </>
    );
}
