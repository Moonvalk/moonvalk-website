import { ReactElement } from "react";
import { getServerURI } from "../../utils/URIHelper";
import './styles/NewsPostCard.css';
import { Link } from "react-router-dom";

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

export function NewsPostCard({ postData_, imageLeft_ }: INewsPostProps): ReactElement {
    return (
        <div className={imageLeft_ ? 'blog-card' : 'blog-card alt'}>
            <div className="meta">
                <div className="photo" style={{ backgroundImage: `url(${getServerURI(postData_.coverFile)})` }}></div>
                <div className="details">
                    <div className='flex space-between'>
                        <div>
                            <li className='date month-day'>June 26</li>
                            <li className='date year'>2023</li>
                        </div>
                        {/* <li className='author'><a href="#"><AboutIcon />{`${postData_.author.username}`}</a></li> */}
                    </div>
                </div>
            </div>
            <div className="description">
                <h1>
                    <Link to={'/news/post/'.concat(postData_._id)}>{postData_.title}</Link>
                </h1>
                <h2>{postData_.subtitle}</h2>
                <p className='body-text'>{postData_.summary}</p>
                <p className="read-more">
                    <Link to={'/news/post/'.concat(postData_._id)}>{`Read More`}</Link>
                </p>
            </div>
        </div>
    );
}