import {
    createContext,
    useContext,
    useState,
    useEffect,
} from 'react';
import { User } from '@/dto';

export type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext)!;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }:AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        // check if user session exists
    }, []);

    const login = (username: string, password: string) => {
        // TODO: login user


        setIsLoggedIn(true);
    }

    const logout = () => {
        // TODO: logout user


        setUser(null);
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token: null,
                login,
                logout,
                isLoggedIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
