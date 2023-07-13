import { ReactElement } from "react";
import { UploadIcon } from "../../../../assets/svg/icons/Actions";
import { PageTemplate } from "../../../../components/PageTemplate/PageTemplate";
import { ACCESS_LEVEL } from "../../../../stores/User";
import { PromptElement } from "../../../../components/Prompt/PromptElement";
import { InfoIcon } from "../../../../assets/svg/icons/Misc";

/**
 * Generates the upload manager page used to handle image files.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function UploadManagerPage(): ReactElement {
    return (
        <PageTemplate title={'Upload Manager'} icon={<UploadIcon />} accessLevel={ACCESS_LEVEL.ADMIN} pageWrap='page_large'>
            <PromptElement text='This is the upload manager' icon={<InfoIcon />} />
        </PageTemplate>
    );
}
