import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setInitializing, checkUserSession } from "../redux/userSlice";
import { setLogoutInterceptor } from "../api/axiosSetup";

const UserSession = ({ children }) => {
  const { user, initializing } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // check for already existing session
  useEffect(() => {
    dispatch(checkUserSession()).finally(() => {
      dispatch(setInitializing(false));
    });
  }, []);

  // setting logout interceptor
  useEffect(() => {
    if (initializing) {
      return;
    }
    setLogoutInterceptor(() => {
      if (user) {
        dispatch(logout());
      }
    });
  }, [initializing]);

  return <>{children}</>;
};

export default UserSession;
