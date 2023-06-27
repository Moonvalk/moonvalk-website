import { ReactElement } from "react";
import { PageTitle } from "../../layout/PageTitle";
import { SettingsIcon } from "../../icons/SettingsIcon";
import { InfoIcon } from "../../icons/InfoIcon";
import { HelpIcon } from "../../icons/HelpIcon";


export function SettingsPage(): ReactElement {
    return (
        <div className='content'>
            <PageTitle title='Settings' />
            <div className='header-margin' />
            <h1><SettingsIcon />User Settings</h1>
            <hr />
            <div className='page-medium'>
                <div className='prompt'>
                    <HelpIcon />
                    <p>Adjust user settings here.</p>
                </div>
                <p>Upload Avatar</p>
                <p>Change Username</p>
                <p>Change Email</p>
                <p>Change First / Last Name</p>
                <p>Change Password</p>
            </div>
        </div>
    );
}
