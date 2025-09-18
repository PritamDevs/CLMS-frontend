// src/context/AuthContext.js
import { createContext, useContext, useState,useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setRole(newRole);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setToken("");
    setRole("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token,role,user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
