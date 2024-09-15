import { useQueryClient } from "@tanstack/react-query";
import { createContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

/* eslint-disable react/prop-types */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const queryClient = useQueryClient();

  const login = (data) => {
    setToken(data.access);
    localStorage.setItem("token", data.access);
    axiosInstance.defaults.headers.Authorization = `Bearer ${data.access}`;
    setUser(data.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    axiosInstance.defaults.headers.Authorization = null;
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
