import { ReactElement, useRef, useState } from "react";
import { Mesh } from "three";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './Carousel.css';

// export class Carousel extends React.Component {

//     // protected _scene: Scene;
//     // protected _camera: PerspectiveCamera;
//     // protected _renderer: WebGLRenderer;
//     // protected _canvasElement: HTMLCanvasElement;
//     // protected _cube: Mesh;

//     // public constructor(canvasElement_: HTMLCanvasElement) {
//     //     this._canvasElement = canvasElement_;
//     //     this._renderer = new WebGLRenderer({
//     //         canvas: this._canvasElement,
//     //         antialias: true,
//     //     });
//     //     this._renderer.setSize(this._canvasElement.width, this._canvasElement.height);
        
//     //     this.init();
//     //     this.registerEvents();
//     // }

//     // protected init(): void {
//     //     this._scene = new Scene();
//     //     this._camera = new PerspectiveCamera(
//     //         75,
//     //         this._canvasElement.width / this._canvasElement.height,
//     //         0.1,
//     //         1000,
//     //     );
//     //     this._camera.position.z = 2.0;

//     //     new OrbitControls(this._camera, this._renderer.domElement);

//     //     const geometry = new BoxGeometry();
//     //     const material = new MeshBasicMaterial({
//     //         color: 0x00ff00,
//     //         wireframe: true,
//     //     });

//     //     this._cube = new Mesh(geometry, material);
//     //     this._scene.add(this._cube);
//     // }

//     // protected registerEvents(): void {
//     //     window.addEventListener('resize', this.onWindowResize.bind(this), false);
//     // }

//     // protected onWindowResize(): void {
//     //     this._camera.aspect = this._canvasElement.width / this._canvasElement.height;
//     //     this._camera.updateProjectionMatrix();
//     //     this._renderer.setSize(this._canvasElement.width, this._canvasElement.height);
//     //     this.render();
//     // }

//     // protected animate(deltaTime_: number): void {
//     //     this._cube.rotation.x += 0.01;
//     //     this._cube.rotation.y += 0.01;
//     //     requestAnimationFrame(this.animate.bind(this));
//     //     // this.render(deltaTime_);
//     // }

//     render(): ReactElement {
//         // this._renderer.render(this._scene, this._camera);
//         return (
//             <div className="carousel">
//                 <Canvas shadows>

//                 </Canvas>
//             </div>
//         )
//     }
// }
function Box(props: any) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef<Mesh>();
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
      if (ref?.current) {
        ref.current.rotation.x += delta;
      }
    })
    // Return the view, these are regular ThreeJS elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }

export default function Carousel(): ReactElement {
    return (
        <div className="carousel">
          <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
            <OrbitControls />
          </Canvas>
        </div>
    );
}