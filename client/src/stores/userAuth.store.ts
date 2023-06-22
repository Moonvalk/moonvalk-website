import { create } from 'zustand';

const useUserAuthStore = create((set) => ({
    authentication: false,
    setAuthentication: (flag_: boolean) => set({ authentication: flag_ }),
}));
