import { ReactElement, useState } from 'react';
import { SendIcon } from '../../../assets/svg/icons/Actions';
import { ContactIcon } from '../../../assets/svg/icons/Menus';
import { InfoIcon } from '../../../assets/svg/icons/Misc';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { PromptElement } from '../../../components/Prompt/PromptElement';
import { ButtonElement } from '../../../components/Button/ButtonElement';
import { getServerURI } from '../../../utils/URIHelper';
import { IconTritone } from '../../../components/Icons/IconTritone';

export function ContactPage(): ReactElement {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmitForm(event_: React.FormEvent): Promise<void> {
        event_.preventDefault();
        if (firstName === '' || email === '' || subject === '' || message === '') {
            alert('Missing required fields.');
            return;
        }

        const response = await fetch(getServerURI('api/contact/sendMessage'), {
            method: 'POST',
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                subject: subject,
                message: message,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setSubject('');
            setMessage('');
            alert('Message sent successfully.');
        } else {
            alert('An error occurred.');
        }
    }
    
    return (
        <PageTemplate title='Contact' icon={<IconTritone baseSVG={<ContactIcon />} />} pageWrap='page_small'>
            <PromptElement icon={<InfoIcon />}
                text='Use the form below to submit questions, concerns, or feedback and we will get back to you shortly.' />
            <PromptElement text={<em>* Required fields</em>} />
            <form className='form_basic' onSubmit={handleSubmitForm}>
                <label htmlFor='first-name'>Name*</label>
                <div className="flex">
                    <input className='flex'
                        id='first-name'
                        type='text'
                        placeholder='First*'
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        autoComplete='on' />
                    <input className='flex'
                        id='last-name'
                        type='text'
                        placeholder='Last'
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        autoComplete='on' />
                </div>
                <div className="flex">
                    <label htmlFor='email'>Email*</label>
                    <label htmlFor='phone'>Phone</label>
                </div>
                <div className="flex">
                    <input id='email'
                        type='email'
                        placeholder='example@mail.com'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete='on' />
                    <input id='phone'
                        type='phone'
                        placeholder='### ### ####'
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        autoComplete='on' />
                </div>
                <label htmlFor='subject'>Subject*</label>
                <input id='subject'
                    type='subject'
                    placeholder='My Cat Turned Into A Zombie!'
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    autoComplete='on' />
                <label htmlFor='message'>Message*</label>
                <textarea id='message'
                    placeholder=''
                    value={message}
                    onChange={(event) => setMessage(event.target.value)} />
                <ButtonElement icon={<SendIcon />} text='Submit Message' />
            </form>
        </PageTemplate>
    );
}