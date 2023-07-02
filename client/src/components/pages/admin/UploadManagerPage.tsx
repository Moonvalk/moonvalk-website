import { ReactElement } from "react";
import { PageTemplate } from "../../templates/PageTemplate";
import { EditIcon } from "../../icons/actions/EditIcon";
import { ACCESS_LEVEL } from "../../../stores/userAuth.store";

export function UploadManagerPage(): ReactElement {
    return (
        <PageTemplate title={'Upload Manager'} icon={<EditIcon />} accessLevel={ACCESS_LEVEL.ADMIN}>
            <div className='page'>
                <p className='body-text center'>This is the upload manager.</p>
            </div>
        </PageTemplate>
    );
}
