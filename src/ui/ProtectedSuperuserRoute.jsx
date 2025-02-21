import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../features/authentification/useCurrentUser";
import Spinner from "./Spinner";

function ProtectedSuperuserRoute() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <Spinner />;

  if (!user || !user.is_staff) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}

export default ProtectedSuperuserRoute;
