import {ReactElement, useEffect} from 'react';
import './styles/GamesPage.css';
import { PageTitle } from '../../layout/PageTitle';
import { GamesIcon } from '../../icons/GamesIcon';

export function GamesPage(): ReactElement {
    return (
        <div className="content">
            <PageTitle title="Games" />
            <div className='header-margin' />
            <h1><GamesIcon />Games</h1>
            <hr />
            <div className="page">
                
                <p className="center">
                    Check back in later; the gremlins only work when nobody is watching.
                </p>
                {/* <div className='game-image'></div> */}
            </div>
        </div>
    );
}