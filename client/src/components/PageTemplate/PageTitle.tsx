import { ReactElement, useLayoutEffect } from "react";
import { getPageTitle } from "../../utils/URIHelper";

interface IPageTitleProps {
    title?: string,
}

export function PageTitle(props: IPageTitleProps): ReactElement {
    useLayoutEffect(() => {
        document.title = getPageTitle(props.title);
    }, []);

    return (
        <>
        </>
    );
}
