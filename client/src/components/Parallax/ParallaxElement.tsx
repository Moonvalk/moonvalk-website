import { CSSProperties, PropsWithChildren, ReactElement, useEffect, useRef } from "react";
import { isDeviceMobile } from "../../utils/DetectMobile";

interface IParallaxElementProps {
    initialOffsetY?: number,
    scrollSpeed?: number,
    className?: string,
    style?: CSSProperties,
}

export function ParallaxElement(props: PropsWithChildren<IParallaxElementProps>): ReactElement {
    const parallaxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isDeviceMobile()) {
            const speed = (props.scrollSpeed ? props.scrollSpeed : 0.25);
            const initial = (props.initialOffsetY ? props.initialOffsetY : 0);
            const setParallaxTranslation = () => {
                const offsetY = window.scrollY;
                if (parallaxRef?.current) {
                    parallaxRef.current.style.transform = "translateY(" + (initial + (offsetY * speed)) + "px)";
                }
            };
            setParallaxTranslation();
            window.addEventListener('scroll', setParallaxTranslation);
            return () => {
                window.removeEventListener('scroll', setParallaxTranslation);
            }
        }
    }, []);
    
    return (
        <div ref={parallaxRef} className={props.className} style={props.style}>
            {props.children}
        </div>
    );
}
