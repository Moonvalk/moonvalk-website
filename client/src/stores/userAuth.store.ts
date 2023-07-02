import { create } from 'zustand';

export const enum ACCESS_LEVEL {
    UNKNOWN = 0,
    USER = 1,
    ADMIN = 2,
}

export interface IUserInfo {
    id: string | null,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    accessLevel: ACCESS_LEVEL | number,
}

export type UserAuth = {
    userInfo: IUserInfo | null,
    setUserInfo: (data_: IUserInfo) => void,
    userLoggedIn: boolean,
    setUserLoggedIn: (flag_: boolean) => void,
}

export const userAuthStore = create<UserAuth>((set) => ({
    userInfo: null,
    // setUserInfo: (data_: IUserInfo) => {
    //     set({ userInfo: (data_ === null ? DEFAULT_UNKNOWN_USER_INFO : data_) });
    // },
    setUserInfo: (data_: IUserInfo) => set({ userInfo: data_ }),
    userLoggedIn: false,
    setUserLoggedIn: (flag_: boolean) => set({ userLoggedIn: flag_ }),
}));

// export function isAuthorized(accessLevel_: ACCESS_LEVEL): boolean {
//     const {userInfo} = userAuthStore();
//     if (accessLevel_ === ACCESS_LEVEL.UNKNOWN || userInfo?.accessLevel >= accessLevel_) {
//         return true;
//     } else {
//         return false;
//     }
// }
