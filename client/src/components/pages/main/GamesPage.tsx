import {ReactElement, useEffect} from 'react';
import './styles/GamesPage.css';
import { PageTitle } from '../../layout/PageTitle';

export function GamesPage(): ReactElement {
    return (
        <div className="content">
            <PageTitle title="Games" />
            <div className="page">
                <h1>Games</h1>
                <hr />
                <p className="center">
                    Check back in later; the gremlins only work when nobody is watching.
                </p>
                {/* <div className='game-image'></div> */}
            </div>
        </div>
    );
}