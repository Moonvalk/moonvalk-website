import { ReactElement } from "react";
import { DashboardIcon } from "../../icons/DashboardIcon";
import { HelpIcon } from "../../icons/HelpIcon";
import { AccessLevel, PageTemplate } from "../../templates/PageTemplate";

export function DashboardPage(): ReactElement {
    return (
        <PageTemplate title='Dashboard' icon={<DashboardIcon />} pageWrap='page-medium'
            accessLevel={AccessLevel.ADMIN}>
            <div className='prompt'>
                <HelpIcon />
                <p className='body-text'>View site analytics, handle draft posts, and update site settings here.</p>
            </div>
            <p className='body-text'>Manage News Posts</p>
            <p className='body-text'>Manage Emails</p>
            <p className='body-text'>View Website Analytics</p>
            <p className='body-text'>Handle Newsletter List</p>
            <p className='body-text'>Manage Uploads</p>
        </PageTemplate>
    );
}
