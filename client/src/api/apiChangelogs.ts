import { IChangelog } from "../components/pages/footer/ChangelogPage";
import { getServerURI } from "../utils/URIHelper";
import { getCurrentFormattedDate } from "../utils/time";

export async function createChangelog(version_: string, summary_: string, date_: string = ''): Promise<IChangelog> {
    let logDate = (date_ !== '') ? date_ : getCurrentFormattedDate();
    const uri = getServerURI('api/changelog');
    const response = await fetch(uri, {
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