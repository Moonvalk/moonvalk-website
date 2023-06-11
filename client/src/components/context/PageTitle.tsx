import { ReactElement, useEffect } from "react";
import { getPageTitle } from "../../utils/URIHelper";

export interface IPageTitle {
    title?: string,
}

export function PageTitle(props: IPageTitle): ReactElement {
    useEffect(() => {
        document.title = getPageTitle(props.title);
    }, []);
    return (
        <>
        </>
    );
}
