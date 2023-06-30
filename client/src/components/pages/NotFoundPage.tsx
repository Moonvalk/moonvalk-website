import { ReactElement } from "react";
import { PageTitle } from "../templates/PageTitle";
import './styles/NotFoundPage.css';
import { ImportantIcon } from "../icons/ImportantIcon";

export function NotFoundPage(): ReactElement {
    return (
        <div className='content'>
            <PageTitle title='404 Not Found' />
            <div className='page-small'>
                <h1 className='monolithic'>404</h1>
                <h1 className='page-title'>Page Not Found</h1>
                <hr className='hr-fade' />
                <div className='prompt'>
                    <ImportantIcon />
                    <p className='body-text'>We're sorry, we couldn't find the page you requested.</p>
                </div>
            </div>
        </div>
    );
}
