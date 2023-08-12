import { AmbientLight, Euler, Group, LinearToneMapping, MathUtils, Mesh, MeshStandardMaterial, NearestFilter, Object3D, PerspectiveCamera, PointLight, Raycaster, Scene, SRGBColorSpace, Vector2, Vector3, WebGLRenderer } from "three";
import { isDeviceMobile } from "../../utils/DetectMobile";
import { MVModelLoader } from "./MVModelLoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { LUTPass } from "three/examples/jsm/postprocessing/LUTPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader";

/**
 * Properties available to an MVScene object.
 */
interface IMVSceneProps {
    /**
     * A callback to be executed when the scene load is completed.
     */
    onLoadComplete?: () => void,
}

/**
 * Object representing an individual scene.
 */
export default class MVScene {
    protected scene: Scene;
    protected camera: PerspectiveCamera;
    protected renderer: WebGLRenderer;
    protected composer: EffectComposer;
    protected canvas: HTMLCanvasElement;
    protected container: HTMLDivElement;
    protected properties: IMVSceneProps;
    protected _timeElapsed: number = 0;
    protected mousePosition: Vector2 = new Vector2();
    protected sceneLoaded: boolean = false;
    protected raycaster: Raycaster;

    protected model: Group;
    protected logo: Object3D;
    protected shadow: Object3D;
    protected prompt: Object3D;
    protected promptScale: number = 1;
    protected originalLogoPosition: Vector3;
    protected originalLogoRotation: Euler;
    

    public constructor(canvas_: HTMLCanvasElement, container_: HTMLDivElement, props_?: IMVSceneProps) {
        this.canvas = canvas_;
        this.container = container_;
        this.properties = props_;

        this.initializeThreeScene();
        this.generateLighting();
        this.loadModels(() => {
            this.sceneLoaded = true;
            if (this.properties.onLoadComplete) {
                this.properties.onLoadComplete();
            }
            this.onWindowResize();
            this.update();
        });
        
        this.registerEventListeners();
    }

    public update(currentTime_: number = 0): void {
        requestAnimationFrame(this.update.bind(this));
        const delta = (currentTime_ - this._timeElapsed) * 0.001;
        this._timeElapsed = currentTime_;

        // Continue to update animations and render the scene.
        this.handleAnimations(delta);
        this.composer.render(delta);
    }

    protected initializeThreeScene(): void {
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
        this.renderer.toneMapping = LinearToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);

