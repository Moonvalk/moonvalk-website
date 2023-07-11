import { ReactElement, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { FallbackDelayer } from "./FallbackDelayer";
import { PromiseThrower } from "./PromiseThrower";

/**
 * Properties for handling SmartSuspense.
 */
export interface ISmartSuspenseProps {
    /**
     * All children elements to be displayed when suspense is complete.
     */
    children: any,

    /**
     * A fallback element to be displayed while loading is active.
     */
    fallback: ReactElement,

    /**
     * The minimum loading duration required for the fallback to display at all, in milliseconds. This requirement
     * needs to be met otherwise loading has occurred quickly enough to not show a fallback at all.
     */
    fallbackDelay?: number,

    /**
     * The minimum duration in milliseconds that the fallback will show for when required. This keeps
     * the element from snapping harshly on and off of the screen.
     */
    fallbackMinimumDuration?: number,
}

/**
 * Generates a new SmartSuspense element for handling Suspense around objects in a dynamic way. This enforces
 * smoothly playing fallback animations for a minimum duration when needed.
 * @param {ISmartSuspenseProps} {} Properties for setting up this suspense object. 
 * @return {ReactElement} A new JSX element for selectively rendering.
 */
export function SmartSuspense({
    children,
    fallback,
    fallbackDelay = 250,
    fallbackMinimumDuration = 1000,
}: ISmartSuspenseProps): ReactElement {
    /**
     * Flag that determines if the Suspense is actively waiting.
     */
    const [isWaiting, setIsWaiting] = useState(false);

    /**
     * Stores a reference to the current timeout.
     */
    const timeoutIdRef = useRef(undefined);
    
    /**
     * Called to start waiting period once fallback display duration has been met.
     */
    const startWaiting = useCallback(() => {
        setIsWaiting(true);
        timeoutIdRef.current && clearInterval(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
            setIsWaiting(false);
        }, fallbackMinimumDuration);
    }, [fallbackMinimumDuration]);

    /**
     * Called when this JSX element first loads.
     */
    useEffect(() => {
        return () => timeoutIdRef.current && clearInterval(timeoutIdRef.current);
    }, []);

    // Show fallback when needed, otherwise skip directly to showing children elements.
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
