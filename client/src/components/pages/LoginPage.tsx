import {ReactElement, useEffect, useState} from 'react';
import '../Layout.css';
import './LoginPage.css';

export function LoginPage(): ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.title = 'Moonvalk Studios | Login';
    }, []);

    return (
        <div className="content">
            <div className="header-margin"></div>
            <div className="page">
                <form className='login'>
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
                            placeholder='Password'
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            autoComplete='on' />
                    </div>
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}