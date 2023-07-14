import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { TEXT_FORMATTING } from "../../../../constants/TextFormatting";
import { getServerURI } from "../../../../utils/URIHelper";
import './NewsPostCard.css';

/**
 * Contract used for loading / handling news post data.
 */
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

/**
 * Properties available to a NewsPostCard element.
 */
interface INewsPostProps {
    /**
     * Stores reference to all news post data pulled from the server.
     */
    postData: INewsPost,

    /**
     * Flag that determines if the image will be displayed on the left
     * or right of the current displayed card.
     */
    imageLeft?: boolean,
}

/**
 * Called to generate a news post card that will display summary data for a news post.
 * @param {INewsPostProps} props_ - All properties associated with this news card.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function NewsPostCard(props_: INewsPostProps): ReactElement {
    /**
     * Stores reference to the day and month string displayed on this post.
     */
    const [dayMonth, setDayMonth] = useState('');

    /**
     * Stores reference to the year string displayed on this post.
     */
    const [year, setYear] = useState('');

    /**
     * Called on initial page load to assign correct day, month, and year values.
     */
    useEffect(() => {
        const formattedDate = format(new Date(props_.postData.date), TEXT_FORMATTING.POST_DISPLAY_DATE);
        const splitDate = formattedDate.split(',');
        setDayMonth(splitDate[0]);
        setYear(splitDate[1].replace(' ', ''));
    }, [])

    return (
        <div className={props_.imageLeft ? 'blog-card' : 'blog-card alt'}>
            <div className="meta">
                <div className="photo" style={{ backgroundImage: `url(${getServerURI(props_.postData.coverFile)})` }}></div>
                <div className="details">
                    <div className='flex space-between'>
                        <div>
                            <li className='date month-day'>{dayMonth}</li>
                            <li className='date year'>{year}</li>
                        </div>
                        {/* <li className='author'><a href="#"><AboutIcon />{`${postData_.author.username}`}</a></li> */}
                    </div>
                </div>
            </div>
            <div className="description">
                <h1>
                    <Link to={'/news/post/'.concat(props_.postData._id)}>{props_.postData.title}</Link>
                </h1>
                <h2>{props_.postData.subtitle}</h2>
                <p className='body-text'>{props_.postData.summary}</p>
                <p className="read-more">
                    <Link to={'/news/post/'.concat(props_.postData._id)}>{`Read More`}</Link>
                </p>
            </div>
        </div>
    );
}