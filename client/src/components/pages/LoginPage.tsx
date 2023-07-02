import { ReactElement, useRef, useState } from 'react';
import { StringHelper } from '../../utils/StringHelper';
import { CHARACTER_CODES } from '../../constants/CharacterCodes';
import { Link, Navigate } from 'react-router-dom';
import { HelpIcon } from '../icons/misc/HelpIcon';
import { IUserInfo, userAuthStore } from '../../stores/userAuth.store'
import { getServerURI } from '../../utils/URIHelper';
import { LoginIcon } from '../icons/actions/LoginIcon';
import { PageTemplate } from '../templates/PageTemplate';
import '../tools/styles/Form.css';
import { PromptElement } from '../elements/PromptElement';

export function LoginPage(): ReactElement {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo, setUserLoggedIn} = userAuthStore();
    
    async function handleLogin(event_: any): Promise<void> {
        event_.preventDefault();
        if (usernameRef.current.value === '' || passwordRef.current.value === '') {
            alert('Missing required fields.');
            return;
        }

        const response = await fetch(getServerURI('api/login'), {
            method: 'POST',
            body: JSON.stringify({
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            }),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        if (response.ok) {
            response.json().then((userInfo_: IUserInfo) => {
                setUserInfo(userInfo_);
                setUserLoggedIn(true);
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
                        ref={usernameRef}
                        autoComplete='on' />
                    <input id='password'
                        type='password'
                        placeholder={StringHelper.generateCharFill(CHARACTER_CODES.BULLET, 10)}
                        ref={passwordRef}
                        autoComplete='on' />
                </div>
                <button className='submit-button'>
                    <LoginIcon />
                    Login
                </button>
            </form>
            <PromptElement icon={<HelpIcon />} text={(
                <>Need an account? <Link to='/register'>Sign Up</Link></>)} />
        </PageTemplate>
    );
}