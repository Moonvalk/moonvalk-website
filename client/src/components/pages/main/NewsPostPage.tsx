import { ReactElement, useEffect, useState } from "react";
import { INewsPost } from "../../sections/NewsPostCard";
import { ACCESS_LEVEL, userAuthStore } from "../../../stores/userAuth.store";
import { Link, Navigate, useParams } from "react-router-dom";
import { getServerURI } from "../../../utils/URIHelper";
import { EditIcon } from "../../icons/actions/EditIcon";
import { BackIcon } from "../../icons/actions/BackIcon";
import { ImageComponent } from "../../sections/ImageComponent";
import { CalendarIcon } from "../../icons/misc/CalendarIcon";
import { PageTemplate } from "../../templates/PageTemplate";
import { ParallaxElement } from "../../elements/ParallaxElement";
import { format } from 'date-fns';
import { TEXT_FORMATTING } from "../../../constants/TextFormatting";
import './styles/NewsPostPage.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';

export function NewsPostPage(): ReactElement {
    const [postData, setPostData] = useState<INewsPost | null>(null);
    const {userInfo} = userAuthStore();
    const {id} = useParams();
    const [redirect, setRedirect] = useState(false);

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

    if (redirect) {
        return <Navigate to={'/404'} />
    }
    if (!postData) {
        return <></>;
    }

    return (
        <PageTemplate title={postData.title} hideHeader
            accessLevel={(postData.status === 'draft' ?
                ACCESS_LEVEL.ADMIN : ACCESS_LEVEL.UNKNOWN)}>
            <div className='news-post'>
                <ParallaxElement scrollSpeed={0.5}
                    className='cover-image'
                    style={{backgroundImage: `url(${getServerURI(postData.coverFile)})`}} />
                {/* <img className='cover-image' src={getServerURI(postData.coverFile)} alt={postData.coverFile} /> */}
                <div className='news-post-content'>
                    <h1>{postData.title}</h1>
                    <h2>{postData.subtitle}</h2>
                    <div className='cover-meta'>
                        <div>
                            <CalendarIcon />{format(new Date(postData.date), TEXT_FORMATTING.POST_DISPLAY_DATE)}
                        </div>
                    </div>
                    <hr className='news-post-break' />
                    <div dangerouslySetInnerHTML={{__html: postData.content}} />
                    <div className='news-image'>
                        <ImageComponent source='..\uploads\9569ac08b3452b9d7369af5572cc5373.png' />
                        <div className='news-image-caption'>
                            This is a caption; if only you knew how to read.
                        </div>
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
                        <Link className='return-link' to={`/news/edit/${postData._id}`}>
                            <EditIcon />
                            Edit Post
                        </Link>
                    </div>
                )}
            </div>
        </PageTemplate>
    );
}
