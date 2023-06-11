import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import './main.css';

export const WEBSITE_TITLE = 'Moonvalk Studios';

// Create root for placing application into the DOM.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Apply browser router.
root.render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>
);
