import { ACESFilmicToneMapping, AmbientLight, DirectionalLight, Euler, Group, MathUtils, Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera, PointLight, Raycaster, Scene, SpotLight, SRGBColorSpace, Vector2, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { getServerURI } from "../../utils/URIHelper";
import { isDeviceMobile } from "../../utils/DetectMobile";
import { isThisSecond } from "date-fns";

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

    protected logo: Object3D;
    protected shadow: Object3D;
    protected prompt: Object3D;
    protected promptScale: number = 1;
    protected originalLogoPosition: Vector3;
    protected originalLogoRotation: Euler;

    protected mousePosition: Vector2;

    protected isModelLoaded: boolean = false;

    protected raycaster: Raycaster;

    public constructor(canvas_: HTMLCanvasElement, container_: HTMLDivElement) {
        this.canvas = canvas_;
        this.container = container_;

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(25, this.canvas.offsetWidth / this.canvas.offsetHeight, 0.1, 10000);
        this.camera.position.z += 9;
        this.camera.position.y -= 0.1;
        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.outputColorSpace = SRGBColorSpace;
        // this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
        this.raycaster = new Raycaster();

        const handleModelImport = (importedScene: any) => {
            this.model = importedScene.scene;
            // this.model.scale.set(0.01, 0.01, 0.01);
            this.model.position.set(0, 0.02, 0);

            // Get materials.
            const materials: MeshStandardMaterial[] = [];
            this.model.traverse((object: Mesh) => {
                if (object.material) {
                    materials.push(object.material as MeshStandardMaterial);
                }
                // if (object.name === 'mesh_background') {
                //     object.receiveShadow = true;
                // } else {
                //     object.castShadow = true;
                // }
                if (object.name === 'mesh_logo') {
                    this.logo = object;
                    this.originalLogoPosition = this.logo.position.clone();
                    this.originalLogoRotation = this.logo.rotation.clone();
                } else if (object.name === 'mesh_prompt') {
                    this.prompt = object;
                } else if (object.name === 'mesh_shadow1') {
                    this.shadow = object;
                }
            });
            materials.forEach((material) => {
                if (material.map) {
                    material.map.colorSpace = SRGBColorSpace;
                }
            });
            
            this.scene.add(this.model);
            this.isModelLoaded = true;
        }

        const gltfLoader = new GLTFLoader();
        const uri = getServerURI('../uploads/models/model_caperwing/model_caperwing.gltf');
        gltfLoader.load(uri, handleModelImport);

        // const fbxLoader = new FBXLoader();
        // const uri = getServerURI('../uploads/models/model_caperwing2/model_caperwing.fbx');
        // fbxLoader.load(uri, handleModelImport);

        const ambientLight = new AmbientLight();
        ambientLight.intensity = 0.5;
        this.scene.add(ambientLight);

        const light = new PointLight();
        // light.castShadow = true;
        // light.shadow.mapSize.set(1024, 1024);
        light.position.set(0, 0.5, 1);
        this.scene.add(light);

        // this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.orbitControls.update();

        this.mousePosition = new Vector2();
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseleave', () => {
            this.canvas.style.cursor = 'default';
            this.promptScale = 1;
            this.mousePosition.x = this.mousePosition.y = 0;
        });

        if (isDeviceMobile()) {
            this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
        }

        this.onWindowResize();
        this.update();

        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    protected onMouseMove(event_: MouseEvent): void {
        event_.preventDefault();
        // this.mousePosition.x = (event_.clientX / this.canvas.offsetWidth) * 2 - 1;
        // this.mousePosition.y = (event_.clientY / this.canvas.offsetHeight) * 2 + 1;
        // this.mousePosition.x = (event_.clientX / window.innerWidth) * 2 - 1;
        // this.mousePosition.y = (event_.clientY / window.innerHeight) * 2 + 1;
        const bounds = this.canvas.getBoundingClientRect();
        this.mousePosition.x = ((event_.clientX - bounds.left) / (bounds.right - bounds.left)) * 2 - 1;
        this.mousePosition.y = -((event_.clientY - bounds.top) / (bounds.bottom - bounds.top)) * 2 + 1;

        this.checkForCollision();
    }

    protected onTouchMove(event_: TouchEvent): void {
        // event_.preventDefault();
        const touch = event_.touches[0];
        const bounds = this.canvas.getBoundingClientRect();
        this.mousePosition.x = ((touch.clientX - bounds.left) / (bounds.right - bounds.left)) * 2 - 1;
        this.mousePosition.y = -((touch.clientY - bounds.top) / (bounds.bottom - bounds.top)) * 2 + 1;
    }

    protected onWindowResize(): void {
        const container = this.renderer.domElement.parentElement;
        const rect = container.getBoundingClientRect();
        this.renderer.setSize(rect.width, rect.height);
        this.camera.aspect = (rect.width / rect.height);
        this.camera.updateProjectionMatrix();
    }

    protected checkForCollision(): void {
        if (!this.isModelLoaded) {
            return;
        }
        this.raycaster.setFromCamera(this.mousePosition, this.camera);
        const intersects = this.raycaster.intersectObjects(this.model.children);
        let collision = false;

        intersects.forEach((intersection) => {
            if (intersection.object === this.prompt) {
                collision = true;
            }
        });

        if (collision) {
            this.canvas.style.cursor = 'pointer';
            this.promptScale = 1.1;
        } else {
            this.canvas.style.cursor = 'default';
            this.promptScale = 1;
        }
    }

    public update(currentTime_: number = 0): void {
        requestAnimationFrame(this.update.bind(this));

        const delta = (currentTime_ - this._timeElapsed) * 0.001;
        this._timeElapsed = currentTime_;

        this.orbitControls?.update();
        this.renderer.render(this.scene, this.camera);

        // const speed = delta * 0.25;
        // if (this.model) {
        //     this.model.rotation.x += speed;
        //     this.model.rotation.y += speed;
        // }

        // this.camera.rotation.x = MathUtils.lerp(this.camera.rotation.x, ((this.mousePosition.y * Math.PI) / 60), 0.05);
        // this.camera.rotation.x = MathUtils.lerp(this.camera.rotation.x,
        //     MathUtils.clamp((this.mousePosition.y * Math.PI) / 60, -0.02, 0.02), 0.025);

        this.camera.position.z = MathUtils.lerp(this.camera.position.z,
            MathUtils.clamp((7.75 - this.mousePosition.y * 0.75), 7, 8), 0.025);
        this.camera.rotation.y = MathUtils.lerp(this.camera.rotation.y,
            MathUtils.clamp((-this.mousePosition.x * Math.PI) / 60, -0.045, 0.045), 0.025);

        if (this.isModelLoaded) {
            this.prompt.scale.x = MathUtils.lerp(this.prompt.scale.x, this.promptScale, 0.05);
            this.prompt.scale.z = MathUtils.lerp(this.prompt.scale.z, this.promptScale, 0.05);

            const wave = Math.sin(this._timeElapsed * 0.001) * 0.1;
            const skew = Math.sin(this._timeElapsed * 0.00134) * 0.05;
            this.logo?.position.set(this.originalLogoPosition.x,
                this.originalLogoPosition.y + wave, this.originalLogoPosition.z);
            this.logo?.rotation.set(this.originalLogoRotation.x,
                this.originalLogoRotation.y - skew, this.originalLogoRotation.z);
            this.shadow.scale.set(1 - (wave * 2), 1 - wave, 1 - wave);
        }
    }
}