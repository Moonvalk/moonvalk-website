import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { PageTemplate } from "../templates/PageTemplate";
import { ACCESS_LEVEL } from "../../stores/userAuth.store";
import './styles/TestPage.css';
import '../tools/styles/Form.css';
import { ButtonElement } from "../elements/ButtonElement";
import { PreviewIcon } from "../icons/actions/PreviewIcon";
import { EditIcon } from "../icons/actions/EditIcon";
import { ImageComponent } from "../sections/ImageComponent";

interface PostElement {
    elements: {
        type: string,
        value: string,
        class?: string,
    }[]
}

const testData: PostElement = {
    "elements": [
        { "type": "text", "value": "Welcome to the new website", "class": "body-text center" },
        { "type": "image", "value": "..\\uploads\\9569ac08b3452b9d7369af5572cc5373.png" }
    ]
};

export function TestPage(): ReactElement {
    const editorRef = useRef<HTMLDivElement>(null);
    const htmlEditorRef = useRef<HTMLTextAreaElement>(null);
    const previewRef = useRef<HTMLIFrameElement>(null);

    const [postList, setPostList] = useState([]);

    function handleKeyDown(event_: React.KeyboardEvent<HTMLTextAreaElement>): void {
        if (event_.key === 'Tab') {
            event_.preventDefault();
            const start = htmlEditorRef.current.selectionStart;
            const end = htmlEditorRef.current.selectionEnd;

            htmlEditorRef.current.value = htmlEditorRef.current.value.substring(0, start) +
                '\t' + htmlEditorRef.current.value.substring(end);
            htmlEditorRef.current.selectionStart = htmlEditorRef.current.selectionEnd = start + 1;
        }
    }

    function handleKeyUp(event_: React.KeyboardEvent<HTMLTextAreaElement>): void {
        // previewRef.current.innerHTML = htmlEditorRef.current.value;
    }

    function addPostData(event_: React.MouseEvent): void {
        const parsedData: ReactNode[] = [];
        if (htmlEditorRef.current.value !== '') {
            const postData: PostElement = JSON.parse(htmlEditorRef.current.value);
            let key = 0;

            if (!postData?.elements) {
                return;
            }
            postData.elements.forEach((element) => {
                switch (element.type) {
                    case 'text':
                        parsedData.push(<p key={++key} className={'editable' + (element.class ? ` ${element.class}` : '')}>{element.value}</p>);
                        break;
                    case 'image':
                        parsedData.push(
                            <div key={++key} className={'news-image editable' + (element.class ? ` ${element.class}` : '')}>
                                <ImageComponent key={++key} alt=''
                                    source={element.value} />
                            </div>
                            );
                        break;
                    case 'html':
                        parsedData.push(
                            <div key={++key} className='editable' dangerouslySetInnerHTML={{ __html: element.value}} />
                        );
                        break;
                    default:
                        break;
                }
            })
            setPostList(parsedData);
        }
    }

    return (
        <PageTemplate title='Test Page' pageWrap='page' accessLevel={ACCESS_LEVEL.ADMIN}>
            <div ref={editorRef} className='editor'>
                {/* <ButtonElement icon={<EditIcon />} text='Edit' /> */}
                <ButtonElement icon={<PreviewIcon />} text='Preview' onClick={addPostData} />
                {/* <p><span className='html-editor' role='textbox' contentEditable></span></p> */}
                <textarea ref={htmlEditorRef} 
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    className='html-editor' />
                <div ref={previewRef} className='preview'>
                    {postList}
                </div>
            </div>
        </PageTemplate>
    );
}
