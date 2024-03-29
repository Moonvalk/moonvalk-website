import { ReactElement, useLayoutEffect, useState } from "react";
import { getCurrentFormattedDate } from "../../../utils/TimeUtils";
import { createChangelog } from "./ChangelogAPI";
import { ButtonElement } from "../../../components/Button/ButtonElement";
import { EditIcon } from "../../../assets/svg/icons/Actions";

interface IChangelogFormProps {
    onCreateLog: () => void,
}

export function ChangelogForm({onCreateLog}: IChangelogFormProps): ReactElement {
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
        setVersion('');
        setDate('');
        setSummary('');
        onCreateLog();
    }

    function getCurrentDate(): void {
        setCurrentDate(getCurrentFormattedDate());
    }
    
    return (
        <form className='form_basic'
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
            <ButtonElement icon={<EditIcon />} text='Add Changelog' />
        </form>
    );
}
