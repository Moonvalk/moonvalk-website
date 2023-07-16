import { ReactElement } from "react";
import { ImageComponent } from "../../../../components/Image/ImageComponent";
import { IUpload } from "./UploadManagerPage";
import { ButtonElement } from "../../../../components/Button/ButtonElement";
import { DeleteIcon } from "../../../../assets/svg/icons/Actions";
import { getServerURI } from "../../../../utils/URIHelper";


interface IUploadCardProps {
    data: IUpload,
    onChangeCallback: () => void,
}

export function UploadCard(props_: IUploadCardProps): ReactElement {

    async function handleDeleteUpload(): Promise<void> {
        if (!confirm('Are you sure you want to delete this upload? It cannot be undone.')) {
            return;
        }
        const response = await fetch(getServerURI('api/upload/delete'), {
            method: 'DELETE',
            body: JSON.stringify({
                id: props_.data._id,
            }),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            props_.onChangeCallback();
        } else {
            alert('An error occurred deleting this upload.');
        }
    }

    return (
        <div className='upload_card'>
            <div className='upload_thumb'>
                <ImageComponent source={props_.data.source} alt={props_.data.name} />
            </div>
            <div>
                <h3>{props_.data.name}</h3>
                <p>{props_.data.source}</p>
                <ButtonElement class='button_trash' onClick={handleDeleteUpload}
                    icon={<DeleteIcon />} />
            </div>
        </div>
    );
}
