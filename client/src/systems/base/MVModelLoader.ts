import { Texture, TextureLoader } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface IModelLoadProps {
    directory: string,
    models?: string[],
    textures?: string[],
    onComplete?: () => void,
}

export class MVModelLoader {
    protected static mapOfModels = new Map<string, GLTF>();
    protected static mapOfTextures = new Map<string, Texture>();
    protected static gltfLoader = new GLTFLoader();
    protected static textureLoader = new TextureLoader();

    public static load(props_: IModelLoadProps): void {
        // Create a map and callback for checking the entire load queue whenever an item is finished.
        const completionChecks = new Map<string, boolean>();
        const checkComplete = (uri_: string) => {
            completionChecks.set(uri_, true);
            let allLoadsComplete = true;
            completionChecks.forEach((isLoaded_: boolean) => {
                if (!isLoaded_) {
                    allLoadsComplete = false;
                }
            });
            if (allLoadsComplete && props_.onComplete) {
                props_.onComplete();
            }
        }

        // Mark all files as incomplete when starting.
        const allFiles = props_.models.concat(props_.textures);
        allFiles.forEach((uri_: string) => {
            completionChecks.set(uri_, false);
        });

        // Load individual models in this queue.
        props_.models?.forEach((uri_: string) => {
            MVModelLoader.gltfLoader.load(props_.directory + uri_, (gltf_: GLTF) => {
                MVModelLoader.mapOfModels.set(uri_, gltf_);
                checkComplete(uri_);
            });
        });
        
        // Load individual textures in this queue.
        props_.textures?.forEach((uri_: string) => {
            MVModelLoader.textureLoader.load(props_.directory + uri_, (texture_: Texture) => {
                MVModelLoader.mapOfTextures.set(uri_, texture_);
                checkComplete(uri_);
            });
        });
    }

    public static getModel(uri_: string): any {
        return MVModelLoader.mapOfModels.get(uri_);
    }

    public static getTexture(uri_: string): any {
        return MVModelLoader.mapOfTextures.get(uri_);
    }
}