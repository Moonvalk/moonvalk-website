import { ReactElement, useEffect, useLayoutEffect, useState } from "react";
import { PageTitle } from "../../templates/PageTitle";
import { getServerURI } from "../../../utils/URIHelper";
import { Navigate, useParams } from "react-router-dom";
import PostEditor from "../../tools/PostEditor";
import { getCurrentFormattedDate } from "../../../utils/time";
import { NewPostIcon } from "../../icons/menus/NewPostIcon";
import { INewsPost } from "../../sections/NewsPostCard";
import { EditIcon } from "../../icons/actions/EditIcon";
import { DeleteIcon } from "../../icons/actions/DeleteIcon";
import '../../tools/styles/Form.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import { PageTemplate } from "../../templates/PageTemplate";
import { ACCESS_LEVEL } from "../../../stores/userAuth.store";
import { format } from 'date-fns';
import { TEXT_FORMATTING } from "../../../constants/TextFormatting";

export function EditPostPage(): ReactElement {
    const {id} = useParams();
    const [postTitle, setPostTitle] = useState('');
    const [postSubtitle, setPostSubtitle] = useState('');
    const [postDate, setPostDate] = useState('');
    const [postSummary, setPostSummary] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postStatus, setPostStatus] = useState('draft');
    const [postCategory, setPostCategory] = useState('general');
    const [files, setFiles] = useState<FileList | null>(null);
    const [redirect, setRedirect] = useState(false);
    const [currentDate, setCurrentDate] = useState('');

    useLayoutEffect(() => {
        getCurrentDate();
    }, []);

    useEffect(() => {
        fetch(getServerURI('api/post/'.concat(id))).then((response_) => {
            response_.json().then((postInfo_: INewsPost) => {
                setPostTitle(postInfo_.title);
                setPostSubtitle(postInfo_.subtitle);
                setPostDate(format(new Date(postInfo_.date), TEXT_FORMATTING.POST_INTERNAL_DATE));
                setPostSummary(postInfo_.summary);
                setPostContent(postInfo_.content);
                setPostStatus(postInfo_.status);
                setPostCategory(postInfo_.category);
            });
        });
    }, []);

    async function handleDeletePost(): Promise<void> {
        confirm('Are you sure you would like to delete this post? This cannot be undone.');
    }

    async function handleUpdatePost(event_: any): Promise<void> {
        // if (event_.target.value !== 'delete') {
        //     handleDeletePost();
        //     return;
        // }
        event_.preventDefault();
        const data = new FormData();
        data.set('title', postTitle);
        data.set('subtitle', postSubtitle);
        data.set('date', postDate);
        data.set('status', postStatus);
        data.set('category', postCategory);
        data.set('summary', postSummary);
        data.set('content', postContent);
        data.set('id', id as (string | Blob));
        if (files !== null) {
            data.set('file', files[0]);
        }

        const response = await fetch(getServerURI('api/post'), {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            setRedirect(true);
        } else {
            alert('An error occurred editing this post');
        }
    }

    function getCurrentDate(): void {
        setCurrentDate(getCurrentFormattedDate());
    }

    if (redirect) {
        return <Navigate to={'/news/post/'.concat(id)} />
    }

    return (
        <PageTemplate title='Edit Post' icon={<NewPostIcon />} pageWrap='page'
            accessLevel={ACCESS_LEVEL.USER}>
            <form onSubmit={handleUpdatePost}>
                <div className='flex'>
                    <label htmlFor="title">Title*</label>
                    <label htmlFor="date">Date</label>
                </div>
                <div className='flex'>
                    <input id='title'
                        type='text'
                        placeholder={'Title'} 
                        value={postTitle} 
                        onChange={event => setPostTitle(event.target.value)} />
                    <input id='date'
                        type='text'
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
                <PostEditor onChange={setPostContent} value={postContent} />
                <div className='buttons'>
                    <button className='submit-button'
                        name='action'
                        value='edit'>
                        <EditIcon />
                        Update Post
                    </button>
                    <button className='submit-button delete-button'
                        name='action'
                        value='delete'>
                        <DeleteIcon />
                        Delete Post
                    </button>
                </div>
            </form>
        </PageTemplate>
    );
}
