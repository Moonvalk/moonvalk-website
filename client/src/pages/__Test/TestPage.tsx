import { ReactElement, ReactNode, useRef, useState } from "react";
import { ACCESS_LEVEL } from "../../stores/User";
import { PreviewIcon } from "../../assets/svg/icons/Actions";
import { ButtonElement } from "../../components/Button/ButtonElement";
import { PageTemplate } from "../../components/PageTemplate/PageTemplate";
import { TestIcon } from "../../assets/svg/icons/Misc";
import { MVEditorToolbar } from "../Admin/PostEditor/MarkdownEditor/MVEditorToolbar";
import { MarkdownParser } from "../../utils/Markdown/MarkdownParser";
import '../Admin/PostEditor/MarkdownEditor/MVPostEditor.css';

const TEST_MARKDOWN_TEXT = `^^1It's Official
---

$[align_justified font_abel&;Today is the day. We are happy to announce the official launch of the new $[color_highlight1&;***Moonvalk Studios***] brand and website!]

$[medium&;![Sundown Express&;..\\uploads\\9569ac08b3452b9d7369af5572cc5373.png&;Screenshot of Sundown Express]]
+[$[center text_large font_bebas-neue&;*Get ready to play some games!*]&;celebrate]`;

export function TestPage(): ReactElement {
    const editorRef = useRef<HTMLDivElement>(null);
    const htmlEditorRef = useRef<HTMLTextAreaElement>(null);
    const previewRef = useRef<HTMLIFrameElement>(null);

    const [preview, setPreview] = useState<ReactNode>(null);
    const [postContent, setPostContent] = useState(TEST_MARKDOWN_TEXT);

    function handleKeyDown(event_: React.KeyboardEvent<HTMLTextAreaElement>): void {
        const start = htmlEditorRef.current.selectionStart;
        const end = htmlEditorRef.current.selectionEnd;
        const value = htmlEditorRef.current.value;

        if (event_.key === 'Tab') {
            event_.preventDefault();
            htmlEditorRef.current.value = value.substring(0, start) +
                '\t' + value.substring(end);
            htmlEditorRef.current.selectionStart = htmlEditorRef.current.selectionEnd = start + 1;
        } else if (event_.key === 'b' && event_.ctrlKey) {
            event_.preventDefault();
            htmlEditorRef.current.value = value + '**';
            htmlEditorRef.current.selectionStart = htmlEditorRef.current.selectionEnd =
                end + 2;
        }
    }

    function handleKeyUp(event_: React.KeyboardEvent<HTMLTextAreaElement>): void {
        // ...
    }

    function addPostData(event_?: React.MouseEvent): void {
        let parsedData: string = '';
        if (htmlEditorRef.current.value === '') {
            return;
        }

        setPreview(MarkdownParser.instance.renderMarkdown(htmlEditorRef.current.value));
    }

    return (
        <PageTemplate title='Test Page' icon={<TestIcon />} pageWrap='page_large'
            accessLevel={ACCESS_LEVEL.ADMIN}>
            <MVEditorToolbar />
            <div ref={editorRef} className='editor' style={{}}>
                <textarea ref={htmlEditorRef} 
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    value={postContent}
                    onChange={(event_) => setPostContent(event_.target.value)}
                    className='html-editor' />
                <ButtonElement icon={<PreviewIcon />} text='Preview' onClick={addPostData} />
                <div ref={previewRef} className='preview'>
                    {preview}
                </div>
            </div>
        </PageTemplate>
    );
}
