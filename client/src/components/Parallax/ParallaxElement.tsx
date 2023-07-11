import { CSSProperties, PropsWithChildren, ReactElement, useEffect, useRef } from "react";
import { isDeviceMobile } from "../../utils/DetectMobile";

/**
 * Contract for properties that a ParallaxElement requires. These are basic controls
 * for handling how a parallax effect will look.
 */
interface IParallaxElementProps {
    /**
     * An initial offset along the Y axis for the element.
     */
    initialOffsetY?: number,

    /**
     * How quickly should this parallax element scroll in relation to the rest of the page.
     * 1.0 matches the regular scroll speed of the page.
     */
    scrollSpeed?: number,

    /**
     * A class name to be applied to the parallax containing element.
     */
    className?: string,

    /**
     * Any CSS styles to be applied to the parallax containing element.
     */
    style?: CSSProperties,
}

/**
 * The default scroll speed used when none is provided.
 */
const DEFAULT_SCROLL_SPEED = 0.25;

/**
 * Generates a new parallax controlled element for display in a pseudo-3D scene.
 * @param {PropsWithChildren<IParallaxElementProps>} props_ - 
 * @return {ReactElement} A new JSX element for rendering.
 */
export function ParallaxElement(props_: PropsWithChildren<IParallaxElementProps>): ReactElement {
    /**
     * Stores reference to the main parallax containing element.
     */
    const parallaxRef = useRef<HTMLDivElement>(null);

    /**
     * Called on page load just after initial paint.
     */
    useEffect(() => {
        // Only apply this parallax translation effect on desktop. On mobile it ends up
        // rather jittery due to lack of resources for performance.
        if (!isDeviceMobile()) {
            const speed = (props_.scrollSpeed ? props_.scrollSpeed : DEFAULT_SCROLL_SPEED);
            const initial = (props_.initialOffsetY ? props_.initialOffsetY : 0);

            /**
             * Sets the parallax translation along the Y axis each time a scroll event occurs.
             */
            const setParallaxTranslation = () => {
                const offsetY = window.scrollY;
                if (parallaxRef?.current) {
                    parallaxRef.current.style.transform = "translateY(" + (initial + (offsetY * speed)) + "px)";
                }
            };
            setParallaxTranslation();
            window.addEventListener('scroll', setParallaxTranslation);

            // Deconstruct by removing event listeners.
            return () => {
                window.removeEventListener('scroll', setParallaxTranslation);
            }
        }
    }, []);
    
    // Return our parallax containing element with children wrapped inside.
    return (
        <div ref={parallaxRef} className={props_.className} style={props_.style}>
            {props_.children}
        </div>
    );
}
