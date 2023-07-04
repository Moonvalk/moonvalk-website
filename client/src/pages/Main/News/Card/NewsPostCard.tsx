import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { TEXT_FORMATTING } from "../../../../constants/TextFormatting";
import { getServerURI } from "../../../../utils/URIHelper";
import './NewsPostCard.css';

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
    const [dayMonth, setDayMonth] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
        const formattedDate = format(new Date(postData_.date), TEXT_FORMATTING.POST_DISPLAY_DATE);
        const splitDate = formattedDate.split(',');
        setDayMonth(splitDate[0]);
        setYear(splitDate[1].replace(' ', ''));
    }, [])

    return (
        <div className={imageLeft_ ? 'blog-card' : 'blog-card alt'}>
            <div className="meta">
                <div className="photo" style={{ backgroundImage: `url(${getServerURI(postData_.coverFile)})` }}></div>
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