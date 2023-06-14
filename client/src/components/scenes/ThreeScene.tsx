import { Component, ReactElement } from "react";
import { BoxGeometry, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import './Carousel.css';

export default class ThreeScene extends Component {
    protected _mount: HTMLElement;
    public scene: Scene;
    public renderer: WebGLRenderer;
    public camera: PerspectiveCamera;
    public cube: Mesh;

    public componentDidMount(): void {
        this.scene = new Scene();
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(this._mount.offsetWidth, this._mount.offsetHeight);

        this._mount.appendChild(this.renderer.domElement);

        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5.0;

        const geometry = new BoxGeometry();
        const material = new MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        this.cube = new Mesh(geometry, material);

        this.scene.add(this.cube);
        this.animation();
        this.renderer.render(this.scene, this.camera);
    }

    animation = () => {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animation);
    }

    public render(): ReactElement {
        return (
            <div className='carousel' ref={mount => (this._mount = mount)} />
        );
    }
}
