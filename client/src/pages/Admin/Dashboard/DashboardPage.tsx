import { ReactElement } from "react";
import { DashboardIcon } from "../../../assets/svg/icons/Menus";
import { HelpIcon } from "../../../assets/svg/icons/Misc";
import { PageTemplate } from "../../../components/PageTemplate/PageTemplate";
import { PromptElement } from "../../../components/Prompt/PromptElement";
import { ACCESS_LEVEL } from "../../../stores/userAuth.store";

export function DashboardPage(): ReactElement {
    return (
        <PageTemplate title='Dashboard' icon={<DashboardIcon />} pageWrap='page-medium'
            accessLevel={ACCESS_LEVEL.ADMIN}>
            <PromptElement icon={<HelpIcon />}
                text='View site analytics, handle draft posts, and update site settings here.' />
            <p className='body-text'>Manage News Posts</p>
            <p className='body-text'>Manage Emails</p>
            <p className='body-text'>View Website Analytics</p>
            <p className='body-text'>Handle Newsletter List</p>
            <p className='body-text'>Manage Uploads</p>
        </PageTemplate>
    );
}
