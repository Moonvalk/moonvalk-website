import { ReactElement } from 'react';
import { AboutIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';

export function AboutPage(): ReactElement {
    return (
        <PageTemplate title='About' icon={<AboutIcon />} pageWrap='page'>
            <p className="body-text center">
                Check back in later; the gremlins only work when nobody is watching.
            </p>
        </PageTemplate>
    );
}