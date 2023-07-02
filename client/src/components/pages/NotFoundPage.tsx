import { ReactElement } from "react";
import { ImportantIcon } from "../icons/misc/ImportantIcon";
import { PageTemplate } from "../templates/PageTemplate";
import './styles/NotFoundPage.css';
import { PromptElement } from "../elements/PromptElement";

export function NotFoundPage(): ReactElement {
    return (
        <PageTemplate title='404 Not Found' hideHeader>
            <div className='page-small'>
                <h1 className='monolithic'>404</h1>
                <h1 className='page-title'>Page Not Found</h1>
                <hr className='hr-fade' />
                <PromptElement icon={<ImportantIcon />}
                    text={`We're sorry, we couldn't find the page you requested.`} />
            </div>
        </PageTemplate>
    );
}
