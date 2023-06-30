import {ReactElement, useEffect, useState} from 'react';
import '../tools/styles/Form.css';
import { PageTitle } from '../templates/PageTitle';
import { StringHelper } from '../../utils/StringHelper';
import { CHARACTER_CODES } from '../../constants/CharacterCodes';
import { Link, Navigate } from 'react-router-dom';
import { HelpIcon } from '../icons/HelpIcon';
import { IUserInfo, userAuthStore } from '../../stores/userAuth.store'
import { getServerURI } from '../../utils/URIHelper';
import { LoginIcon } from '../icons/LoginIcon';
import { PageTemplate } from '../templates/PageTemplate';

export function LoginPage(): ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = userAuthStore();
    // const setUserInfo = userAuthStore((state) => state.setUserInfo);
    
    async function handleLogin(event_: any): Promise<void> {
        event_.preventDefault();
        if (username === '' || password === '') {
            alert('Missing required fields.');
            return;
        }

        const response = await fetch(getServerURI('api/login'), {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        if (response.ok) {
            response.json().then((userInfo_: IUserInfo) => {
                setUserInfo(userInfo_);
                setRedirect(true);
            });
        } else {
            alert('A user with those credentials was not found.');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <PageTemplate title='Sign In' icon={<LoginIcon />} pageWrap='page-small'>
            <form className='login' onSubmit={handleLogin}>
                <div className='flex'>
                    <label htmlFor='username'>Username: </label>
                    <label htmlFor='password'>Password: </label>
                </div>
                <div className='flex'>
                    <input id='username'
                        type='username'
                        placeholder='Username'
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        autoComplete='on' />
                    <input id='password'
                        type='password'
                        placeholder={StringHelper.generateCharFill(CHARACTER_CODES.BULLET, 10)}
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        autoComplete='on' />
                </div>
                <button className='submit-button'>
                    <LoginIcon />
                    Login
                </button>
            </form>
            <div className='prompt'>
                <HelpIcon />
                <p className='body-text'>Need an account? <Link to='/register'>Sign Up</Link></p>
            </div>
        </PageTemplate>
    );
}