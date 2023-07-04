import { ReactElement } from "react";
import { EditIcon } from "../../../../assets/svg/icons/Actions";
import { PageTemplate } from "../../../../components/PageTemplate/PageTemplate";
import { ACCESS_LEVEL } from "../../../../stores/User";

export function UploadManagerPage(): ReactElement {
    return (
        <PageTemplate title={'Upload Manager'} icon={<EditIcon />} accessLevel={ACCESS_LEVEL.ADMIN}>
            <div className='page'>
                <p className='body-text center'>This is the upload manager.</p>
            </div>
        </PageTemplate>
    );
}
