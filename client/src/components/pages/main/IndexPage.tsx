import {ReactElement, lazy} from 'react';
import { PageTitle } from '../../templates/PageTitle';
import { SmartSuspense } from '../../loading/SmartSuspense';
import { UniversalLoader } from '../../loading/UniversalLoader';
import { PageTemplate } from '../../templates/PageTemplate';

export function IndexPage(): ReactElement {
    const LazyCarousel = lazy(() => import('../../scenes/ThreeView'));

    return (
        <PageTemplate hideHeader>
            <SmartSuspense fallback={<UniversalLoader />} fallbackDelay={0}>
                <LazyCarousel />
            </SmartSuspense>
            <div className='page'>
                <p className='body-text center'>
                    Check back in later; the gremlins only work when nobody is watching.
                </p>
            </div>
        </PageTemplate>
    );
}
