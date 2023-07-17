import { ChangeEvent, ReactElement, useLayoutEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { EditIcon } from "../../../assets/svg/icons/Actions";
import { NewPostIcon } from "../../../assets/svg/icons/Menus";
import { PageTemplate } from "../../../components/PageTemplate/PageTemplate";
import { getCurrentFormattedDate } from "../../../utils/TimeUtils";
import { getServerURI } from "../../../utils/URIHelper";
import { ACCESS_LEVEL } from "../../../stores/User";
import { MVPostEditor } from "./MarkdownEditor/MVPostEditor";
import { ButtonElement } from "../../../components/Button/ButtonElement";
import { StringHelper } from "../../../utils/StringHelper";

/**
 * Generates the admin page for creating new posts.
 * @return {ReactElement} 
 */
export function CreatePostPage(): ReactElement {
    const [postTitle, setPostTitle] = useState('');
    const [postSubtitle, setPostSubtitle] = useState('');
    const [postDate, setPostDate] = useState('');
    const [postSummary, setPostSummary] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postStatus, setPostStatus] = useState('draft');
    const [postCategory, setPostCategory] = useState('general');
    const [coverFile, setCoverFile] = useState('');
    const [uri, setURI] = useState('');
    const [redirect, setRedirect] = useState<string>(null);
    const [currentDate, setCurrentDate] = useState('');

    /**
     * On initial page load just before first paint.
     */
    useLayoutEffect(() => {
        getCurrentDate();
    }, []);

    async function handleCreateNewPost(event_: any): Promise<void> {
        let overrideDate = (postDate !== '') ? postDate : getCurrentFormattedDate();
        event_.preventDefault();

        const response = await fetch(getServerURI('api/post'), {
            method: 'POST',
            body: JSON.stringify({
                title: postTitle,
                subtitle: postSubtitle,
                date: overrideDate,
                status: postStatus,
                category: postCategory,
                summary: postSummary,
                content: postContent,
                file: coverFile,
                uri: uri,
            }),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const postData = await response.json();
            setRedirect(`/news/post/${postData.uri}`);
        } else {
            alert('An error occurred making this post');
        }
    }

    /**
     * Handles getting the current date to be used by default for posts.
     * @return {void} void
     */
    function getCurrentDate(): void {
        setCurrentDate(getCurrentFormattedDate());
    }
    
    function handleAdjustPageTitle(event_: ChangeEvent<HTMLInputElement>): void {
        setPostTitle(event_.target.value);
        const splitTitle = event_.target.value.split('');
        let newURI = '';
        for (let index = 0; index < splitTitle.length; index++) {
            if (StringHelper.isAlpha(splitTitle[index])) {
                newURI += splitTitle[index].toLowerCase();
            } else if (splitTitle[index] === ' ') {
                newURI += '-';
            }
        }
        setURI(newURI);
    }

    // Handle redirects when set.
    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <PageTemplate title='Add New Post' icon={<NewPostIcon />} pageWrap='page_large'
            accessLevel={ACCESS_LEVEL.ADMIN}>
            <form className='form_basic' onSubmit={handleCreateNewPost}>
                <div className='flex'>
                    <label htmlFor="title">Title*</label>
                    <label htmlFor="date">Date</label>
                    <label htmlFor="uri">URI</label>
                </div>
                <div className='flex'>
                    <input id='title'
                        type="title"
                        placeholder={'Title'} 
                        value={postTitle} 
                        onChange={handleAdjustPageTitle} />
                    <input id='date'
                        type="text"
                        placeholder={currentDate}
                        value={postDate} 
                        onChange={event => setPostDate(event.target.value)} />
                    <input id='uri'
                        type="text"
                        placeholder={''}
                        value={uri} 
                        onChange={event => setURI(event.target.value)} />
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
                <ButtonElement type='submit' icon={<EditIcon />} text='Create New Post' />
            </form>
        </PageTemplate>
    );
}
