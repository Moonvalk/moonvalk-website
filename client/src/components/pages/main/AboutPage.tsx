import {ReactElement, useEffect} from 'react';
import { PageTitle } from '../../templates/PageTitle';
import { AboutIcon } from '../../icons/AboutIcon';
import { PageTemplate } from '../../templates/PageTemplate';

export function AboutPage(): ReactElement {
    return (
        <PageTemplate title='About' icon={<AboutIcon />} pageWrap='page'>
            <p className="body-text center">
                Check back in later; the gremlins only work when nobody is watching.
            </p>
        </PageTemplate>
    );
}