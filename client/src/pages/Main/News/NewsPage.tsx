import { ReactElement, useEffect, useState } from 'react';
import { NewsIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { getServerURI } from '../../../utils/URIHelper';
import { INewsPost, NewsPostCard } from './Card/NewsPostCard';
import { IconTritone } from '../../../components/Icons/IconTritone';
import './NewsPage.css';

/**
 * Called to generate the news page which contains relevant recent posts as cards.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function NewsPage(): ReactElement {
    /**
     * Stores reference to all posts that will be displayed.
     */
    const [posts, setPosts] = useState<INewsPost[]>([]);

    /**
     * Called on initial page load to request all post data.
     */
    useEffect(() => {
        fetch(getServerURI('api/posts')).then((response_) => {
            response_.json().then((posts_) => {
                setPosts(posts_);
            });
        });
    }, []);

    return (
        <PageTemplate title='News' icon={<IconTritone baseSVG={<NewsIcon />} />}
            description='Learn about latest company announcements, devlogs, and other news here!'>
            {posts.length > 0 && posts.map((post_: INewsPost, index_: number) => {
                return (
                    <NewsPostCard key={'post_' + index_} postData={post_} imageLeft={index_ % 2 === 1} />
                );
            })}
        </PageTemplate>
    );
}
