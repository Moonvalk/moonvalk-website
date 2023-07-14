import { ReactElement } from "react";
import { ImportantIcon } from "../../assets/svg/icons/Misc/ImportantIcon";
import { PageTemplate } from "../../components/PageTemplate/PageTemplate";
import { PromptElement } from "../../components/Prompt/PromptElement";

/**
 * Called to generate the 404 / Item not found page.
 * @return {ReactElement} A new JSX element for rendering.
 */
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
