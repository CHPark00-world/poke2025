import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ROUTE from "./constants/route";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { AuthProvider } from "./contexts/AuthContexts";
import Quiz from "./pages/Quiz";
import { ProtectedRoute } from "./router/ProtectedRoute";
import Notfound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={ROUTE.LANDING} element={<Landing />} />
          <Route path={ROUTE.LOGIN} element={<Login />} />
          <Route path={ROUTE.SIGNUP} element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTE.HOME} element={<Home />} />
            <Route path={ROUTE.DETAIL_PATH} element={<Detail />} />
            <Route path={ROUTE.QUIZ} element={<Quiz />} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
