
/**
 * Container for storing environment variables.
 */
export default class EnvironmentConfig {
    /**
     * Stores reference to the MongoDB database URL.
     */
    protected _mongoURL: string;

    /**
     * Default constructor for this data container.
     * @param {any} processedEnv - All processed env data.
     */
    public constructor(processedEnv: any) {
        this._mongoURL = processedEnv.MONGO_URL;
    }

    /**
     * Gets the MongoDB database URL.
     * @return {string} The stored database URL.
     */
    public get mongoURL(): string {
        return this._mongoURL;
    }
}
