import { ReactElement } from 'react';
import { GamesIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import './GamesPage.css';

export function GamesPage(): ReactElement {
    return (
        <PageTemplate title='Games' icon={<GamesIcon />} pageWrap='page'>
            <p className='body-text center'>
                Announcing new projects soon!
            </p>
        </PageTemplate>
    );
}