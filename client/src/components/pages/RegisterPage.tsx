import {ReactElement, useEffect, useState} from 'react';
import '../tools/styles/Form.css';
import { PageTitle } from '../templates/PageTitle';
import { getServerURI } from '../../utils/URIHelper';
import { IUser } from '../../types/IUser';
import { StringHelper } from '../../utils/StringHelper';
import { CHARACTER_CODES } from '../../constants/CharacterCodes';
import { Link, Navigate } from 'react-router-dom';
import { HelpIcon } from '../icons/HelpIcon';
import { EditIcon } from '../icons/EditIcon';
import { PageTemplate } from '../templates/PageTemplate';

export function RegisterPage(): ReactElement {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function handleRegistration(event_: any): Promise<void> {
        event_.preventDefault();
        if (username === '' || firstName === '' || lastName === '' ||
            email === '' || password === '' || password !== confirmPassword) {
            alert('Missing required fields.');
            return;
        }
        const userData: IUser = {
            username: username,
            email: email,
            password: password,
            firstName: firstName,
            lastName: (lastName !== '') ? lastName : null,
        };
        const response = await fetch(getServerURI('api/register'), {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
            setRedirect(true);
        } else {
            alert('Registration failure.');
        }
    }

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return (
        <PageTemplate title='Register' icon={<EditIcon />} pageWrap='page-small'>
            <div className='prompt'>
                <HelpIcon />
                <p className='body-text'>Already have an account? <Link to='/login'>Sign In</Link></p>
            </div>
            <form className='login' onSubmit={handleRegistration}>
                <label htmlFor='username'>Username*</label>
                <input id='username'
                        type='username'
                        placeholder='Username'
                        value={username}
                        onChange={event => setUsername(event.target.value.toLowerCase())}
                        autoComplete='on' />
                <label htmlFor='firstName'>Name*</label>
                <div className='flex'>
                    <input id='firstName'
                        type='text'
                        placeholder='First'
                        value={firstName}
                        onChange={event => setFirstName(event.target.value)}
                        autoComplete='on' />
                    <input id='lastName'
                        type='text'
                        placeholder='Last'
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                        autoComplete='on' />
                </div>
                <label htmlFor='email'>Email*</label>
                <input id='email'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        autoComplete='on' />
                <div className='flex'>
                    <label htmlFor='password'>Password*</label>
                    <label htmlFor='passwordRepeat'>Confirm Password*</label>
                </div>
                <div className='flex'>
                    <input id='password'
                        type='password'
                        placeholder={StringHelper.generateCharFill(CHARACTER_CODES.BULLET, 10)}
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        autoComplete='on' />
                    <input id='passwordRepeat'
                        type='password'
                        placeholder={StringHelper.generateCharFill(CHARACTER_CODES.BULLET, 10)}
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                        autoComplete='on' />
                </div>
                <button className='submit-button'>
                    <EditIcon />
                    Create New Account
                </button>
            </form>
        </PageTemplate>
    );
}