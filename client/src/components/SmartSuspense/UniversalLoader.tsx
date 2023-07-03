import { ReactElement } from "react";
import './UniversalLoader.css';

export function UniversalLoader(): ReactElement {
    return (
        <div className="loader">
            <div className="loader-spinner"></div>
        </div>
    );
}