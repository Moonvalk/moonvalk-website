
import { getServerURI } from "../../../utils/URIHelper";
import { getCurrentFormattedDate } from "../../../utils/TimeUtils";
import { IChangelog } from "./ChangelogPage";

/**
 * Called to create a new Changelog.
 * @param {string} version_ - The version to be displayed with this log.
 * @param {string} summary_ - The summary of what changes were made in this log.
 * @param {string} date_ - The date that this log was made.
 * @return {Promise<Changelog>} Returns the new Changelog data after successful creation.
 */
export async function createChangelog(
    version_: string,
    summary_: string,
    date_: string = '',
): Promise<IChangelog> {
    let logDate = (date_ !== '') ? date_ : getCurrentFormattedDate();
    const response = await fetch(getServerURI('api/changelog'), {
        method: 'POST',
        body: JSON.stringify({
            version: version_,
            summary: summary_,
            date: logDate,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.json();
}