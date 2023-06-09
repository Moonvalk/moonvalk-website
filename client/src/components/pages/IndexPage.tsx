import {ReactElement} from 'react';
import '../Layout.css';
import './IndexPage.css';
import { Carousel } from '../scenes/Carousel';

export function IndexPage(): ReactElement {
    // const canvasElement = new HTMLCanvasElement();
    // const canvasElement = createCanvas();
    // canvasElement.className = "carousel";
    // const carousel = new Carousel(canvasElement);

    function createCanvas(): ReactElement {
        return (
            <canvas className="carousel"></canvas>
        );
    }

    return (
        <div className="content">
            <Carousel />
            <div className="page">
                <h1>Home</h1>
                <hr />
                <p className="center">
                    Check back in later; the gremlins only work when nobody is watching.
                </p>
            </div>
        </div>
    );
}