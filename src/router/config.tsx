import type { RouteObject } from "react-router-dom";
import HomePage from "../pages/Home";
import Login from "../pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
];

export default routes;
