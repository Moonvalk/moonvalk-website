import { ReactElement } from "react";
import { PageTitle } from "../../layout/PageTitle";
import { DashboardIcon } from "../../icons/DashboardIcon";

export function DashboardPage(): ReactElement {
    return (
        <div className='content'>
            <PageTitle title='Dashboard' />
            <div className='page-medium'>
                <h1>Admin Dashboard</h1>
                <hr />
                <div className='prompt'>
                    <DashboardIcon />
                    <p>View site analytics, handle draft posts, and update site settings here.</p>
                </div>
            </div>
        </div>
    );
}
