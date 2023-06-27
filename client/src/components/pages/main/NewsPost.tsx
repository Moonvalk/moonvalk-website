import { ReactElement } from "react";
import { getServerURI } from "../../../utils/URIHelper";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export const enum TEXT_FORMATTING {
    POST_DATE = 'MMM d, yyyy HH:mm',
}

export interface INewsPost {
    _id: string,
    title: string,
    subtitle: string,
    date: string,
    status: string,
    category: string,
    summary: string,
    content: string,
    coverFile: string,
    createdAt: number | Date,
    author: any,
}

type INewsPostProps = {
    postData_: INewsPost,
    imageLeft_?: boolean,
}

export function NewsPost({postData_, imageLeft_}: INewsPostProps): ReactElement {
    return (
        <div className="post">
            {imageLeft_ && (
                <div className="post-cover">
                    <Link to={`/posts/${postData_._id}`}>
                        <img alt={postData_.coverFile} src={getServerURI(postData_.coverFile)} />
                    </Link>
                </div>
            )}
            <div className="texts">
                <Link to={`/posts/${postData_._id}`}>
                    <h2>{postData_.title}</h2>
                </Link>
                <p className="info">
                    <span className="author">@{postData_.author.username}</span>
                    <time>{format(new Date(postData_.createdAt), TEXT_FORMATTING.POST_DATE)}</time>
                </p>
                <p className="summary">{postData_.summary}</p>
            </div>
            {!imageLeft_ && (
                <div className="post-cover">
                    <Link to={`/posts/${postData_._id}`}>
                        <img alt={postData_.coverFile} src={getServerURI(postData_.coverFile)} />
                    </Link>
                </div>
            )}
        </div>
    );
}