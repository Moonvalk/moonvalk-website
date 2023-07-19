import { ChangeEvent, ReactElement, useEffect, useLayoutEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { format } from 'date-fns';
import { EditIcon, DeleteIcon } from "../../../assets/svg/icons/Actions";
import { NewPostIcon } from "../../../assets/svg/icons/Menus";
import { PageTemplate } from "../../../components/PageTemplate/PageTemplate";
import { TEXT_FORMATTING } from "../../../constants/TextFormatting";
import { ACCESS_LEVEL } from "../../../stores/User";
import { getCurrentFormattedDate } from "../../../utils/TimeUtils";
import { getServerURI } from "../../../utils/URIHelper";
import { INewsPost } from "../../Main/News/Card/NewsPostCard";
import { MVPostEditor } from "./MarkdownEditor/MVPostEditor";
import { ButtonElement } from "../../../components/Button/ButtonElement";
import { StringHelper } from "../../../utils/StringHelper";

/**
 * Generates the post edit page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function EditPostPage(): ReactElement {
    const {id} = useParams();
    const [postTitle, setPostTitle] = useState('');
    const [postSubtitle, setPostSubtitle] = useState('');
    const [postDate, setPostDate] = useState('');
    const [postSummary, setPostSummary] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postStatus, setPostStatus] = useState('draft');
    const [postCategory, setPostCategory] = useState('general');
    const [coverFile, setCoverFile] = useState('');
    const [postURI, setPostURI] = useState('');
    const [postId, setPostId] = useState('');
    const [redirect, setRedirect] = useState<string | null>(null);
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
                setCoverFile(postInfo_.coverFile);
                setPostURI(postInfo_.uri);
                setPostId(postInfo_._id);
            });
        });
    }, []);

    async function handleDeletePost(): Promise<void> {
        if (confirm('Are you sure you would like to delete this post? This cannot be undone.')) {
            const response = await fetch(getServerURI('api/post/delete'), {
                method: 'DELETE',
                body: JSON.stringify({
                    id: id as (string | Blob),
                }),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                setRedirect('/news');
            } else {
                alert('An error occurred deleting this post');
            }
        }
    }

    async function handleUpdatePost(event_: any): Promise<void> {
        event_.preventDefault();
        const response = await fetch(getServerURI('api/post/edit'), {
            method: 'PUT',
            body: JSON.stringify({
                id: postId as (string | Blob),
                title: postTitle,
                subtitle: postSubtitle,
                date: postDate,
                status: postStatus,
                category: postCategory,
                summary: postSummary,
                content: postContent,
                file: coverFile,
                uri: postURI,
            }),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const postData = await response.json();
            setRedirect('/news/post/'.concat(postURI));
        } else {
            alert('An error occurred editing this post');
        }
    }

    function handleAdjustPageTitle(event_: ChangeEvent<HTMLInputElement>): void {
        setPostTitle(event_.target.value);
        setPostURI(StringHelper.convertToURI(event_.target.value));
    }

    function getCurrentDate(): void {
        setCurrentDate(getCurrentFormattedDate());
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <PageTemplate title='Edit Post' icon={<NewPostIcon />} pageWrap='page_large'
            accessLevel={ACCESS_LEVEL.USER}>
            <form className='form_basic' onSubmit={handleUpdatePost}>
                <div className='flex'>
                    <label htmlFor="title">Title*</label>
                    <label htmlFor="date">Date</label>
                    <label htmlFor="uri">URI</label>
                </div>
                <div className='flex'>
                    <input id='title'
                        type='text'
                        placeholder={'Title'} 
                        value={postTitle} 
                        onChange={handleAdjustPageTitle} />
                    <input id='date'
                        type='text'
                        placeholder={currentDate}
                        value={postDate} 
                        onChange={event => setPostDate(event.target.value)} />
                    <input id='uri'
                        type='text'
                        placeholder={''}
                        value={postURI} 
                        onChange={event => setPostURI(event.target.value)} />
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
                    <input id='cover-image'
                        type='text'
                        placeholder={''} 
                        value={coverFile}
                        onChange={event => setCoverFile(event.target.value)} />
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
                <MVPostEditor onChange={(event_) => setPostContent(event_.target.value)} value={postContent} />
                <div className='buttons'>
                    <ButtonElement name='action' value='edit' icon={<EditIcon />}
                        type='submit' text='Update Post' />
                    <ButtonElement name='action' value='delete' icon={<DeleteIcon />}
                        type='button' text='Delete Post' onClick={handleDeletePost}
                        class='button_basic button_delete' />
                </div>
            </form>
        </PageTemplate>
    );
}
