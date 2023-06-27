import { Dispatch, SetStateAction } from "react";
import ReactQuill from "react-quill";
import PostEditorToolbar, { formats, modules } from "./PostEditorToolbar";
import './styles/PostEditor.css';

export interface IEditorProps {
    value: string,
    onChange: Dispatch<SetStateAction<string>>
}

export default function PostEditor({value, onChange}: IEditorProps) {
    return (
        <div className="post-editor">
            <PostEditorToolbar />
            <ReactQuill
                modules={modules}
                formats={formats}
                value={value} 
                onChange={onChange}
                placeholder={"Write your post here..."}
            />
        </div>
    );
}