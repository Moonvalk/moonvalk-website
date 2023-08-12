import { ReactElement } from "react";
import { PromptElement } from "../../../components/Prompt/PromptElement";
import { RadarIcon } from "../../../assets/svg/icons/Misc";
import { IconTritone } from "../../../components/Icons/IconTritone";

/**
 * Called to generate the technologies section found on the portfolio page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PortfolioSectionTechnologies(): ReactElement {
    return (
        <>
            <h1 className='page-title'>
                <IconTritone baseSVG={<RadarIcon />} />
                Technologies
            </h1>
            <hr className='hr_small' />
            <PromptElement text={
            <div>
                <p className='font_abel color_highlight1 align_center'>
                    TECHNOLOGIES
                </p>
                <ul style={{margin: '1rem'}}>
                    <li>Unity</li>
                    <li>C#</li>
                    <li>C++</li>
                    <li>JavaScript (ES6+)</li>
                    <li>TypeScript</li>
                    <li>GLSL / HLSL</li>
                    <li>React</li>
                    <li>ThreeJS</li>
                    <li>HTML</li>
                    <li>CSS</li>
                </ul>
            </div>
        } />
        </>
        
    );
}
