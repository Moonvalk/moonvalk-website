import {ReactElement, useEffect, useState} from 'react';
import '../tools/Form.css';
import { PageTitle } from '../layout/PageTitle';
import { StringHelper } from '../../utils/StringHelper';
import { CHARACTER_CODES } from '../../constants/CharacterCodes';
import { Link } from 'react-router-dom';

export function LoginPage(): ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='content'>
            <PageTitle title="Login" />
            <div className="page-small">
                <h1>Sign In</h1>
                <hr />
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
                            placeholder={StringHelper.generateCharFill(CHARACTER_CODES.BULLET, 10)}
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            autoComplete='on' />
                    </div>
                    <button>Login</button>
                </form>
                <div className='prompt'>
                    <p>Need an account? <Link to='/register'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}