import { WEBSITE_TITLE } from "../main";

// const LOCAL_IP = 'http://localhost';
/**
 * The local IP address used for testing.
 */
const LOCAL_IP = 'http://192.168.40.115';

/**
 * The server port used for communications.
 */
const SERVER_PORT = 3000;

/**
 * Returns the full URL used for API calls based on current configuration.
 */
// const API_URL = (process.env.NODE_ENV === 'development' ? 
//     `${LOCAL_IP}:${SERVER_PORT}` : 'https://moonvalk.com');
const API_URL = `${LOCAL_IP}:${SERVER_PORT}`;

/**
 * Gets the server URI for api requests.
 * @param append - Optional string to be appended to the URI.
 * @return {string} The stable server URI. 
 */
export function getServerURI(append?: string): string {
    const uri = `${API_URL}/`;
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