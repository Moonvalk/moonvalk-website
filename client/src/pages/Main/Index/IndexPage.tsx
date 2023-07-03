import { ReactElement, lazy } from 'react';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { SmartSuspense } from '../../../components/SmartSuspense/SmartSuspense';
import { UniversalLoader } from '../../../components/SmartSuspense/UniversalLoader';

export function IndexPage(): ReactElement {
    const LazyCarousel = lazy(() => import('../../../components/ThreeView/ThreeView'));

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
