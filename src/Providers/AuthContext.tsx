import { createContext, useState } from "react";
import { ILoginData } from "../types/types";

interface IAuthContext {
    login: (data: ILoginData) => void
    logout: () => void;
    user: ILoginData | null;
}

interface IProps {
    children: React.ReactNode;
}
export const AuthContext = createContext<IAuthContext>({login: () => { }, logout: () => { }, user: null});
export const AuthProvider = ({children}: IProps) => {
    const [user, setUser] = useState<ILoginData | null>(null);
    const login = (data: ILoginData) => {
        setUser(data);
    }
    const logout = () => {
        setUser(null);
    }
    const value = {user, login, logout};
    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}