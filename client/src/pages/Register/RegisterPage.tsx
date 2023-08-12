import { ReactElement, useState } from 'react';
import { getServerURI } from '../../utils/URIHelper';
import { StringHelper } from '../../utils/StringHelper';
import { CHARACTER_CODES } from '../../constants/CharacterCodes';
import { Link, Navigate } from 'react-router-dom';
import { HelpIcon } from '../../assets/svg/icons/Misc/HelpIcon';
import { EditIcon } from '../../assets/svg/icons/Actions/EditIcon';
import { PageTemplate } from '../../components/PageTemplate/PageTemplate';
import { PromptElement } from '../../components/Prompt/PromptElement';
import { ACCESS_LEVEL, IUserInfo } from '../../stores/User';
import { ButtonElement } from '../../components/Button/ButtonElement';
import { IconTritone } from '../../components/Icons/IconTritone';

/**
 * Called to generate the user registration page.
 * @return {ReactElement} A new JSX element for rendering.
 */
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
            email === '' || password === '') {
            alert('Missing required fields.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Password does not match.');
            return;
        }
        if (password.length < 8) {
            alert('Password is not strong enough. Requirements: 8 character length.');
            return;
        }
        const userData: IUserInfo = {
            username: username,
            email: email,
            password: password,
            firstName: firstName,
            lastName: (lastName !== '') ? lastName : null,
            accessLevel: ACCESS_LEVEL.USER,
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
        <PageTemplate title='Register' icon={<IconTritone baseSVG={<EditIcon />} />} pageWrap='page_small'>
            <PromptElement icon={<HelpIcon />} text={(
                <>Already have an account? <Link to='/login'>Sign In</Link></>)} />
            <form className='form_basic' onSubmit={handleRegistration}>
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
                        autoComplete='on'
                        style={{fontFamily: 'var(--TITLE_FONT), sans-serif'}} />
                    <input id='passwordRepeat'
                        type='password'
                        placeholder={StringHelper.generateCharFill(CHARACTER_CODES.BULLET, 10)}
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                        autoComplete='on'
                        style={{fontFamily: 'var(--TITLE_FONT), sans-serif'}} />
                </div>
                <ButtonElement text='Create New Account' icon={<EditIcon />} />
            </form>
        </PageTemplate>
    );
}