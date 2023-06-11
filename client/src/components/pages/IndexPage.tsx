import {ReactElement, lazy} from 'react';
import '../Layout.css';
import './IndexPage.css';
import { PageTitle } from '../context/PageTitle';
import { SmartSuspense } from '../loading/SmartSuspense';
import { CanvasLoader } from '../scenes/CanvasLoader';

export default function IndexPage(): ReactElement {
    const LazyCarousel = lazy(() => import('../scenes/Carousel'));

    return (
        <div className="content">
            <PageTitle />
            <SmartSuspense fallback={<CanvasLoader />} fallbackDelay={0}>
                <LazyCarousel />
            </SmartSuspense>
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