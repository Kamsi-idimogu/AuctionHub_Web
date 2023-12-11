// import {
//     createContext,
//     useContext,
//     useState,
//     useEffect,
// } from 'react';
// import { User } from '@/dto';

// export type AuthContextType = {
//     user: User | null;
//     token: string | null;
//     login: (username: string, password: string) => void;
//     logout: () => void;
//     isLoggedIn: boolean;
// };

// interface AuthProviderProps {
//     children: React.ReactNode;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const useAuth = () => useContext(AuthContext)!;

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }:AuthProviderProps) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//     useEffect(() => {
//         // check if user session exists
//     }, []);

//     const login = (username: string, password: string) => {
//         // TODO: login user


//         setIsLoggedIn(true);
//     }

//     const logout = () => {
//         // TODO: logout user


//         setUser(null);
//         setIsLoggedIn(false);
//     }

//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 token: null,
//                 login,
//                 logout,
//                 isLoggedIn,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// }


import React from 'react';
import { useAuthStore, AuthStore } from '../store/authStore';

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = React.createContext<AuthStore | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const user = useAuthStore(state => state.user);
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);
  const rehydrate = useAuthStore(state => state.rehydrate);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, rehydrate }}>
      {children}
    </AuthContext.Provider>
  );
};
