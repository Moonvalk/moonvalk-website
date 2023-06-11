import { ReactElement, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { FallbackDelayer } from "./FallbackDelayer";
import { PromiseThrower } from "./PromiseThrower";

export interface ISmartSuspenseProps {
    children: any,
    fallback: ReactElement,
    fallbackDelay?: number,
    fallbackMinimumDuration?: number,
}

export function SmartSuspense({
    children,
    fallback,
    fallbackDelay = 250,
    fallbackMinimumDuration = 1000,
}: ISmartSuspenseProps): ReactElement {
    const [isWaiting, setIsWaiting] = useState(false);
    const timeoutIdRef = useRef(undefined);
    
    const startWaiting = useCallback(() => {
        setIsWaiting(true);
        timeoutIdRef.current && clearInterval(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
            setIsWaiting(false);
        }, fallbackMinimumDuration);
    }, [fallbackMinimumDuration]);

    useEffect(() => {
        return () => timeoutIdRef.current && clearInterval(timeoutIdRef.current);
    }, []);

    return (
        <Suspense fallback={
            <FallbackDelayer 
                fallback={fallback}
                fallbackDelay={fallbackDelay}
                onShowFallback={startWaiting} />
        }>
            {isWaiting && <PromiseThrower />}
            {children}
        </Suspense>
    );
}
