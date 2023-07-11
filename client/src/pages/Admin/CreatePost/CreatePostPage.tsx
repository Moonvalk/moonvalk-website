import { ReactElement, useLayoutEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { EditIcon } from "../../../assets/svg/icons/Actions";
import { NewPostIcon } from "../../../assets/svg/icons/Menus";
import { PageTemplate } from "../../../components/PageTemplate/PageTemplate";
import { getCurrentFormattedDate } from "../../../utils/TimeUtils";
import { getServerURI } from "../../../utils/URIHelper";
import { ACCESS_LEVEL } from "../../../stores/User";
import PostEditor from "./PostEditor";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import { MVPostEditor } from "../PostEditor/MVPostEditor";
import { ButtonElement } from "../../../components/Button/ButtonElement";


export function CreatePostPage(): ReactElement {
    const [postTitle, setPostTitle] = useState('');
    const [postSubtitle, setPostSubtitle] = useState('');
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
        data.set('subtitle', postSubtitle);
        let overrideDate = (postDate !== '') ? postDate : getCurrentFormattedDate();
        data.set('date', overrideDate);
        data.set('status', postStatus);
        data.set('category', postCategory);
        data.set('summary', postSummary);
        data.set('content', postContent);
        if (files !== null) {
            data.set('file', files[0]);
        }
        event_.preventDefault();

        const response = await fetch(getServerURI('api/post'), {
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
        <PageTemplate title='Add New Post' icon={<NewPostIcon />} pageWrap='page_large'
            accessLevel={ACCESS_LEVEL.ADMIN}>
            <form onSubmit={handleCreateNewPost}>
                <div className='flex'>
                    <label htmlFor="title">Title*</label>
                    <label htmlFor="date">Date</label>
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
                <div className='flex'>
                    <label htmlFor="subtitle">Subtitle</label>
                    <label htmlFor="summary">Summary*</label>
                </div>
                <div className='flex'>
                    <input id='subtitle'
                        type="subtitle"
                        placeholder={'Subtitle'} 
                        value={postSubtitle} 
                        onChange={event => setPostSubtitle(event.target.value)} />
                    <input id="summary"
                        type="summary"
                        placeholder={'Summary'} 
                        value={postSummary}
                        onChange={event => setPostSummary(event.target.value)} />
                </div>
                <MVPostEditor onChange={setPostContent} value={postContent} />
                <ButtonElement type='submit' icon={<EditIcon />} text='Create New Post' />
            </form>
        </PageTemplate>
    );
}
