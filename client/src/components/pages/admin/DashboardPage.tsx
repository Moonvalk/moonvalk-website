import { ReactElement } from "react";
import { PageTitle } from "../../layout/PageTitle";
import { DashboardIcon } from "../../icons/DashboardIcon";
import { HelpIcon } from "../../icons/HelpIcon";

export function DashboardPage(): ReactElement {
    return (
        <div className='content'>
            <PageTitle title='Dashboard' />
            <div className='header-margin' />
            <h1><DashboardIcon />Admin Dashboard</h1>
            <hr />
            <div className='page-medium'>
                <div className='prompt'>
                    <HelpIcon />
                    <p>View site analytics, handle draft posts, and update site settings here.</p>
                </div>
                <p>Manage News Posts</p>
                <p>Manage Emails</p>
                <p>View Website Analytics</p>
                <p>Handle Newsletter List</p>
                <p>Manage Uploads</p>
            </div>
        </div>
    );
}
