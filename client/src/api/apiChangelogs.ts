import { IChangelog } from "../components/pages/ChangelogPage";

const API_URL = 'http://localhost:3000';

export async function createChangelog(logData_: IChangelog): Promise<IChangelog> {
    const response = await fetch(`${API_URL}/api/changelog`, {
        method: 'POST',
        body: null,
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.json();
}
