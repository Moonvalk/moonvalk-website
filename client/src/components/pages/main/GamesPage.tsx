import {ReactElement} from 'react';
import { GamesIcon } from '../../icons/menus/GamesIcon';
import { PageTemplate } from '../../templates/PageTemplate';
import './styles/GamesPage.css';

export function GamesPage(): ReactElement {
    return (
        <PageTemplate title='Games' icon={<GamesIcon />} pageWrap='page'>
            <p className='body-text center'>
                Announcing new projects soon!
            </p>
        </PageTemplate>
    );
}