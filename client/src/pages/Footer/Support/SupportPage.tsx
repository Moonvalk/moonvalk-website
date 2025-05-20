import { ReactElement } from 'react';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { PromptElement } from '../../../components/Prompt/PromptElement';
import { MessageIcon } from '../../../assets/svg/icons/Actions';
import { IconTritone } from '../../../components/Icons/IconTritone';
import { InfoIcon } from "../../../assets/svg/icons/Misc";
import {Link} from "react-router-dom";

export function SupportPage(): ReactElement {
    return (
        <PageTemplate title='Support' icon={<IconTritone baseSVG={<InfoIcon/>}/>} pageWrap='page_small'>
            <PromptElement icon={<MessageIcon/>} text='Support details coming soon...'/>
            {/*<div className='footer-links'>*/}
            {/*    <Link to={`/privacy`}>Privacy Policy</Link>*/}
            {/*</div>*/}
        </PageTemplate>
    );
}