import {ReactElement, useState} from 'react';
import '../Layout.css';

export function LoginPage(): ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='page'>
            <h2>Log in</h2>
            <hr />
            <form className='user-form'>
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input id='username'
                        type='username'
                        placeholder='Username'
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        autoComplete='on' />
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
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
    );
}