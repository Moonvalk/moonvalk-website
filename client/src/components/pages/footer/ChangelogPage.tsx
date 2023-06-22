import {ReactElement, useEffect, useState} from 'react';
import './styles/ChangelogPage.css';
import { PageTitle } from '../../layout/PageTitle';
import { ChangelogForm } from '../../tools/ChangelogForm';

export interface IChangelog {
    _id: string,
    version: string,
    date: string,
    summary: string,
    createdAt: number | Date,
}

export function ChangelogPage(): ReactElement {
    const [logs, setLogs] = useState<IChangelog[]>([]);
    const [admin, setAdmin] = useState(true);
    
    useEffect(() => {
        getLogs().catch((error_) => console.log(error_));
    }, []);

    async function getLogs(): Promise<void> {
        const uri = 'http://localhost:3000/api/changelogs';
        const response = await fetch(uri);
        if (response) {
            const data = await response.json();
            if (data) {
                setLogs(data);
            }
        }
    }

    return (
        <div className="content">
            <PageTitle title="Changelog" />
            <div className="page">
                <h1>Changelog</h1>
                <hr />
                <p className="center">
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
                                    <td>{log.summary}</td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {admin && (
                <div className="page">
                    <ChangelogForm />
                </div>
            )}
        </div>
    );
}