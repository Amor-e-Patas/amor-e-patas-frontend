import { createContext, useState, useEffect, ReactNode } from "react";
import { verifyToken } from "../services/login";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
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

  return (
    <AuthContext.Provider
      value={
        {
          isAuthenticated,
          setIsAuthenticated
        }
      }
    >
      {children}
    </AuthContext.Provider>
  )
}