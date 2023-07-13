import { ChangeEventHandler, Dispatch, ReactElement, ReactNode, SetStateAction, useRef, useState } from "react";
import { MVEditorToolbar } from "./MVEditorToolbar";
import { MarkdownParser } from "../../../../utils/Markdown/MarkdownParser";
import { PreviewIcon } from "../../../../assets/svg/icons/Actions";
import { ButtonElement } from "../../../../components/Button/ButtonElement";
import './MVPostEditor.css';

/**
 * Properties used to assign to the MVPostEditor.
 */
interface IMVEditorProps {
    /**
     * The value assigned to the editor contents on load.
     */
    value: string,

    /**
     * Called whenever the markdown editor contents change.
     */
    onChange: ChangeEventHandler<HTMLTextAreaElement>,
}

/**
 * Generates a new post editor used to edit and preview markdown text.
 * @param props_ - Properties used for controlling the content of this editor.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function MVPostEditor(props_: IMVEditorProps): ReactElement {
    /**
     * Stores reference to the markdown editor text area.
     */
    const markdownEditorRef = useRef<HTMLTextAreaElement>(null);

    /**
     * Stores reference to the preview window for displaying tests.
     */
    const previewRef = useRef<HTMLIFrameElement>(null);

    /**
     * Used to adjust the current preview displayed.
     */
    const [preview, setPreview] = useState<ReactNode>(null);

    /**
     * Handles the key down event when typing in the markdown editor.
     * @param {React.KeyboardEvent<HTMLTextAreaElement>} event_ - Event data tied to the text area element.\
     * @return {void} void
     */
    function handleKeyDown(event_: React.KeyboardEvent<HTMLTextAreaElement>): void {
        const start = markdownEditorRef.current.selectionStart;
        const end = markdownEditorRef.current.selectionEnd;
        const value = markdownEditorRef.current.value;

        // Handle tabs as extra spaces.
        if (event_.key === 'Tab') {
            event_.preventDefault();
            markdownEditorRef.current.value = value.substring(0, start) +
                '\t' + value.substring(end);
            markdownEditorRef.current.selectionStart = markdownEditorRef.current.selectionEnd = start + 1;
        } else if (event_.key === 'b' && event_.ctrlKey) {
            event_.preventDefault();
            markdownEditorRef.current.value = value + '**';
            markdownEditorRef.current.selectionStart = markdownEditorRef.current.selectionEnd =
                end + 2;
        }
    }

    /**
     * 
     * @param event_ 
     */
    function handleKeyUp(event_: React.KeyboardEvent<HTMLTextAreaElement>): void {
        // ...
    }

    function renderPreview(event_?: React.MouseEvent): void {
        let parsedData: string = '';
        if (markdownEditorRef.current.value === '') {
            return;
        }
        setPreview(MarkdownParser.instance.renderMarkdown(markdownEditorRef.current.value));
    }

    return (
        <>
            <MVEditorToolbar />
            <div className='editor' style={{}}>
                <textarea ref={markdownEditorRef} 
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    value={props_.value}
                    onChange={props_.onChange}
                    className='html-editor' />
                <div className='buttons'>
                    <ButtonElement type='button' icon={<PreviewIcon />} text='Preview' onClick={renderPreview} />
                </div>
                <div ref={previewRef} className='preview'>
                    {preview}
                </div>
            </div>
        </>
    );
}
