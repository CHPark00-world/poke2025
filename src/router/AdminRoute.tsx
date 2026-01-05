import { Navigate } from "react-router-dom";

type ProtectedProps = {
  protect?: boolean;
  children: React.ReactNode;
};

export function ProtectedRoute({ protect = true, children }: ProtectedProps) {
  if (protect) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      <Navigate to="/login" replace />;
    }
  }
  return <>{children}</>;
}
