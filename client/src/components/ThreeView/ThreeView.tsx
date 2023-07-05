import { ReactElement, useEffect, useRef, useState } from "react";
import MVScene from "../../systems/base/MVScene";
import './ThreeView.css';
import { ParallaxElement } from "../Parallax/ParallaxElement";
import { UniversalLoader } from "../SmartSuspense/UniversalLoader";

export function ThreeView(): ReactElement {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [sceneLoaded, setSceneLoaded] = useState(false);

    let scene: MVScene;

    useEffect(() => {
        if (scene) {
            scene.onWindowResize();
        }
    }, [sceneLoaded]);

    useEffect(() => {
        mount();
        return unmount;
    }, []);

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

    function unmount(): void {
        // Deconstruct and stop listening for events here.
    }

    return (
        <>
            <div className='three-view-container'>
                {!sceneLoaded && (
                    <UniversalLoader />
                )}
                <ParallaxElement>
                    <div className='three-viewport' ref={containerRef}>
                        <canvas style={sceneLoaded ? {display: 'block'} : {display: 'none'}} ref={canvasRef} />
                    </div>
                </ParallaxElement>
            </div>
        </>
    );
}