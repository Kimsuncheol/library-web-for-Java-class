import React, { createContext, useContext, useState, useEffect } from "react";
import {
  loginAPI,
  logoutAPI,
  registerAPI,
  LoginParams,
  RegisterParams,
  LogoutParams,
} from "../api/authService";
import { User } from "../types/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: User | null;
  login: (params: LoginParams) => Promise<void>;
  logout: (params: LogoutParams) => Promise<void>;
  register: (params: RegisterParams) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", String(isAuthenticated));
  }, [isAuthenticated]);

  const login = async (params: LoginParams) => {
    setIsLoading(true);
    try {
      await loginAPI(params);
      setCurrentUser({
        id: params.id,
        name: "User",
        email: "",
        password: "",
        isAdmin: false,
      });

      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (params: LogoutParams) => {
    setIsLoading(true);
    try {
      await logoutAPI(params);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsAuthenticated(false);
      setCurrentUser(null);
      localStorage.removeItem("isAuthenticated");
      setIsLoading(false);
    }
  };

  const register = async (params: RegisterParams) => {
    setIsLoading(true);
    try {
      await registerAPI(params);
      // Optional: Auto-login after register or just close modal
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        currentUser,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
