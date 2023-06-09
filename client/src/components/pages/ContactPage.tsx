import {ReactElement} from 'react';
import './ComicsPage.css';
import '../Layout.css';

export function ContactPage(): ReactElement {
    return (
        <div className="content">
            <div className="header-margin"></div>
            <div className="page">
                <h1>Contact</h1>
                <hr />
                <p className="center">
                    Use the form below to submit questions, feedback, or concerns and we will get back to you shortly.
                </p>
                <form>
                    <input></input>
                    <input></input>
                    <textarea></textarea>
                    <button></button>
                </form>
            </div>
        </div>
    );
}