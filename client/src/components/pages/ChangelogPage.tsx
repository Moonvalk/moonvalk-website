import {ReactElement} from 'react';
import './ChangelogPage.css';
import '../Layout.css';

export function ChangelogPage(): ReactElement {
    return (
        <div className="content">
            <div className="header-margin"></div>
            <div className="page">
                <h1>Changelog</h1>
                <hr />
                <p className="center">
                    Below are the records for this website's update history:
                </p>
                <div className="changelog">
                    <table>
                        <colgroup>
                            <col span={1} style={{width: '25%'}} />
                            <col span={1} style={{width: '25%'}} />
                            <col span={1} style={{width: '50%'}} />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>Version</th>
                                <th>Date</th>
                                <th>Changes</th>
                            </tr>
                            <tr>
                                <td>0.0.3</td>
                                <td>6/9/2023</td>
                                <td>Added homepage carousel.</td>
                            </tr>
                            <tr>
                                <td>0.0.2</td>
                                <td>6/9/2023</td>
                                <td>Added social links, built out remaining pages.</td>
                            </tr>
                            <tr>
                                <td>0.0.1</td>
                                <td>6/9/2023</td>
                                <td>Initial build.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}