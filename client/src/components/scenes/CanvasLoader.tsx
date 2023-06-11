import { ReactElement } from "react";
import './CanvasLoader.css';

export function CanvasLoader(): ReactElement {
    return (
        <div className="loader">
            <div className="loader-spinner"></div>
        </div>
    );
}