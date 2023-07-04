import { create } from 'zustand';
import { IUserInfo } from './IUserInfo';

/**
 * Contract for a user authentication store to fulfill.
 */
interface IUserAuth {
    /**
     * Tracks the current user info pulled from the server on login and from user
     * cookies during new page visits.
     */
    userInfo: IUserInfo | null,

    /**
     * Called to set current user info.
     * @param {IUserInfo} data_ - The new data to be stored.
     * @return {void} void
     */
    setUserInfo: (data_: IUserInfo) => void,

    /**
     * Flag that determines if the user is currently logged in.
     */
    userLoggedIn: boolean,

    /**
     * Sets the state of the user being logged in.
     * @param {boolean} flag_ - True if the user is now logged in.
     * @return {void} void
     */
    setUserLoggedIn: (flag_: boolean) => void,
}

/**
 * Data storage used for globally tracking user authentication data.
 */
export const userAuthStore = create<IUserAuth>((set) => ({
    userInfo: null,
    setUserInfo: (data_: IUserInfo) => set({ userInfo: data_ }),
    userLoggedIn: false,
    setUserLoggedIn: (flag_: boolean) => set({ userLoggedIn: flag_ }),
}));
