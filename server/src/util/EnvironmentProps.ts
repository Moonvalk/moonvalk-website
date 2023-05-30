import dotenv from 'dotenv';

/**
 * Contract used to load environment variables.
 */
export interface IEnvironmentProps {
    readonly dbHost: string,
    readonly dbUser: string,
    readonly dbPassword: string,
    readonly dbConfig: string,
    readonly serverPort: number,
    readonly localPort: number,
}

/**
 * Class used to access environment variables parsed on load.
 */
export class EnvironmentProps {
    /**
     * Singleton instance of this class.
     */
    protected static _instance: EnvironmentProps;

    /**
     * Object which stores all environment variables.
     */
    protected _envConfig: IEnvironmentProps;

    /**
     * Default constructor.
     */
    public constructor() {
        this.getEnvProps();
    }

    /**
     * Gets the singleton instance of this class or creates one when necessary.
     * @return {EnvironmentProps} The instance of this class.
     */
    public static get instance(): EnvironmentProps {
        if (!EnvironmentProps._instance) {
            EnvironmentProps._instance = new EnvironmentProps();
        }
        return EnvironmentProps._instance;
    }

    /**
     * Gets the environment configuration data.
     * @return {IEnvironmentProps} The configured environment properties.
     */
    public static get config(): IEnvironmentProps {
        return EnvironmentProps.instance._envConfig;
    }

    public static get mongooseURI(): string {
        return 'mongodb+srv://' + this.config.dbUser + ':' + this.config.dbPassword + '@' + this.config.dbHost + '/' + this.config.dbConfig;
    }

    /**
     * Called to store all environment variables parsed on load.
     * @return {void} void
     */
    protected getEnvProps(): void {
        dotenv.config();
        this._envConfig = {
            dbHost: process.env.DB_HOST,
            dbUser: process.env.DB_USER,
            dbPassword: process.env.DB_PASSWORD,
            dbConfig: process.env.DB_CONFIG,
            serverPort: parseInt(process.env.SERVER_PORT),
            localPort: parseInt(process.env.CLIENT_PORT),
        };
    }
}