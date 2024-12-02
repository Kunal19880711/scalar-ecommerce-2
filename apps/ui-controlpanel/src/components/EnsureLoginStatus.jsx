import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paths from "../constants/Paths";

export const LoginStatus = {
  LoggedIn: true,
  LoggedOut: false,
};

const EnsureLoginStatus = ({ status, children }) => {
  const navigate = useNavigate();
  const { user, initializing } = useSelector((store) => store.user);
  useEffect(() => {
    if (initializing) {
      return;
    }
    if (user) {
      if (status === LoginStatus.LoggedOut) {
        navigate(Paths.Home);
      }
    } else if (status === LoginStatus.LoggedIn) {
      navigate(Paths.Login);
    }
  }, [user, initializing]);
  return <>{children}</>;
};

export default EnsureLoginStatus;
