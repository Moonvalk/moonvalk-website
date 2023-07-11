import { ReactElement, useEffect, useState } from "react";

/**
 * Properties for the FallbackDelayer.
 */
export interface IFallbackDelayerProps {
    /**
     * An element to display as a fallback when delaying load.
     */
    fallback: ReactElement,

    /**
     * The delay in milliseconds for the fallback to display for.
     */
    fallbackDelay: number,

    /**
     * Callback executed when the fallback is shown.
     */
    onShowFallback: () => void,
}

/**
 * Generates an element that delays the display of a fallback during Suspense waiting for a Promise.
 * @param {IFallbackDelayerProps} props_ - Properties for changing the functionality of this element.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function FallbackDelayer(props_: IFallbackDelayerProps): ReactElement {
    /**
     * Flag that determines if the fallback is currently being rendered.
     */
    const [showFallback, setShowFallback] = useState(false);

    /**
     * Called when properties are adjusted and this element renders.
     */
    useEffect(() => {
        if (props_.fallbackDelay) {
            const timeoutId = setTimeout(() => {
                setShowFallback(true);
                props_.onShowFallback();
            }, props_.fallbackDelay);

            return () => {
                clearInterval(timeoutId);
            };
        } else {
            setShowFallback(true);
            props_.onShowFallback();
        }
    }, [props_.fallbackDelay, props_.onShowFallback]);

    // Shows the fallback when necessary.
    return (showFallback ? props_.fallback : null);
}