import { ReactElement } from "react";
import { DashboardIcon } from "../../../assets/svg/icons/Menus";
import { HelpIcon } from "../../../assets/svg/icons/Misc";
import { PageTemplate } from "../../../components/PageTemplate/PageTemplate";
import { PromptElement } from "../../../components/Prompt/PromptElement";
import { ACCESS_LEVEL } from "../../../stores/User";
import { IconTritone } from "../../../components/Icons/IconTritone";

/**
 * Generates the analytics manager page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function AnalyticsManager(): ReactElement {
    return (
        <PageTemplate title='Analytics Manager' icon={<IconTritone baseSVG={<DashboardIcon />} />} pageWrap='page_medium'
            accessLevel={ACCESS_LEVEL.ADMIN}>
            <PromptElement icon={<HelpIcon />}
                text='Manage site analytics and related tools here.' />
        </PageTemplate>
    );
}
