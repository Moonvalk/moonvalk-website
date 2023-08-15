import { ReactElement } from 'react';
import { PageTemplate } from '../../components/PageTemplate/PageTemplate';
import { InfoIcon, PaletteIcon, SprayIcon } from '../../assets/svg/icons/Misc';
import { PromptElement } from '../../components/Prompt/PromptElement';
import { BackIcon, PreviewIcon } from '../../assets/svg/icons/Actions';
import { Link } from 'react-router-dom';
import { IconTritone } from '../../components/Icons/IconTritone';
/**
 * Called to generate the main portfolio page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function ResumePage(): ReactElement {
    return (
        <PageTemplate title='Resume' icon={<IconTritone baseSVG={<PreviewIcon />} />} pageWrap='page_large'
            description='Moonvalk Studios is the creation and alias of solo independent game developer Zack Harmon.'>
            <object data='../uploads/docs/Zack_Harmon_Resume_8-2023.pdf'
                width="100%"
                height="600">
            </object>
            <div className='return-link-container'>
                <Link to={'/portfolio'} className='return-link'>
                    <BackIcon />
                    Back to Portfolio
                </Link>
            </div>
        </PageTemplate>
    );
}