import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoadingAuth } = useContext(AuthContext);

  if (isLoadingAuth) return <div className="text-center mt-10">Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};
