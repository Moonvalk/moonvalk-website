import {ReactElement, useEffect, useState} from 'react';
import './styles/ChangelogPage.css';
import { ChangelogForm } from '../../tools/ChangelogForm';
import { userAuthStore } from '../../../stores/userAuth.store';
import { ChangelogIcon } from '../../icons/ChangelogIcon';
import { getServerURI } from '../../../utils/URIHelper';
import { DeleteIcon } from '../../icons/DeleteIcon';
import { PageTemplate } from '../../templates/PageTemplate';

export interface IChangelog {
    _id: string,
    version: string,
    date: string,
    summary: string,
    createdAt: number | Date,
}

export function ChangelogPage(): ReactElement {
    const [logs, setLogs] = useState<IChangelog[]>([]);
    const {userInfo} = userAuthStore();
    
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
                                        {userInfo?.administrator && (
                                            <button className='trash-button'
                                                onClick={event => handleDeleteLog(log._id)}>
                                                    <DeleteIcon />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {userInfo?.administrator && (
                <div className="page">
                    <ChangelogForm onCreateLog={getLogs} />
                </div>
            )}
        </PageTemplate>
    );
}