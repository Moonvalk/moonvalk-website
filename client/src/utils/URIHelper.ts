import { WEBSITE_TITLE } from "../main";

const serverPort = 3000;

export function getServerURI(append?: string): string {
    const uri = 'http://localhost:' + serverPort + '/';
    if (append) {
        return uri + append;
    }
    return uri;
}

export function getPageTitle(appendPageName?: string): string {
    if (appendPageName) {
        return WEBSITE_TITLE + ' | ' + appendPageName;
    }
    return WEBSITE_TITLE;
}