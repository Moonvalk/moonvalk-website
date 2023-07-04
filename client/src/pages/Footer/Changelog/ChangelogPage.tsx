import {ReactElement, useEffect, useState} from 'react';
import { ACCESS_LEVEL } from '../../../stores/User';
import { getServerURI } from '../../../utils/URIHelper';
import { DeleteIcon } from '../../../assets/svg/icons/Actions';
import { ChangelogIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { RestrictedContent } from '../../../components/RestrictedContent/RestrictedContent';
import { ChangelogForm } from './ChangelogForm';
import './ChangelogPage.css';

export interface IChangelog {
    _id: string,
    version: string,
    date: string,
    summary: string,
    createdAt: number | Date,
}

export function ChangelogPage(): ReactElement {
    const [logs, setLogs] = useState<IChangelog[]>([]);
    
    useEffect(() => {
        getLogs().catch((error_) => console.log(error_));
    }, []);

    async function getLogs(): Promise<void> {
        const response = await fetch(getServerURI('api/changelogs'));
        if (response) {
            const data = await response.json();
            if (data) {
                setLogs(data);
            }
        }
    }

    async function handleDeleteLog(logId_: string): Promise<void> {
        const response = await fetch(getServerURI(`api/changelog/delete/${logId_}`), {
            method: 'DELETE',
        });
        if (response.ok) {
            setLogs(logs.filter((log_: IChangelog) => log_._id !== logId_));
        } else {
            alert('An error occurred.');
        }
    }

    return (
        <PageTemplate title='Changelog' icon={<ChangelogIcon />}>
            <div className="page">
                <p className="body-text center">
                    Below are the records for this website's update history:
                </p>
                <div className="changelog">
                    <table>
                        <colgroup>
                            <col span={1} style={{width: '20%'}} />
                            <col span={1} style={{width: '30%'}} />
                            <col span={1} style={{width: '50%'}} />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>Version</th>
                                <th>Date</th>
                                <th>Changes</th>
                            </tr>
                            {logs.length > 0 && logs.map((log: IChangelog) => {
                                return (
                                <tr key={log._id}>
                                    <td>{log.version}</td>
                                    <td>{log.date}</td>
                                    <td>
                                        {log.summary}
                                        <RestrictedContent accessLevel={ACCESS_LEVEL.ADMIN}>
                                            <button className='trash-button'
                                                onClick={event => handleDeleteLog(log._id)}>
                                                    <DeleteIcon />
                                            </button>
                                        </RestrictedContent>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <RestrictedContent accessLevel={ACCESS_LEVEL.ADMIN}>
                <div className='page'>
                    <ChangelogForm onCreateLog={getLogs} />
                </div>
            </RestrictedContent>
        </PageTemplate>
    );
}