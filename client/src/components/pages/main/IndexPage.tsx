import {ReactElement, lazy} from 'react';
import { PageTitle } from '../../layout/PageTitle';
import { SmartSuspense } from '../../loading/SmartSuspense';
import { UniversalLoader } from '../../loading/UniversalLoader';

export function IndexPage(): ReactElement {
    const LazyCarousel = lazy(() => import('../../scenes/ThreeView'));

    return (
        <div className="content">
            <PageTitle />
            <SmartSuspense fallback={<UniversalLoader />} fallbackDelay={0}>
                <LazyCarousel />
            </SmartSuspense>
            <div className="page">
                <p className="center">
                    Check back in later; the gremlins only work when nobody is watching.
                </p>
            </div>
        </div>
    );
}
