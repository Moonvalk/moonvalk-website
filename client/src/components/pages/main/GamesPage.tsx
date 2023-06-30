import {ReactElement} from 'react';
import './styles/GamesPage.css';
import { GamesIcon } from '../../icons/GamesIcon';
import { PageTemplate } from '../../templates/PageTemplate';

export function GamesPage(): ReactElement {
    return (
        <PageTemplate title='Games' icon={<GamesIcon />} pageWrap='page'>
            <p className='body-text center'>
                Announcing new projects soon!
            </p>
        </PageTemplate>
    );
}