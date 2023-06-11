import { ReactElement, useEffect, useState } from "react";


export interface IFallbackDelayerProps {
    fallback: ReactElement,
    fallbackDelay: number,
    onShowFallback: () => void,
}

export function FallbackDelayer(props: IFallbackDelayerProps): ReactElement {
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        if (props.fallbackDelay) {
            const timeoutId = setTimeout(() => {
                setShowFallback(true);
                props.onShowFallback();
            }, props.fallbackDelay);

            return () => {
                clearInterval(timeoutId);
            };
        } else {
            setShowFallback(true);
            props.onShowFallback();
        }
    }, [props.fallbackDelay, props.onShowFallback]);

    return (showFallback ? props.fallback : null);
}