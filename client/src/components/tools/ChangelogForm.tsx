import { ReactElement, useLayoutEffect, useState } from "react";
import { getCurrentFormattedDate } from "../../utils/time";
import { createChangelog } from "../../api/apiChangelogs";
import '../tools/styles/Form.css';

export function ChangelogForm(): ReactElement {
    const [version, setVersion] = useState('');
    const [date, setDate] = useState('');
    const [summary, setSummary] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useLayoutEffect(() => {
        getCurrentDate();
    }, []);

    async function handleCreateNewLog(event: React.FormEvent): Promise<void> {
        event.preventDefault();
        if (version === '' || summary === '') {
            alert('Missing required fields.');
            return;
        }
        const log = await createChangelog(version, summary, date);
    }

    function getCurrentDate(): void {
        setCurrentDate(getCurrentFormattedDate());
    }
    
    return (
        <form className='add-changelog'
            onSubmit={handleCreateNewLog}>
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
            <button className='submit-button'>Add Changelog</button>
        </form>
    );
}
