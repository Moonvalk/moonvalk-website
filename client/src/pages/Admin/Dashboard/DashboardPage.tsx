import { ReactElement } from "react";
import { DashboardIcon, NewsIcon } from "../../../assets/svg/icons/Menus";
import { FireIcon, HelpIcon, TestIcon } from "../../../assets/svg/icons/Misc";
import { PageTemplate } from "../../../components/PageTemplate/PageTemplate";
import { PromptElement } from "../../../components/Prompt/PromptElement";
import { ACCESS_LEVEL } from "../../../stores/User";
import { Link } from "react-router-dom";
import { MessageIcon, UploadIcon } from "../../../assets/svg/icons/Actions";
import { IconTritone } from "../../../components/Icons/IconTritone";
import './DashboardPage.css';

/**
 * Generates the administrator dashboard.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function DashboardPage(): ReactElement {
    return (
        <PageTemplate title='Dashboard' icon={<IconTritone baseSVG={<DashboardIcon />} />} pageWrap='page_medium'
            accessLevel={ACCESS_LEVEL.ADMIN}>
            <PromptElement icon={<HelpIcon />}
                text='View site analytics, handle draft posts, and update site settings here.' />

            <div className='admin_links'>
                <Link className='link_admin' to='/dashboard/posts' title='Manage News Posts'>
                    <NewsIcon />
                    <p className='text_body'>News Posts</p>
                </Link>
                <Link className='link_admin' to='/dashboard/emails' title='Manage Emails'>
                    <MessageIcon />
                    <p className='text_body'>Emails</p>
                </Link>
                <Link className='link_admin' to='/dashboard/analytics' title='View Analytics'>
                    <FireIcon />
                    <p className='text_body'>Analytics</p>
                </Link>
                <Link className='link_admin' to='/dashboard/uploads' title='Manage Uploads'>
                    <UploadIcon />
                    <p className='text_body'>Uploads</p>
                </Link>
                <Link className='link_admin' to='/test' title='Test Page'>
                    <TestIcon />
                    <p className='text_body'>Test Page</p>
                </Link>
            </div>
        </PageTemplate>
    );
}
