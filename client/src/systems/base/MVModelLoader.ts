import { Texture, TextureLoader } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

/**
 * Properties available when loading models.
 */
interface IModelLoadProps {
    /**
     * The directory where assets are located.
     */
    directory: string,

    /**
     * An array of all model file names to be loaded.
     */
    models?: string[],

    /**
     * An array of all texture file names to be loaded.
     */
    textures?: string[],

    /**
     * A callback to be executed when all files are loaded.
     */
    onComplete?: () => void,
}

/**
 * Class used for loading models and textures asynchronously.
 */
export class MVModelLoader {
    /**
     * A map of all loaded model files by file name.
     */
    protected static mapOfModels = new Map<string, GLTF>();

    /**
     * A map of all loaded texture files by file name.
     */
    protected static mapOfTextures = new Map<string, Texture>();

    /**
     * Stores reference to a GLTF loader object.
     */
    protected static gltfLoader = new GLTFLoader();

    /**
     * Stores reference to a Texture loader object.
     */
    protected static textureLoader = new TextureLoader();

    /**
     * Called to load all specified models and textures.
     * @param {IModelLoadProps} props_ - Properties containing directory, models, textures, and optional callback.
     * @return {void} void
     */
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

    /**
     * Gets the model with the specified file name if available.
     * @param {string} uri_ - The file name to request.
     * @return {GLTF} The model requested.
     */
    public static getModel(uri_: string): GLTF {
        return MVModelLoader.mapOfModels.get(uri_);
    }

    /**
     * Gets the texture with the specified file name if available.
     * @param {string} uri_ - The file name to request.
     * @return {Texture} The texture requested.
     */
    public static getTexture(uri_: string): Texture {
        return MVModelLoader.mapOfTextures.get(uri_);
    }
}