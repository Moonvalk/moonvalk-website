import { ReactElement } from "react";
import { EditIcon, UploadIcon } from "../../../../assets/svg/icons/Actions";
import { PageTemplate } from "../../../../components/PageTemplate/PageTemplate";
import { ACCESS_LEVEL } from "../../../../stores/User";
import { PromptElement } from "../../../../components/Prompt/PromptElement";
import { InfoIcon } from "../../../../assets/svg/icons/Misc";

export function UploadManagerPage(): ReactElement {
    return (
        <PageTemplate title={'Upload Manager'} icon={<UploadIcon />} accessLevel={ACCESS_LEVEL.ADMIN} pageWrap='page_large'>
            <PromptElement text='This is the upload manager' icon={<InfoIcon />} />
        </PageTemplate>
    );
}
