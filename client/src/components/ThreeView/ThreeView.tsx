import { ReactElement, useEffect, useRef, useState } from "react";
import MVScene from "../../systems/base/MVScene";
import { ParallaxElement } from "../Parallax/ParallaxElement";
import { UniversalLoader } from "../SmartSuspense/UniversalLoader";
import './ThreeView.css';

/**
 * Generates a ThreeView element used for displaying ThreeJS scenes within JSX.
 */
export function ThreeView(): ReactElement {
    /**
     * Stores reference to the containing element used for sizing.
     */
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Stores reference to the canvas element used for displaying a 3D scene.
     */
    const canvasRef = useRef<HTMLCanvasElement>(null);

    /**
     * Determines when the ThreeJS scene has been fully loaded.
     */
    const [sceneLoaded, setSceneLoaded] = useState(false);

    /**
     * Reference to the scene object used for rendering ThreeJS.
     */
    let scene: MVScene;

    /**
     * Called when the ThreeJS scene is fully loaded.
     */
    useEffect(() => {
        if (scene) {
            // Handle resizing the canvas now.
            scene.onWindowResize();
        }
    }, [sceneLoaded]);

    /**
     * Called when this JSX first mounts.
     */
    useEffect(() => {
        mount();
        return unmount;
    }, []);

    /**
     * On mount, handle setting up the MVScene object.
     * @return {void} void
     */
    function mount(): void {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (container && canvas && !scene) {
            scene = new MVScene(canvas, container, {
                onLoadComplete: () => {
                    setSceneLoaded(true);
                }
            });
        }
    }

    /**
     * On unmount, deconstruct and remove any listeners.
     * @return {void} void
     */
    function unmount(): void {
        // Deconstruct and stop listening for events here.
    }

    return (
        <>
            <div className='three-view-container'>
                {!sceneLoaded && (
                    <UniversalLoader />
                )}
                {/* <ParallaxElement> */}
                    <div className='three-viewport' ref={containerRef}>
                        <canvas style={sceneLoaded ? {display: 'block'} : {display: 'none'}} ref={canvasRef} />
                    </div>
                {/* </ParallaxElement> */}
            </div>
        </>
    );
}
