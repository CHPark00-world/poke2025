import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ROUTE from "./constants/route.js";
import Landing from "./pages/landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import { AuthProvider } from "./contexts/AuthContexts.jsx";
import Quiz from "./pages/Quiz.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path={ROUTE.LANDING} element={<Landing />} />
            <Route path={ROUTE.LOGIN} element={<Login />} />
            <Route path={ROUTE.SIGNUP} element={<Signup />} />
            <Route path={ROUTE.HOME} element={<Home />} />
            <Route path={ROUTE.DETAIL()} element={<Detail />} />
            <Route path={ROUTE.QUIZ} element={<Quiz />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
