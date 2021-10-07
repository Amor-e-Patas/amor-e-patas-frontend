import { createContext, useState, useEffect, ReactNode } from "react";
import { verifyAdm, verifyToken } from "../services/login";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  isAuthenticated: boolean;
  isAdm: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isAdm, setIsAdm] = useState(true);

  useEffect(() => {
    async function fetchAPI(){
      try{
        await verifyToken();
        setIsAuthenticated(true);
      } catch (err){
        setIsAuthenticated(false);
      }
    }
    fetchAPI();
  }, []);

  useEffect(() => {
    async function fetchAPI(){
      try{
        await verifyAdm();
        setIsAdm(true);
      } catch (err){
        setIsAdm(false);
      }
    }

    fetchAPI();
  }, []);

  return (
    <AuthContext.Provider
      value={
        {
          isAdm,
          isAuthenticated,
          setIsAuthenticated
        }
      }
    >
      {children}
    </AuthContext.Provider>
  )
}