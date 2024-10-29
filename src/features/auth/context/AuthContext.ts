import { createContext } from "react";

interface AuthContextProps {
  isLogged: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);