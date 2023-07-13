import { ReactElement, useEffect, useState } from 'react';
import { NewsIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { getServerURI } from '../../../utils/URIHelper';
import { INewsPost, NewsPostCard } from './Card/NewsPostCard';
import './NewsPage.css';

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
        <PageTemplate title='News' icon={<NewsIcon />} description='Learn about latest company announcements, devlogs, and other news here!'>
            {posts.length > 0 && posts.map(function (post_: INewsPost, index_: number) {
                return (
                    <NewsPostCard key={'post_' + index_} postData_={post_} imageLeft_={index_ % 2 === 1} />
                );
            })}
        </PageTemplate>
    );
}
