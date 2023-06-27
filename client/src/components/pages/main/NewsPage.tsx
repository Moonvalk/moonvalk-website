import {ReactElement, useEffect, useState} from 'react';
import './styles/NewsPage.css';
import { PageTitle } from '../../layout/PageTitle';
import { getServerURI } from '../../../utils/URIHelper';
import { INewsPost, NewsPost } from './NewsPostB';
import { NewsIcon } from '../../icons/NewsIcon';

export function NewsPage(): ReactElement {
    const [posts, setPosts] = useState<INewsPost[]>([]);

    useEffect(() => {
        fetch(getServerURI('api/posts')).then((response_) => {
            response_.json().then((posts_) => {
                setPosts(posts_);
            });
        });
    }, []);

    return (
        <div className="content">
            <div className='header-margin' />
            <PageTitle title="News" />
            <h1><NewsIcon />Latest News</h1>
            <hr />
            {posts.length > 0 && posts.map(function (post_: INewsPost, index_: number) {
                    return <NewsPost key={index_} postData_={post_} imageLeft_={index_ % 2 === 0} />
                    {/* <NewsPost key={post_.title} postData_={post_} imageLeft_={true} />
                    <NewsPost key={post_.title.concat('1')} postData_={post_} imageLeft_={false} />
                    <NewsPost key={post_.title.concat('2')} postData_={post_} imageLeft_={true} /> */}
            })}

            {/* <div className='posts'>
                <div className='post'>
                    <h3>Post Title</h3>
                    <div className='image'></div>
                    <p>This is a post description...</p>
                </div>
                <div className='post'>
                    <h3>Post Title</h3>
                    <p>This is a post description...</p>
                </div>
                <div className='post'>
                    <h3>Post Title</h3>
                    <p>This is a post description...</p>
                </div>
            </div> */}
        </div>
    );
}