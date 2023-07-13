import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './styles/main.css';
import './styles/fonts.css';

/**
 * The title to be displayed for this website.
 */
export const WEBSITE_TITLE = 'Moonvalk Studios';

// Create root for placing application into the DOM.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Apply browser router.
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
