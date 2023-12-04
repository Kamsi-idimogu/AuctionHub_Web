import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/contexts/authContext';
import { useEffect } from 'react';
import { USER_ACCOUNT } from '@/store/cache/cacheKeys';
import { User } from '@/dto';
import Cookies from 'js-cookie';
import { getItemFromCache } from '@/store/cache/cache';
import { useAuthStore } from '@/store/authStore';

export default function App({ Component, pageProps }: AppProps) {
  const { rehydrate, logout } = useAuthStore();

  useEffect(() => {
    let user: User | null = null;
    const token = Cookies.get('aH_user_session_token');
    if (token) {
        user = getItemFromCache(USER_ACCOUNT);
        if (user){
          rehydrate(user, token);
        } else {
          logout();
        }
    }
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
