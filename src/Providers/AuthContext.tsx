import { createContext, useState } from "react";
import { ILoginData } from "../types/types";

interface IAuthContext {
  login: (data: ILoginData) => void;
  logout: () => void;
  user: ILoginData | null;
}

interface IProps {
  children: React.ReactNode;
}
export const AuthContext = createContext<IAuthContext>({
  login: () => {},
  logout: () => {},
  user: null,
});
export const AuthProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<ILoginData | null>(() => {
    const storedUser = localStorage.getItem("user-data");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (data: ILoginData) => {
    setUser(data);
    localStorage.setItem("user-data", JSON.stringify(data));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user-data");
  };
  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
