import { useContext } from "react";
import { AuthContext } from "../Providers/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  if (!allowedRoles.includes(user.role.toUpperCase())) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
