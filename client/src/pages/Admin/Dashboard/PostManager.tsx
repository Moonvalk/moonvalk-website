import { ReactElement, useEffect, useState } from "react";
import { NewsIcon } from "../../../assets/svg/icons/Menus";
import { HelpIcon } from "../../../assets/svg/icons/Misc";
import { PageTemplate } from "../../../components/PageTemplate/PageTemplate";
import { PromptElement } from "../../../components/Prompt/PromptElement";
import { ACCESS_LEVEL } from "../../../stores/User";
import { IconTritone } from "../../../components/Icons/IconTritone";
import { getServerURI } from "../../../utils/URIHelper";
import { INewsPost, NewsPostCard } from "../../Main/News/Card/NewsPostCard";

/**
 * Generates the news post manager page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PostManager(): ReactElement {
    /**
     * Stores reference to all posts that will be displayed.
     */
    const [posts, setPosts] = useState<INewsPost[]>([]);

    /**
     * Called on initial page load to request all post data.
     */
    useEffect(() => {
        fetch(getServerURI('api/admin/posts')).then((response_) => {
            response_.json().then((posts_) => {
                setPosts(posts_);
            });
        });
    }, []);

    return (
        <PageTemplate title='Post Manager' icon={<IconTritone baseSVG={<NewsIcon />} />}
            accessLevel={ACCESS_LEVEL.ADMIN}>
            <PromptElement icon={<HelpIcon />}
                text='Manage public, private, and draft news posts here.' />
            {posts.length > 0 && posts.map((post_: INewsPost, index_: number) => {
                return (
                    <NewsPostCard key={'post_' + index_} postData={post_} imageLeft={index_ % 2 === 1} adminView={true} />
                );
            })}
        </PageTemplate>
    );
}
