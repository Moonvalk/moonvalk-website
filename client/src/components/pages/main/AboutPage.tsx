import {ReactElement, useEffect} from 'react';
import { PageTitle } from '../../layout/PageTitle';
import { AboutIcon } from '../../icons/AboutIcon';

export function AboutPage(): ReactElement {
    return (
        <div className="content">
            <PageTitle title="About" />
            <div className='header-margin' />
            <h1><AboutIcon />About</h1>
            <hr />
            <div className="page">
                <p className="center">
                    Check back in later; the gremlins only work when nobody is watching.
                </p>
            </div>
        </div>
    );
}