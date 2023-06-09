import {ReactElement, Suspense} from 'react';
import '../Layout.css';
import './IndexPage.css';
import { Carousel } from '../scenes/Carousel';
import { Canvas } from '@react-three/fiber';
import { CanvasLoader } from '../scenes/CanvasLoader';

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
                <p>
                </p>
            </div>
        </div>
    );
}