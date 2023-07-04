import { ReactElement } from "react";
import { SettingsIcon } from "../../../assets/svg/icons/Menus";
import { HelpIcon } from "../../../assets/svg/icons/Misc";
import { PageTemplate } from "../../../components/PageTemplate/PageTemplate";
import { PromptElement } from "../../../components/Prompt/PromptElement";
import { userAuthStore, ACCESS_LEVEL } from "../../../stores/User";

export function SettingsPage(): ReactElement {
    const {userInfo, userLoggedIn} = userAuthStore();

    return (
        <PageTemplate title='Settings' icon={<SettingsIcon />} pageWrap='page-medium'
            accessLevel={ACCESS_LEVEL.USER}>
            <PromptElement icon={<HelpIcon />} text='Adjust user settings here.' />
            {userLoggedIn && (
                <>
                    <p className='body-text'>Change Username: {userInfo.username}</p>
                    <p className='body-text'>Change Email: {userInfo.email}</p>
                    <p className='body-text'>Change First / Last Name: 
                        {` ${userInfo.firstName} ${userInfo.lastName}`}</p>
                    <p className='body-text'>Change Password</p>
                </>
            )}
        </PageTemplate>
    );
}
