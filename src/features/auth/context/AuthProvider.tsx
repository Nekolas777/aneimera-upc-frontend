import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsLogged(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  // proveemos un estado global que nos permitira verificar si el usuario se encuentra
  // logeado, ademas de login y logout para acceder a los metodos de forma global
  return (
    <AuthContext.Provider
      value={{
        isLogged,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
