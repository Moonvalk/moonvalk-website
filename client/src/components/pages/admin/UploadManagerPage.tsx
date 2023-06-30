import { ReactElement } from "react";
import { AccessLevel, PageTemplate } from "../../templates/PageTemplate";
import { EditIcon } from "../../icons/EditIcon";

export function UploadManagerPage(): ReactElement {
    return (
        <PageTemplate title={'Upload Manager'} icon={<EditIcon />} accessLevel={AccessLevel.ADMIN}>
            <div className='page'>
                <p className='body-text center'>This is the upload manager.</p>
            </div>
        </PageTemplate>
    );
}
