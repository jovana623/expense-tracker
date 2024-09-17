import { Navigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  console.log(token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
export default ProtectedRoute;
