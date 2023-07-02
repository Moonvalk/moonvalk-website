import { ReactElement } from "react";
import { DashboardIcon } from "../../icons/menus/DashboardIcon";
import { HelpIcon } from "../../icons/misc/HelpIcon";
import { PageTemplate } from "../../templates/PageTemplate";
import { ACCESS_LEVEL } from "../../../stores/userAuth.store";
import { PromptElement } from "../../elements/PromptElement";

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
