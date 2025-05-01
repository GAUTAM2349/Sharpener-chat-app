// AuthContext.js
import { createContext, useState, useEffect } from "react";
import api from "../config/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [loggedinUser, setLoggedinUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/user/login-status"); // Replace with your actual endpoint
        setIsAuthenticated(true);
        const user = response.data.userId;
        console.log("inside user context userid is ",user)
        setLoggedinUser(user);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsLoadingAuth(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoadingAuth, loggedinUser }}>
      {children}
    </AuthContext.Provider>
  );
};
