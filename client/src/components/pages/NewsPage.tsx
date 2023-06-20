import {ReactElement, useEffect} from 'react';
import './NewsPage.css';
import { PageTitle } from '../context/PageTitle';

export default function NewsPage(): ReactElement {
    return (
        <div className="content">
            <PageTitle title="News" />
            <div className="page">
                <h1>News</h1>
                <hr />
                <p className="center">
                    Check back in later; the gremlins only work when nobody is watching.
                </p>
            </div>
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