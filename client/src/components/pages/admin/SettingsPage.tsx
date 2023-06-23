import { ReactElement } from "react";
import { PageTitle } from "../../layout/PageTitle";
import { SettingsIcon } from "../../icons/SettingsIcon";


export function SettingsPage(): ReactElement {
    return (
        <div className='content'>
            <PageTitle title='Settings' />
            <div className='page-medium'>
                <h1>User Settings</h1>
                <hr />
                <div className='prompt'>
                    <SettingsIcon />
                    <p>Adjust user settings here.</p>
                </div>
            </div>
        </div>
    );
}
