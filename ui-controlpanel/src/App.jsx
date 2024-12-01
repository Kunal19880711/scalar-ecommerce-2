import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Paths from "./constants/Paths";
import UserSession from "./components/UserSession";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import AdminUsers from "./pages/AdminUsers";
import Microservices from "./pages/Microservices";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <UserSession />
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path={Paths.Home} element={<Home />}>
            <Route path={Paths.AdminUser} element={<AdminUsers />} />
            <Route path={Paths.MicroServices} element={<Microservices />} />
            <Route path={Paths.Profile} element={<Profile />} />
          </Route>
          <Route path={Paths.Login} element={<Login />} />
          <Route path={Paths.ResetPassword} element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
