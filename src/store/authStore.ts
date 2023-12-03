import { create } from 'zustand';
import Cookies from 'js-cookie';
import { User } from '@/dto';
import { user as dummy_user } from '@/pages/api/user_dummy_data';

export type AuthStore = {
    user: User | null;
    login: (user: User, token: string, expiry: number) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

export const useAuthStore = create<AuthStore>((set, get) => {
    let user = null;
    const token = Cookies.get('aH_user_session_token');
    if (token) {
        // user = dummy_user;
    }
    
    return {
    user,

    login: (user: User, token: string, expiry: number) => {
        const inOneHour = new Date(new Date().getTime() + expiry * 60 * 1000); // expiry is in minutes
        Cookies.set('aH_user_session_token', token, { expires: inOneHour });
        set({ user });
    },

    logout: () => {
        Cookies.remove('aH_user_session_token');
        set({ user: null });
    },

    isLoggedIn: () => {
        const user = get().user;
        const token = Cookies.get('aH_user_session_token');
        return !!user && !!token;
    },
}});
