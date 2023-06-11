import {ReactElement, useEffect, useState} from 'react';
import './ContactPage.css';
import '../Layout.css';
import { PageTitle } from '../context/PageTitle';

export default function ContactPage(): ReactElement {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    
    return (
        <div className="content">
            <PageTitle title="Contact" />
            <div className="header-margin"></div>
            <div className="page">
                <h1>Contact</h1>
                <hr />
                <p className="center">
                    Use the form below to submit questions, concerns, or feedback and we will get back to you shortly.
                </p>
                <form className="contact">
                    <label htmlFor='first-name'>Name*</label>
                    <div className="flex">
                        <input className='first-name'
                            id='first-name'
                            type='text'
                            placeholder='First'
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            autoComplete='on' />
                        <input className='last-name'
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
                    <button>Submit Message</button>
                </form>
            </div>
        </div>
    );
}