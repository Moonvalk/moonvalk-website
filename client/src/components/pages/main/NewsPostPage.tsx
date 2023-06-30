import { ReactElement, useEffect, useState } from "react";
import { PageTitle } from "../../templates/PageTitle";
import { INewsPost } from "../../sections/NewsPostCard";
import { userAuthStore } from "../../../stores/userAuth.store";
import { Link, Navigate, useParams } from "react-router-dom";
import { getServerURI } from "../../../utils/URIHelper";
import { format } from "date-fns";
import { EditIcon } from "../../icons/EditIcon";
import './styles/NewsPostPage.css';
import { BackIcon } from "../../icons/BackIcon";
import { ImageComponent } from "../../sections/ImageComponent";
import './styles/NewsPostPage.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import { CalendarIcon } from "../../icons/CalendarIcon";
import { AboutIcon } from "../../icons/AboutIcon";
import { PageTemplate } from "../../templates/PageTemplate";

const enum TEXT_FORMATTING {
    POST_DATE = 'MMM d, yyyy HH:mm',
}

export function NewsPostPage(): ReactElement {
    const [postData, setPostData] = useState<INewsPost | null>(null);
    const {userInfo} = userAuthStore();
    const {id} = useParams();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(getServerURI('api/post/'.concat(id))).then((response_) => {
            response_.json().then((postInfo_: INewsPost) => {
                if (!postInfo_) {
                    setRedirect(true);
                }
                setPostData(postInfo_);
            });
        });
        handleParallax();
    }, []);

    function handleParallax(): void {
        const speed = 0.1;
        const setParallaxTranslation = () => {
            const parallaxElement = document.getElementById('parallax');
            // const offsetY = window.scrollY;
            const offsetY = window.scrollY;
            if (parallaxElement) {
                // parallaxElement.style.transform = "translateY(" + (offsetY * speed) + "px)";
                parallaxElement.style.backgroundPosition = `50% ${50 - (offsetY * speed)}%`;
            }
        };
        setParallaxTranslation();
        window.onscroll = () => {
            setParallaxTranslation();
        }
    }

    if (!postData) {
        return <></>;
    }

    if (redirect) {
        return <Navigate to={'/404'} />
    }

    return (
        <PageTemplate title={postData.title} hideHeader>
            <div className='news-post'>
                <div className='cover-image' id='parallax'
                    style={{backgroundImage: `url(${getServerURI(postData.coverFile)})`}} />
                {/* <img className='cover-image' src={getServerURI(postData.coverFile)} alt={postData.coverFile} /> */}
                <div className='news-post-content'>
                    <h1>{postData.title}</h1>
                    <h2>{postData.subtitle}</h2>
                    <div className='cover-meta'>
                    {/* <div>
                        <AboutIcon />Article by @moonvalk
                    </div> */}
                    <div>
                        <CalendarIcon />June 26, 2023
                    </div>
                </div>
                    <hr className='news-post-break' />
                    {/* <p>{`@${postData.author.username}`}</p>
                    <p>{postData.date}</p> */}
                    
                    <div dangerouslySetInnerHTML={{__html: postData.content}} />
                    <div className='news-image'>
                        <ImageComponent source_='..\uploads\9569ac08b3452b9d7369af5572cc5373.png'
                            alt_='' />
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
                {userInfo?.administrator && (
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
