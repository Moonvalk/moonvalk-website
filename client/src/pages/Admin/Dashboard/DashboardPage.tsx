import { ReactElement } from "react";
import { DashboardIcon } from "../../../assets/svg/icons/Menus";
import { HelpIcon } from "../../../assets/svg/icons/Misc";
import { PageTemplate } from "../../../components/PageTemplate/PageTemplate";
import { PromptElement } from "../../../components/Prompt/PromptElement";
import { ACCESS_LEVEL } from "../../../stores/User";
import { Link } from "react-router-dom";

export function DashboardPage(): ReactElement {
    return (
        <PageTemplate title='Dashboard' icon={<DashboardIcon />} pageWrap='page_medium'
            accessLevel={ACCESS_LEVEL.ADMIN}>
            <PromptElement icon={<HelpIcon />}
                text='View site analytics, handle draft posts, and update site settings here.' />
            <Link className='link' to='/dashboard'><p className='text_body'>Manage News Posts</p></Link>
            <Link className='link' to='/dashboard'><p className='text_body'>Manage Emails</p></Link>
            <Link className='link' to='/dashboard'><p className='text_body'>View Website Analytics</p></Link>
            <Link className='link' to='/dashboard'><p className='text_body'>Handle Newsletter List</p></Link>
            <Link className='link' to='/dashboard/uploads'><p className='text_body'>Manage Uploads</p></Link>
            <Link className='link' to='/test'><p className='text_body'>Test</p></Link>
        </PageTemplate>
    );
}
