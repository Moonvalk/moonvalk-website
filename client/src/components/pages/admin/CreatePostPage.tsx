import { ReactElement, useLayoutEffect, useState } from "react";
import { PageTitle } from "../../layout/PageTitle";
import { getServerURI } from "../../../utils/URIHelper";
import { Navigate } from "react-router-dom";
import PostEditor from "../../tools/PostEditor";
import 'react-quill/dist/quill.snow.css';
import '../../tools/styles/Form.css';
import { getCurrentFormattedDate } from "../../../utils/time";
import { NewPostIcon } from "../../icons/NewPostIcon";


export function CreatePostPage(): ReactElement {
    const [postTitle, setPostTitle] = useState('');
    const [postDate, setPostDate] = useState('');
    const [postSummary, setPostSummary] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postStatus, setPostStatus] = useState('');
    const [postCategory, setPostCategory] = useState('');
    const [files, setFiles] = useState<FileList | null>(null);
    const [redirect, setRedirect] = useState(false);
    const [currentDate, setCurrentDate] = useState('');

    useLayoutEffect(() => {
        getCurrentDate();
    }, []);

    async function handleCreateNewPost(event_: any): Promise<void> {
        const data = new FormData();
        data.set('title', postTitle);
        data.set('summary', postSummary);
        data.set('content', postContent);
        if (files !== null) {
            data.set('file', files[0]);
        }
        event_.preventDefault();

        const response = await fetch(getServerURI('post'), {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            setRedirect(true);
        } else {
            alert('An error occurred making this post');
        }
    }

    function getCurrentDate(): void {
        setCurrentDate(getCurrentFormattedDate());
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='content'>
            <PageTitle title="Create New Post" />
            <div className='page'>
                <h1><NewPostIcon />Add New Post</h1>
                <hr />
                <form onSubmit={handleCreateNewPost}>
                    <div className='flex'>
                        <label htmlFor="title">Title*</label>
                        <label htmlFor="title">Date</label>
                    </div>
                    <div className='flex'>
                        <input id='title'
                            type="title"
                            placeholder={'Title'} 
                            value={postTitle} 
                            onChange={event => setPostTitle(event.target.value)} />
                        <input id='date'
                            type="text"
                            placeholder={currentDate}
                            value={postDate} 
                            onChange={event => setPostDate(event.target.value)} />
                    </div>
                    <div className='flex'>
                        <label htmlFor="status">Status</label>
                        <label htmlFor="category">Category</label>
                        <label htmlFor="cover-image">Cover*</label>
                    </div>
                    <div className='flex'>
                        <select id='status'
                            value={postStatus}
                            onChange={event => setPostStatus(event.target.value)}>
                            <option value='draft'>Draft</option>
                            <option value='published'>Published</option>
                            <option value='private'>Private</option>
                        </select>
                        <select id='category'
                            value={postCategory}
                            onChange={event => setPostCategory(event.target.value)}>
                            <option value='general'>General</option>
                            <option value='tutorial'>Tutorial</option>
                            <option value='devlog'>Devlog</option>
                            <option value='announcement'>Announcement</option>
                        </select>
                        <input className='file-select'
                            id='cover-image'
                            type="file"
                            onChange={event => setFiles(event.target.files)} />
                    </div>
                    <label htmlFor="summary">Summary*</label>
                    <input id="summary"
                        type="summary"
                        placeholder={'Summary'} 
                        value={postSummary}
                        onChange={event => setPostSummary(event.target.value)} />
                    <PostEditor onChange={setPostContent} value={postContent} />
                    <button className='submit-button'>Create New Post</button>
                </form>
            </div>
        </div>
    );
}
