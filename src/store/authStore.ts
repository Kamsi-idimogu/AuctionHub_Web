import { create } from 'zustand';
import Cookies from 'js-cookie';
import { User } from '@/dto';
import { USER_ACCOUNT } from './cache/cacheKeys';
import { addToCache, removeItemFromCache } from './cache/cache';

export type AuthStore = {
    user: User | null;
    login: (user: User, token: string, expiry: number) => void;
    rehydrate: (user: User, token: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

export const useAuthStore = create<AuthStore>((set, get) => {    
    return {
    user: null,

    login: (user: User, token: string, expiry: number) => {
        const inOneHour = new Date(new Date().getTime() + expiry * 60 * 1000); // expiry is in minutes
        Cookies.set('aH_user_session_token', token, { expires: inOneHour });
        addToCache({ key: USER_ACCOUNT, value: user });
        set({ user });
    },

    rehydrate: (user: User, token: string) => {
        const checkToken = Cookies.get('aH_user_session_token');
        if (checkToken !== token) {
            return;
        }
        set({ user });
    },

    logout: () => {
        Cookies.remove('aH_user_session_token');
        removeItemFromCache(USER_ACCOUNT);
        set({ user: null });
    },

    isLoggedIn: () => {
        const user = get().user;
        const token = Cookies.get('aH_user_session_token');
        return !!user && !!token;
    },
}});
