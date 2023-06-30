import { ACESFilmicToneMapping, BoxGeometry, DirectionalLight, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SRGBColorSpace, WebGLRenderer } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { getServerURI } from "../../utils/URIHelper";

export default class MVScene {
    public scene: Scene;
    public camera: PerspectiveCamera;
    public renderer: WebGLRenderer;
    public canvas: HTMLCanvasElement;
    public container: HTMLDivElement;
    public cube: Mesh;
    public model: Group;
    public orbitControls: OrbitControls;
    protected _timeElapsed: number = 0;

    public constructor(canvas_: HTMLCanvasElement, container_: HTMLDivElement) {
        this.canvas = canvas_;
        this.container = container_;

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(25, this.canvas.offsetWidth / this.canvas.offsetHeight, 0.1, 10000);
        this.camera.position.z += 2000;
        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.outputColorSpace = SRGBColorSpace;
        this.renderer.toneMapping = ACESFilmicToneMapping;
        this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);

        // const geometry = new BoxGeometry(1, 1, 1);
        // const material = new MeshStandardMaterial({color: 0x505090});
        // this.cube = new Mesh(geometry, material);
        // this.scene.add(this.cube);

        const gltfLoader = new GLTFLoader();
        const uri = getServerURI('../uploads/models/pixel_gameboy/scene.gltf');
        gltfLoader.load(uri, (gltfScene) => {
            this.model = gltfScene.scene;
            this.model.scale.set(0.1, 0.1, 0.1);
            this.model.position.set(0, 0, 0);
            this.scene.add(this.model);
        });

        const light = new DirectionalLight();
        light.position.set(1, 1, 1);
        this.scene.add(light);

        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.update();

        this.onWindowResize();
        this.update();

        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    protected onWindowResize(): void {
        const container = this.renderer.domElement.parentElement;
        const rect = container.getBoundingClientRect();
        this.renderer.setSize(rect.width, rect.height);
        this.camera.aspect = (rect.width / rect.height);
        this.camera.updateProjectionMatrix();
    }

    public onMouseMove(): void {

    }

    public update(currentTime_: number = 0): void {
        requestAnimationFrame(this.update.bind(this));

        const delta = (currentTime_ - this._timeElapsed) * 0.001;
        this._timeElapsed = currentTime_;

        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);

        const speed = delta * 0.25;
        if (this.model) {
            this.model.rotation.x += speed;
            this.model.rotation.y += speed;
        }
    }
}