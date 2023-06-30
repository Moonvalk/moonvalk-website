import { ReactElement } from "react";
import { PageTitle } from "../../templates/PageTitle";
import { SettingsIcon } from "../../icons/SettingsIcon";
import { InfoIcon } from "../../icons/InfoIcon";
import { HelpIcon } from "../../icons/HelpIcon";


export function SettingsPage(): ReactElement {
    return (
        <div className='content'>
            <PageTitle title='Settings' />
            <div className='header-margin' />
            <h1 className='page-title'><SettingsIcon />User Settings</h1>
            <hr className='hr-fade' />
            <div className='page-medium'>
                <div className='prompt'>
                    <HelpIcon />
                    <p className='body-text'>Adjust user settings here.</p>
                </div>
                <p className='body-text'>Upload Avatar</p>
                <p className='body-text'>Change Username</p>
                <p className='body-text'>Change Email</p>
                <p className='body-text'>Change First / Last Name</p>
                <p className='body-text'>Change Password</p>
            </div>
        </div>
    );
}
