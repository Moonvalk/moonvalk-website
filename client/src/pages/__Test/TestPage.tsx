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

interface PostElement {
    elements: {
        type: string,
        value: string,
        display?: string,
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

    // const [displayContent, setDisplayContent] = useState([]);
    // const [postContent, setPostContent] = useState<PostElement>(null);

    const [postContent, setPostContent] = useState('');
    const [postList, setPostList] = useState([]);

    function handleKeyDown(event_: React.KeyboardEvent<HTMLTextAreaElement>): void {
        const start = htmlEditorRef.current.selectionStart;
        const end = htmlEditorRef.current.selectionEnd;
        const value = htmlEditorRef.current.value;

        if (event_.key === 'Tab') {
            event_.preventDefault();
            htmlEditorRef.current.value = value.substring(0, start) +
                '\t' + value.substring(end);
            htmlEditorRef.current.selectionStart = htmlEditorRef.current.selectionEnd = start + 1;
        }
        // if (event_.key === 'Backspace') {
        //     if (htmlEditorRef.current.value.length > 0) {
        //         if (start !== end) {
        //             htmlEditorRef.current.value = value.slice(0, start) + value.slice(end);
        //         } else {
        //             htmlEditorRef.current.value = value.slice(0, end - 1);
        //         }
        //     }
        //     return;
        // }
        // if (event_.key === 'Enter') {
        //     // htmlEditorRef.current.value += JSON.stringify();
        // }
        // htmlEditorRef.current.value += event_.key;
        // // addPostData();
    }

    

    function handleKeyUp(event_: React.KeyboardEvent<HTMLTextAreaElement>): void {
        // previewRef.current.innerHTML = htmlEditorRef.current.value;
        // renderTextArea();
        // setPostContent(htmlEditorRef.current.value);
    }

    function addPostData(event_?: React.MouseEvent): void {
        const parsedData: ReactNode[] = [];
        if (htmlEditorRef.current.value !== '') {
            let postData: PostElement;
            try {
                postData = JSON.parse(htmlEditorRef.current.value);
            } catch (error_) {
                alert('An error occurred when parsing the input JSON.');
                return;
            }
            
            if (!postData?.elements) {
                alert('An error occurred when parsing the input JSON.');
                return;
            }
            let key = 0;
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
                            <div key={++key} className={'editable' + (element.class ? ` ${element.class}` : '')}
                                dangerouslySetInnerHTML={{ __html: element.value}} />
                        );
                        break;
                    default:
                        break;
                }
            });
            // setDisplayContent(parsedData);
            setPostList(parsedData);
            // setPostContent(parsedData);
            // htmlEditorRef.current
        }
    }

    function handlePaste(): void {

    }

    function renderTextArea(): void {
        
    }

    return (
        <PageTemplate title='Test Page' icon={<TestIcon />} pageWrap='page' accessLevel={ACCESS_LEVEL.ADMIN}>
            <div className='editor-buttons'>
                <button className='editor-button' title='Add New Element'><NewPostIcon /></button>
                <button className='editor-button'><TextIcon /></button>
                <button className='editor-button'><ImageIcon /></button>
                <button className='editor-button'><CodeIcon /></button>
                <div className="vertical-break" />
                <select id='font-size' className='editor-select'>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='14'>14</option>
                    <option value='16'>16</option>
                    <option value='18'>18</option>
                    <option value='20'>20</option>
                    <option value='22'>22</option>
                    <option value='24'>24</option>
                    <option value='28'>28</option>
                    <option value='32'>32</option>
                </select>
                <select id='font-family' className='editor-select'>
                    <option value='abel' className='font_abel'>Abel</option>
                    <option value='bebas-neue' className='font_bebas-neue'>Bebas Neue</option>
                    <option value='jetbrains-mono' className='font_jetbrains-mono'>Jetbrains Mono</option>
                </select>
                <button className='editor-button'><BoldIcon /></button>
                <button className='editor-button selected'><ItalicIcon /></button>
                <button className='editor-button'><UnderlineIcon /></button>
                <button className='editor-button'><StrikethroughIcon /></button>
                <select id='font-color' className='editor-select'>
                    <option value='default' className='color_default'>Default</option>
                    <option value='highlight1' className='color_highlight1'>Highlight 1</option>
                    <option value='highlight2' className='color_highlight2'>Highlight 2</option>
                    <option value='highlight3' className='color_highlight3'>Highlight 3</option>
                    <option value='highlight4' className='color_highlight4'>Highlight 4</option>
                    <option value='highlight5' className='color_highlight5'>Highlight 5</option>
                    <option value='dim1' className='color_dim1'>Dim</option>
                    <option value='dim2' className='color_dim2'>Dimmer</option>
                </select>
                {/* <button className='editor-button'>Font Highlight</button> */}
                <button className='editor-button'><UnorderedListIcon /></button>
                <button className='editor-button'><ListIcon /></button>
                <button className='editor-button'><AlignLeftIcon /></button>
                <button className='editor-button'><AlignCenterIcon /></button>
                <button className='editor-button'><AlignRightIcon /></button>
                <button className='editor-button'><LinkIcon /></button>
            </div>
            <div ref={editorRef} className='editor'>
                {/* <ButtonElement icon={<EditIcon />} text='Edit' /> */}
                {/* <p><span className='html-editor' role='textbox' contentEditable></span></p> */}
                <textarea ref={htmlEditorRef} 
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    className='html-editor' />
                <ButtonElement icon={<PreviewIcon />} text='Preview' onClick={addPostData} />
                <div ref={previewRef} className='preview'>
                    {postList}
                </div>
            </div>
        </PageTemplate>
    );
}
