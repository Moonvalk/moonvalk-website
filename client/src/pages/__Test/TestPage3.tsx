import { ReactElement, ReactNode, useRef, useState } from "react";
import { ACCESS_LEVEL } from "../../stores/User";
import { PreviewIcon } from "../../assets/svg/icons/Actions";
import { ButtonElement } from "../../components/Button/ButtonElement";
import { PageTemplate } from "../../components/PageTemplate/PageTemplate";
import { TestIcon } from "../../assets/svg/icons/Misc";
import { EditorToolbar } from "./EditorToolbar";
import { MarkdownParser } from "./MarkdownParser";
import './TestPage.css';

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

// #Heading
//
// **Moonvalk Studios** is officially open for business!
// ---
//
// This is some paragraph text.

// EQUATES TO:

// <h1>Heading</h1>
// <br />
// <p><b>Moonvalk Studios</b> is officially open for business!</p>
// <hr />
// <br />
// <p>This is some paragraph text.</p>

// AS COMMANDS:

// [H1, 'Heading', H1, BREAK, PARAGRAPH, BOLD, 'Moonvalk Studios', BOLD, ' is officially open for business!',
//      PARAGRAPH, HORIZONTAL_LINE, BREAK, PARAGRAPH, 'This is some paragraph text.', PARAGRAPH]

/* <strong> and <em> are semantic - they specify that the enclosed text should be "strong" or "emphasised" in some way, usually bold and italic, but allow for the actual styling to be controlled via CSS. Hence these are preferred in modern web pages. */

// const TEST_MARKDOWN_TEXT = `#Heading
// ##Subheading
// ---
// This is some **paragraph** text.
// These features __should__ all work now.

// - List Item 1
// - List Item 2
// - List Item 3
// `;

const TEST_MARKDOWN_TEXT = `#HEADING 1
##HEADING 2
###HEADING 3
####HEADING 4
#####HEADING 5
######HEADING 6
___

This is some *italic text* and **bold** and _underline_ and __strikethrough.__

- List Item 1
- List Item 2
- List Item 3

> This is a blockquote
![Sundown Express, ..\\uploads\\9569ac08b3452b9d7369af5572cc5373.png]
[This is a link, https://moonvalk.com]
<[<iframe width="560" height="315" src="https://www.youtube.com/embed/2zUwr1b9_nA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>]`;

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
        <PageTemplate title='Test Page' icon={<TestIcon />} pageWrap='page' accessLevel={ACCESS_LEVEL.ADMIN}>
            <EditorToolbar />
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
