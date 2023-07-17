import { ReactElement, ReactNode, useRef, useState } from "react";
import { ACCESS_LEVEL } from "../../stores/User";
import { PreviewIcon } from "../../assets/svg/icons/Actions";
import { ButtonElement } from "../../components/Button/ButtonElement";
import { PageTemplate } from "../../components/PageTemplate/PageTemplate";
import { TestIcon } from "../../assets/svg/icons/Misc";
import { MVEditorToolbar } from "../Admin/PostEditor/MarkdownEditor/MVEditorToolbar";
import { MarkdownParser } from "../../utils/Markdown/MarkdownParser";
import '../Admin/PostEditor/MarkdownEditor/MVPostEditor.css';

const TEST_MARKDOWN_TEXT = `$[align_justified indent&;Today is the day. We are happy to announce the official launch of the new $[color_highlight1&;***Moonvalk Studios***] brand and website! Moonvalk is an independent game developer and publisher based out of northeast Ohio in the United States. Our focus is to bring back retro experiences in bold new ways. Our main goal is to bring players content that is, well, just plain fun again.]


$[align_center video_container&;!![<iframe src="https://player.vimeo.com/video/385779510?h=e652b18de0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>]]


$[align_left indent&;The entire studio is currently operated as a solo endeavor by one person- *myself*. My name is $[color_highlight1&;Zack Harmon], a self taught artist, musician, and programmer. I have been *designing / developing* games for **thirteen years**, and have worked as a professional engineer for four. I recently had the amazing opportunity to take on my dreams and open this studio full time (not that it's without it's hardships). I am incredibly happy to spend these next few months building the content that I have been sitting on for years and hope you all enjoy the ride along with me.]

$[image_medium&;![Sundown Express&;..\\uploads\\9569ac08b3452b9d7369af5572cc5373.png&;Concept art of $[color_highlight4&;*Sundown Express*], an arcade sci-fi delivery game.]]

$[align_left indent&;I will be announcing new projects very soon and plan to post devlogs / videos as development is under way. Part of the dream is for this studio to stay as transparent as possible and to share insights into what all goes on "under the hood." I love helping the community that assisted in my many years of growth and cannot thank you all enough for the support to get me this far!]

$[align_left indent&;That's all for now, folks. I hope to chat again soon and am happy to be reached through social media or our contact form.]

+[$[center text_large font_bebas-neue&;*Get ready to play!*]&;celebrate]`;

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
