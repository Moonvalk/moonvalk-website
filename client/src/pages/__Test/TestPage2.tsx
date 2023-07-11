import { ReactElement, ReactNode, useRef, useState } from "react";
import { ACCESS_LEVEL } from "../../stores/User";
import { PreviewIcon } from "../../assets/svg/icons/Actions";
import { ButtonElement } from "../../components/Button/ButtonElement";
import { ImageComponent } from "../../components/Image/ImageComponent";
import { PageTemplate } from "../../components/PageTemplate/PageTemplate";
import './TestPage.css';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, CodeIcon, ImageIcon, ItalicIcon, LinkIcon, ListIcon, StrikethroughIcon, TextIcon, UnderlineIcon, UnorderedListIcon } from "../../assets/svg/icons/Editor";
import { NewPostIcon } from "../../assets/svg/icons/Menus";
import { TestIcon } from "../../assets/svg/icons/Misc";
import { EditorToolbar } from "../Admin/PostEditor/EditorToolbar";

/**
|-------------------------------------|---------------------------|
|  Markdown                           |HTML                       |
|-------------------------------------|---------------------------|
|# Heading level 1                    |<h1>Heading level 1</h1>   |
|## Heading level 2                   |<h2>Heading level 2</h2>   |
|### Heading level 3                  |<h3>Heading level 3</h3>   |
|#### Heading level 4                 |<h4>Heading level 4</h4>   |
|##### Heading level 5                |<h5>Heading level 5</h5>   |
|###### Heading level 6               |<h6>Heading level 6</h6>   |
|__bold text__                        |<strong>bold text</strong> |
|**bold text**                        |<strong>bold text</strong> |
|_italic text_                        |<em>italic text</em>       |
|*italic text*                        |<em>italic text</em>       |
|`word`                               |<code>word</code>          |
|  Unordered list with "+", "*"       |                           |
| + First item                        | • First item              |
| + Second item                       | • Second item             |                    
|Link [Guide](https://www.google.com) | Guide                     |
|-----------------------------------------------------------------|
 */

// interface PostElement {
//     elements: {
//         type: string,
//         value: string,
//         display?: string,
//         class?: string,
//     }[]
// }

// const testData: PostElement = {
//     "elements": [
//         { "type": "text", "value": "Welcome to the new website", "class": "body-text center" },
//         { "type": "image", "value": "..\\uploads\\9569ac08b3452b9d7369af5572cc5373.png" },
//         { "type": "text", "value": "Welcome to the new website", "class": "body-text center" }
//     ]
// };

