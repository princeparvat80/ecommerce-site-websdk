import React, { createContext, useContext, useEffect, useState } from "react";
import { getStoredAuth, storeAuth, clearStoredAuth } from "./authStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    email: null,
  });

  // Restore auth on app load (refresh-safe)
  useEffect(() => {
    const storedAuth = getStoredAuth();
    if (storedAuth?.isAuthenticated && storedAuth.email) {
      setAuth(storedAuth);
    }
  }, []);

  const login = (email) => {
    if (auth.isAuthenticated) {
      throw new Error(
        "Another user is already logged in. Please logout first."
      );
    }

    const authData = {
      isAuthenticated: true,
      email,
      loginTimestamp: Date.now(),
    };

    setAuth(authData);
    storeAuth(authData);
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      email: null,
    });
    clearStoredAuth();
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
