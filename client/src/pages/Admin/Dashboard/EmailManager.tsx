import { ReactElement } from "react";
import { HelpIcon } from "../../../assets/svg/icons/Misc";
import { PageTemplate } from "../../../components/PageTemplate/PageTemplate";
import { PromptElement } from "../../../components/Prompt/PromptElement";
import { ACCESS_LEVEL } from "../../../stores/User";
import { IconTritone } from "../../../components/Icons/IconTritone";
import { MessageIcon } from "../../../assets/svg/icons/Actions";

/**
 * Generates the email manager page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function EmailManager(): ReactElement {
    return (
        <PageTemplate title='Email Manager' icon={<IconTritone baseSVG={<MessageIcon />} />} pageWrap='page_medium'
            accessLevel={ACCESS_LEVEL.ADMIN}>
            <PromptElement icon={<HelpIcon />}
                text='Manage emails here.' />
        </PageTemplate>
    );
}