        // Set up post processing.
        this.composer = new EffectComposer(this.renderer);
        this.composer.setPixelRatio(window.devicePixelRatio);
        this.composer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
        // this.composer.
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        this.raycaster = new Raycaster();
    }

    protected loadModels(onModelsLoaded?: () => void): void {
        MVModelLoader.load({
            directory: '../uploads/models/model_caperwing/',
            models: ['model_caperwing.gltf'],
            textures: ['map_birds_diffuse.png', 'map_diffuse.webp'],
            cubeLUTs: ['Cinematic-5.cube'],
            onComplete: () => {
                this.model = MVModelLoader.getModel('model_caperwing.gltf').scene;
                this.model.position.set(0, 0.02, 0);

                this.model.traverse((object_: Mesh) => {
                    if (object_.name === 'mesh_logo') {
                        this.logo = object_;
                        this.originalLogoPosition = this.logo.position.clone();
                        this.originalLogoRotation = this.logo.rotation.clone();
                    } else if (object_.name === 'mesh_prompt') {
                        this.prompt = object_;
                    } else if (object_.name === 'mesh_shadow1') {
                        this.shadow = object_;
                    }

                    let material = (object_.material as MeshStandardMaterial);
                    if (!material) {
                        material = object_.material = new MeshStandardMaterial();
                    }
                    if (object_.name.includes('mesh_bird')) {
                        material.map = MVModelLoader.getTexture('map_birds_diffuse.png');
                        material.map.minFilter = NearestFilter;
                        material.map.magFilter = NearestFilter;
                    } else {
                        material.map = MVModelLoader.getTexture('map_diffuse.webp');
                    }
                    material.map.colorSpace = SRGBColorSpace;

                    const uvAttribute = object_.geometry?.attributes.uv;
                    if (uvAttribute) {
                        for (let index = 0; index < uvAttribute.count; index++) {
                            let u = uvAttribute.getX(index);
                            let v = uvAttribute.getY(index);
                            
                            v = 1 - v;
    
                            uvAttribute.setXY(index, u, v);
                        }
                    }
                });

                // Add the full model hierarchy into the scene.
                this.scene.add(this.model);

                // Apply LUT files now.
                const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
                this.composer.addPass(gammaCorrectionPass);
                const lutPass = new LUTPass({
                    lut: MVModelLoader.getCubeLUT('Cinematic-5.cube').texture,
                    intensity: 0.6,
                });
                lutPass.enabled = true;
                this.composer.addPass(lutPass);

                if (onModelsLoaded) {
                    // Execute callback now.
                    onModelsLoaded();
                }
            }
        });
    }

    protected generateLighting(): void {
        const ambientLight = new AmbientLight();
        ambientLight.intensity = 0.5;
        this.scene.add(ambientLight);

        const light = new PointLight();
        light.position.set(0, 0.5, 1);
        this.scene.add(light);
    }

    protected registerEventListeners(): void {
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseleave', () => {
            this.canvas.style.cursor = 'default';
            this.promptScale = 1;
            this.mousePosition.x = this.mousePosition.y = 0;
        });

        if (isDeviceMobile()) {
            this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
        }
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    protected onMouseMove(event_: MouseEvent): void {
        event_.preventDefault();
        const bounds = this.canvas.getBoundingClientRect();
        this.mousePosition.x = ((event_.clientX - bounds.left) / (bounds.right - bounds.left)) * 2 - 1;
        this.mousePosition.y = -((event_.clientY - bounds.top) / (bounds.bottom - bounds.top)) * 2 + 1;

        this.checkForCollision();
    }

    protected onTouchMove(event_: TouchEvent): void {
        const touch = event_.touches[0];
        const bounds = this.canvas.getBoundingClientRect();
        this.mousePosition.x = ((touch.clientX - bounds.left) / (bounds.right - bounds.left)) * 2 - 1;
        this.mousePosition.y = -((touch.clientY - bounds.top) / (bounds.bottom - bounds.top)) * 2 + 1;
    }

    public onWindowResize(): void {
        const container = this.renderer.domElement.parentElement;
        const rect = container.getBoundingClientRect();
        this.renderer.setSize(rect.width, rect.height);
        this.composer.setSize(rect.width, rect.height);
        this.camera.aspect = (rect.width / rect.height);
        this.camera.updateProjectionMatrix();
    }

    protected checkForCollision(): void {
        if (!this.sceneLoaded) {
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

    protected handleAnimations(deltaTime_: number): void {
        if (!this.sceneLoaded) {
            return;
        }

        this.camera.position.z = MathUtils.lerp(this.camera.position.z,
            MathUtils.clamp((7.75 - this.mousePosition.y * 0.75), 7, 8), 0.025);
        this.camera.rotation.y = MathUtils.lerp(this.camera.rotation.y,
            MathUtils.clamp((-this.mousePosition.x * Math.PI) / 60, -0.045, 0.045), 0.025);

        this.prompt.scale.x = MathUtils.lerp(this.prompt.scale.x, this.promptScale, 0.1);
        this.prompt.scale.z = MathUtils.lerp(this.prompt.scale.z, this.promptScale, 0.1);

        const wave = Math.sin(this._timeElapsed * 0.001) * 0.1;
        const skew = Math.sin(this._timeElapsed * 0.00134) * 0.05;
        this.logo?.position.set(this.originalLogoPosition.x,
            this.originalLogoPosition.y + wave, this.originalLogoPosition.z);
        this.logo?.rotation.set(this.originalLogoRotation.x,
            this.originalLogoRotation.y - skew, this.originalLogoRotation.z);
        this.shadow.scale.set(1 - (wave * 2), 1 - wave, 1 - wave);
    }
}