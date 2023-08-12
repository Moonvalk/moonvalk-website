import { ReactElement } from "react";
import { PromptElement } from "../../../components/Prompt/PromptElement";
import { PressIcon } from "../../../assets/svg/icons/Menus";
import { IconTritone } from "../../../components/Icons/IconTritone";

/**
 * Called to generate the press section found on the portfolio page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PortfolioSectionPress(): ReactElement {
    return (
        <>
            <h1 className='page-title'>
                <IconTritone baseSVG={<PressIcon />} />
                Press
            </h1>
            <hr className='hr_small' />
            <PromptElement text={
                <div>
                    <p className='font_abel color_highlight1 align_center'>
                        PRESS
                    </p>
                    <ul style={{margin: '1rem'}}>
                        <li>
                            Article

                        </li>
                    </ul>
                </div>
            } />
        </>
    );
}
