import {ReactElement, useEffect, useState} from 'react';
import './styles/NewsPage.css';
import { PageTitle } from '../../templates/PageTitle';
import { getServerURI } from '../../../utils/URIHelper';
import { INewsPost, NewsPostCard } from '../../sections/NewsPostCard';
import { NewsIcon } from '../../icons/NewsIcon';
import { PageTemplate } from '../../templates/PageTemplate';

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
        <PageTemplate title='News' icon={<NewsIcon />}>
            {posts.length > 0 && posts.map(function (post_: INewsPost, index_: number) {
                return (
                    <NewsPostCard key={index_} postData_={post_} imageLeft_={index_ % 2 === 0} />
                );
            })}
        </PageTemplate>
    );
}