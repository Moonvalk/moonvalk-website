import { ReactElement, useEffect, useLayoutEffect, useState } from "react";
import { getCurrentFormattedDate } from "../../utils/time";
import { IChangelog } from "../pages/ChangelogPage";

const API_URL = 'http://localhost:3000';

export async function createChangelog(version_: string, summary_: string, date_: string = ''): Promise<IChangelog> {
    let logDate = (date_ !== '') ? date_ : getCurrentFormattedDate();
    const response = await fetch(`${API_URL}/api/changelog`, {
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

export function ChangelogForm(): ReactElement {
    const [version, setVersion] = useState('');
    const [date, setDate] = useState('');
    const [summary, setSummary] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useLayoutEffect(() => {
        getCurrentDate();
    }, []);

    async function handleCreateLog(event: React.FormEvent): Promise<void> {
        event.preventDefault();
        const log = await createChangelog(version, summary, date);
    }

    function getCurrentDate(): void {
        setCurrentDate(getCurrentFormattedDate());
    }
    
    return (
        <form className='add-changelog'
            onSubmit={handleCreateLog}>
            <div className='flex'>
                <label htmlFor='log-version'>Version*</label>
                <label htmlFor='log-date'>Date</label>
            </div>
            <div className='flex'>
                <input type='text'
                    id='log-version'
                    value={version}
                    placeholder="#.#.#"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                        setVersion(event.target.value);
                    }} />
                
                <input type='text'
                    id='log-date'
                    value={date}
                    placeholder={currentDate}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                        setDate(event.target.value);
                    }} />
            </div>
            <label htmlFor='log-summary'>Summary*</label>
            <textarea id='log-summary'
                value={summary}
                placeholder="Added all of the things."
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                    setSummary(event.target.value);
                }} />
            <button>Add Changelog</button>
        </form>
    );
}
