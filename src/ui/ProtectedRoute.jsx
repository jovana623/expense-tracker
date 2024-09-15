import { Navigate } from "react-router-dom";
import { useAuth } from "../features/authentification/useAuth";

/* eslint-disable react/prop-types */
function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
export default ProtectedRoute;
