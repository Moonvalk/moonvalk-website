import { ReactElement, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { format } from 'date-fns';
import { BackIcon, EditIcon } from "../../../../assets/svg/icons/Actions";
import { CalendarIcon } from "../../../../assets/svg/icons/Misc";
import { PageTemplate } from "../../../../components/PageTemplate/PageTemplate";
import { ParallaxElement } from "../../../../components/Parallax/ParallaxElement";
import { TEXT_FORMATTING } from "../../../../constants/TextFormatting";
import { userAuthStore, ACCESS_LEVEL } from "../../../../stores/User";
import { getServerURI } from "../../../../utils/URIHelper";
import { INewsPost } from "../Card/NewsPostCard";
import { MarkdownParser } from "../../../../utils/Markdown/MarkdownParser";
import { ImageComponent } from "../../../../components/Image/ImageComponent";
import './NewsPostPage.css';

/**
 * Called to generate a full news post page at the provided URI, if available.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function NewsPostPage(): ReactElement {
    /**
     * Stores reference to all post data pulled from the server.
     */
    const [postData, setPostData] = useState<INewsPost | null>(null);

    /**
     * Reference to active user data when available in the user auth store.
     */
    const {userInfo} = userAuthStore();

    /**
     * Pulls id from router params so we can fetch proper post data.
     */
    const {id} = useParams();

    /**
     * Flag that determines if a redirect is necessary when the current post cannot be loaded.
     */
    const [redirect, setRedirect] = useState(false);

    /**
     * Called on initial page load to attempt fetching server data.
     */
    useEffect(() => {
        fetch(getServerURI('api/post/'.concat(id))).then((response_) => {
            if (response_.ok) {
                response_.json().then((postInfo_: INewsPost) => {
                    setPostData(postInfo_);
                });
            } else {
                setRedirect(true);
            }
        });
    }, []);

    // Redirect when post data is not available.
    if (redirect) {
        return <Navigate to={'/404'} />
    }

    // Hide when post data errors occur or we are waiting for the server.
    if (!postData) {
        return <></>;
    }

    return (
        <PageTemplate title={postData.title} description={postData.summary} hideHeader
            accessLevel={(postData.status === 'draft' ?
                ACCESS_LEVEL.ADMIN : ACCESS_LEVEL.UNKNOWN)}>
            <div className='news-post'>
                <ParallaxElement scrollSpeed={0.5}>
                    <ImageComponent className='cover-image' source={getServerURI(postData.coverFile)} backgroundImage />
                </ParallaxElement>
                <div className='news-post-content'>
                    <h1 className='h1_title'>{postData.title}</h1>
                    <h2 className='h2_subtitle'>{postData.subtitle}</h2>
                    <div className='cover-meta'>
                        <div>
                            <CalendarIcon />{format(new Date(postData.date), TEXT_FORMATTING.POST_DISPLAY_DATE)}
                        </div>
                    </div>
                    <hr className='news-post-break' />
                    <div>
                        {postData.content && (
                            <>
                                {MarkdownParser.instance.renderMarkdown(postData.content)}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className='return-link-container'>
                <Link to={'/news'} className='return-link'>
                    <BackIcon />
                    Back to News
                </Link>
                {userInfo?.accessLevel >= ACCESS_LEVEL.ADMIN && (
                    <div>
                        <Link className='return-link' to={`/news/edit/${postData.uri}`}>
                            <EditIcon />
                            Edit Post
                        </Link>
                    </div>
                )}
            </div>
        </PageTemplate>
    );
}
