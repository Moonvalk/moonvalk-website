import { create } from 'zustand';

export interface IUserInfo {
    id: string | null,
    username: string | null,
    firstName: string,
    administrator: boolean,
}

export type UserAuth = {
    authentication: boolean,
    setAuthentication: (flag_: boolean) => void,
    userInfo: IUserInfo,
    setUserInfo: (data_: IUserInfo) => void,
}

export const userAuthStore = create<UserAuth>((set) => ({
    authentication: false,
    setAuthentication: (flag_: boolean) => set({ authentication: flag_ }),
    userInfo: null,
    setUserInfo: (data_: IUserInfo) => set({ userInfo: data_ }),
}));
