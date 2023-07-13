import { ReactElement } from "react";
import { SettingsIcon } from "../../../assets/svg/icons/Menus";
import { HelpIcon } from "../../../assets/svg/icons/Misc";
import { PageTemplate } from "../../../components/PageTemplate/PageTemplate";
import { PromptElement } from "../../../components/Prompt/PromptElement";
import { userAuthStore, ACCESS_LEVEL } from "../../../stores/User";

export function SettingsPage(): ReactElement {
    const {userInfo, userLoggedIn} = userAuthStore();

    return (
        <PageTemplate title='Settings' icon={<SettingsIcon />} pageWrap='page_medium'
            accessLevel={ACCESS_LEVEL.USER}>
            <PromptElement icon={<HelpIcon />} text='Adjust user settings here.' />
            {userLoggedIn && (
                <>
                    <p className='text_body'>Username: {userInfo.username}</p>
                    <p className='text_body'>Email: {userInfo.email}</p>
                    <p className='text_body'>First / Last Name: 
                        {` ${userInfo.firstName} ${userInfo.lastName}`}</p>
                    <p className='text_body'>Password</p>
                </>
            )}
        </PageTemplate>
    );
}
