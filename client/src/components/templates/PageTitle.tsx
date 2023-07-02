import { ReactElement, useEffect, useLayoutEffect } from "react";
import { getPageTitle } from "../../utils/URIHelper";

export interface IPageTitle {
    title?: string,
}

export function PageTitle(props: IPageTitle): ReactElement {
    useLayoutEffect(() => {
        document.title = getPageTitle(props.title);
    }, []);

    return (
        <>
        </>
    );
}