export function TestPage(): ReactElement {
    const editorRef = useRef<HTMLDivElement>(null);
    const htmlEditorRef = useRef<HTMLTextAreaElement>(null);
    const jsonPreviewRef = useRef<HTMLTextAreaElement>(null);
    const previewRef = useRef<HTMLIFrameElement>(null);

    const [openedTag, setOpenedTag] = useState(false);

    // const [displayContent, setDisplayContent] = useState([]);
    // const [postContent, setPostContent] = useState<PostElement>(null);

    const [postContent, setPostContent] = useState('');
    // const [postList, setPostList] = useState([]);

    function handleKeyDown(event_: React.KeyboardEvent<HTMLTextAreaElement>): void {
        const start = htmlEditorRef.current.selectionStart;
        const end = htmlEditorRef.current.selectionEnd;
        const value = htmlEditorRef.current.value;

        if (event_.key === 'Tab') {
            event_.preventDefault();
            htmlEditorRef.current.value = value.substring(0, start) +
                '\t' + value.substring(end);
            htmlEditorRef.current.selectionStart = htmlEditorRef.current.selectionEnd = start + 1;
        } else if (event_.key === 'Backspace') {
            event_.preventDefault();
            if (htmlEditorRef.current.value.length > 0) {
                if (start !== end) {
                    htmlEditorRef.current.value = value.slice(0, start) + value.slice(end);
                    htmlEditorRef.current.selectionStart = htmlEditorRef.current.selectionEnd =
                        start;
                    setOpenedTag(false);
                } else {
                    if (value.substring(start - 1, start) === '<') {
                        setOpenedTag(false);
                    }
                    htmlEditorRef.current.value = value.slice(0, start - 1) + value.slice(start, value.length);
                    htmlEditorRef.current.selectionStart = htmlEditorRef.current.selectionEnd =
                        start - 1;
                }
            }
        } else if (event_.key === '<') {
            event_.preventDefault();
            setOpenedTag(true);
            htmlEditorRef.current.value = value.substring(0, start) + '<' + value.substring(end);
            htmlEditorRef.current.selectionStart = htmlEditorRef.current.selectionEnd =
                end + 1;
        } else if (event_.key === '/') {
            event_.preventDefault();
            setOpenedTag(false);
            htmlEditorRef.current.value = value.substring(0, start) + '/' + value.substring(end);
            htmlEditorRef.current.selectionStart = htmlEditorRef.current.selectionEnd =
                end + 1;
        } else if (event_.key === '>') {
            event_.preventDefault();
            if (openedTag) {
                const splitString = value.substring(0, end).split('<');
                htmlEditorRef.current.value = value.substring(0, start) + '></' +
                    (splitString[splitString.length - 1].split(' ')[0]) + '>' + value.substring(end);
            } else {
                htmlEditorRef.current.value = value.substring(0, start) + '>' + value.substring(end);
            }
            setOpenedTag(false);
            htmlEditorRef.current.selectionStart = htmlEditorRef.current.selectionEnd =
                end + 1;
        } else if (event_.key === 'b' && event_.ctrlKey) {
            event_.preventDefault();
            htmlEditorRef.current.value = value + '**';
            htmlEditorRef.current.selectionStart = htmlEditorRef.current.selectionEnd =
                end + 2;
        }
    }

    function handleKeyUp(event_: React.KeyboardEvent<HTMLTextAreaElement>): void {
        // previewRef.current.innerHTML = htmlEditorRef.current.value;
        // renderTextArea();
        // setPostContent(htmlEditorRef.current.value);
    }

    function addPostData(event_?: React.MouseEvent): void {
        let parsedData: string = '';
        if (htmlEditorRef.current.value === '') {
            return;
        }
        let postData = htmlEditorRef.current.value.replace(/(?:\r|\n|\r\n)/g, '<br />');
        // postData.split('</>')

        jsonPreviewRef.current.value = postData;
        previewRef.current.innerHTML = postData;
    }

    // function addPostData(event_?: React.MouseEvent): void {
    //     const parsedData: ReactNode[] = [];
    //     if (htmlEditorRef.current.value !== '') {
    //         let postData: PostElement;
    //         try {
    //             postData = JSON.parse(htmlEditorRef.current.value);
    //         } catch (error_) {
    //             alert('An error occurred when parsing the input JSON.');
    //             return;
    //         }
            
    //         if (!postData?.elements) {
    //             alert('An error occurred when parsing the input JSON.');
    //             return;
    //         }
    //         let key = 0;
    //         postData.elements.forEach((element) => {
    //             switch (element.type) {
    //                 case 'text':
    //                     parsedData.push(<p key={++key} className={'editable' + (element.class ? ` ${element.class}` : '')}>{element.value}</p>);
    //                     break;
    //                 case 'image':
    //                     parsedData.push(
    //                         <div key={++key} className={'news-image editable' + (element.class ? ` ${element.class}` : '')}>
    //                             <ImageComponent key={++key} alt=''
    //                                 source={element.value} />
    //                         </div>
    //                         );
    //                     break;
    //                 case 'html':
    //                     parsedData.push(
    //                         <div key={++key} className={'editable' + (element.class ? ` ${element.class}` : '')}
    //                             dangerouslySetInnerHTML={{ __html: element.value}} />
    //                     );
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         });
    //         // setDisplayContent(parsedData);
    //         setPostList(parsedData);
    //         // setPostContent(parsedData);
    //         // htmlEditorRef.current
    //     }
    // }

    function handlePaste(): void {

    }

    function renderTextArea(): void {
        
    }

    return (
        <PageTemplate title='Test Page' icon={<TestIcon />} pageWrap='page' accessLevel={ACCESS_LEVEL.ADMIN}>
            <EditorToolbar />
            <div ref={editorRef} className='editor'>
                {/* <ButtonElement icon={<EditIcon />} text='Edit' /> */}
                {/* <p><span className='html-editor' role='textbox' contentEditable></span></p> */}
                <textarea ref={htmlEditorRef} 
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    className='html-editor' />
                <ButtonElement icon={<PreviewIcon />} text='Preview' onClick={addPostData} />
                <textarea ref={jsonPreviewRef} className='html-editor'></textarea>
                <div ref={previewRef} className='preview'>
                </div>
            </div>
        </PageTemplate>
    );
}
