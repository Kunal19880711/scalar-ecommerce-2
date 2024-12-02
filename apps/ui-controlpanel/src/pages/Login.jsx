import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LoginView from "./LoginView";
import { login } from "../api/user";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import { checkUserSession } from "../redux/userSlice";
import EnsureLoginStatus, {
  LoginStatus,
} from "../components/EnsureLoginStatus";

const Login = () => {
  const dispatch = useDispatch();
  const [apiErrorMsg, setApiErrorMsg] = useState(null);
  const onLoginSubmit = async (data) => {
    dispatch(showLoading());
    try {
      const response = await login(data);
      dispatch(checkUserSession());
    } catch (error) {
      setApiErrorMsg(error.response.data.message);
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };
  return (
    <EnsureLoginStatus status={LoginStatus.LoggedOut}>
      <LoginView onLoginSubmit={onLoginSubmit} apiErrorMsg={apiErrorMsg} />
    </EnsureLoginStatus>
  );
};

export default Login;
