import { createContext, useState } from "react";
import { ILoginData } from "../types/types";

interface IAuthContext {
  login: (data: ILoginData) => void;
  logout: () => void;
  user: ILoginData | null;
  isNaved: boolean
  setIsNaved: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IProps {
  children: React.ReactNode;
}
export const AuthContext = createContext<IAuthContext>({
  login: () => { },
  logout: () => { },
  user: null,
  isNaved: false,
  setIsNaved: () => { }
});
export const AuthProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<ILoginData | null>(() => {
    const storedUser = localStorage.getItem("user-data");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isNaved, setIsNaved] = useState(Boolean(localStorage.getItem("isNaved")) || false)

  const login = (data: ILoginData) => {
    setUser(data);
    localStorage.setItem("user-data", JSON.stringify(data));
    setTimeout(() => {
      setIsNaved(true);
      localStorage.setItem("isNaved", "true");
    }, 500)
  };
  const logout = () => {
    setUser(null);
    setIsNaved(false);
    localStorage.removeItem("user-data");
    localStorage.removeItem("isNaved")
  };
  const value = { user, login, logout, isNaved, setIsNaved };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
