import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";
import ROUTE from "../constants/route";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">로딩 중 ...</div>;
  }

  if (!user) {
    return <Navigate to={ROUTE.LOGIN} replace />;
  }

  return <Outlet />;
}
