import { ACCESS_LEVEL } from "./AccessLevel";

/**
 * Contract representing a general user data pulled from the server or
 * generated via registration / token in cookies.
 */
export interface IUserInfo {
    /**
     * An id associated with the user.
     */
    id?: string,
    
    /**
     * The displayed name of the user.
     */
    username: string,

    /**
     * The email address associated with this user.
     */
    email: string,

    /**
     * The first name of this user.
     */
    firstName: string,

    /**
     * The last name of this user.
     */
    lastName: string,

    /**
     * The password input by the user when adjusting user info.
     */
    password?: string,

    /**
     * The access level associated with this user.
     */
    accessLevel: ACCESS_LEVEL | number,
}
