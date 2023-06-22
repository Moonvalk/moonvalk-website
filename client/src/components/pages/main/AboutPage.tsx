import {ReactElement, useEffect} from 'react';
import { PageTitle } from '../../layout/PageTitle';

export function AboutPage(): ReactElement {
    return (
        <div className="content">
            <PageTitle title="About" />
            <div className="page">
                <h1>About</h1>
                <hr />
                <p className="center">
                    Check back in later; the gremlins only work when nobody is watching.
                </p>
            </div>
        </div>
    );
}