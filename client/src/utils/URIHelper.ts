import { WEBSITE_TITLE } from "../main";

const API_URL = 'http://localhost';
// const API_URL = 'http://192.168.40.115';
const SERVER_PORT = 3000;

/**.l;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
 * Gets the server URI for api requests.
 * @param append - Optional string to be appended to the URI.
 * @return {string} The stable server URI. 
 */
export function getServerURI(append?: string): string {
    const uri = `${API_URL}:${SERVER_PORT}/`;
    if (append) {
        return uri.concat(append.replace(/\\/g, "/"));
    }
    return uri;
}

/**
 * Gets the full page title to be displayed with appended information.
 * @param {string} appendPageName - Optional string to be appended to the full page title.
 * @return {string} The full page title to be displayed on tab.
 */
export function getPageTitle(appendPageName?: string): string {
    if (appendPageName) {
        return WEBSITE_TITLE + ' | ' + appendPageName;
    }
    return WEBSITE_TITLE;
}