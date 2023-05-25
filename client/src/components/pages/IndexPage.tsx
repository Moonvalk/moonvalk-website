import {ReactElement} from 'react';
import '../Layout.css';
import './IndexPage.css';

export function IndexPage(): ReactElement {
    return (
        <div className='page'>
            <h2>Home</h2>
            <hr />
            <p className='main-text'>
                Welcome to Moonvalk Studios.
            </p>
        </div>
    );
}