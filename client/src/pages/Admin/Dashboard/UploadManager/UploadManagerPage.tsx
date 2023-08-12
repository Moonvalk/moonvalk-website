import { ReactElement, useEffect, useState } from "react";
import { UploadIcon } from "../../../../assets/svg/icons/Actions";
import { PageTemplate } from "../../../../components/PageTemplate/PageTemplate";
import { ACCESS_LEVEL } from "../../../../stores/User";
import { PromptElement } from "../../../../components/Prompt/PromptElement";
import { InfoIcon } from "../../../../assets/svg/icons/Misc";
import { UploadCard } from "./UploadCard";
import { getServerURI } from "../../../../utils/URIHelper";
import { ButtonElement } from "../../../../components/Button/ButtonElement";
import { IImageData } from "../../../../components/Image/ImageComponent";
import { IconTritone } from "../../../../components/Icons/IconTritone";
import './UploadManagerPage.css';

export interface IUpload extends IImageData {
    _id: string,
}

/**
 * Generates the upload manager page used to handle image files.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function UploadManagerPage(): ReactElement {
    const [file, setFile] = useState<FileList | null>(null);
    const [uploads, setUploads] = useState<IUpload[]>([]);

    async function handleUpload(event_: React.FormEvent): Promise<void> {
        event_.preventDefault();
        if (!file || file.length < 1) {
            alert('No file selected.');
            return;
        }

        const data = new FormData();
        data.set('file', file[0]);

        const response = await fetch(getServerURI('api/upload'), {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            const newFile = await response.json();
            getUploads();
            // alert('File uploaded successfully.');
        } else {
            alert('An error occurred.');
        }
    }

    useEffect(() => {
        getUploads().catch((error_) => console.log(error_));
    }, []);

    async function getUploads(): Promise<void> {
        fetch(getServerURI('api/uploads')).then((response_) => {
            response_.json().then((uploads_: IUpload[]) => {
                setUploads(uploads_);
            });
        });
    }

    return (
        <PageTemplate title={'Upload Manager'} icon={<IconTritone baseSVG={<UploadIcon />} />}
            accessLevel={ACCESS_LEVEL.ADMIN} pageWrap='page_medium'>
            <PromptElement text='This is the upload manager' icon={<InfoIcon />} />
            <form className='form_basic' onSubmit={handleUpload}>
                <div className='flex'>
                    <input className='file-select' type='file'
                        onChange={(event_) => setFile(event_.target.files)} />
                    <ButtonElement text='Upload' icon={<UploadIcon />} />
                </div>
            </form>
            <div>
                {uploads.length > 0 && uploads.map((upload_: IUpload, index_: number) => {
                    return (
                        <UploadCard key={`image_${index_}`} data={upload_} onChangeCallback={getUploads} />
                    );
                })}
            </div>
        </PageTemplate>
    );
}
