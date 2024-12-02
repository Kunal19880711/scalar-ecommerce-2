import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout as apiLogout } from "../api/user";
import { logout } from "../redux/userSlice";
import NavBarView from "./NavBarView";

const NavBar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const onLogout = async () => {
    try {
      await apiLogout();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
  return <NavBarView onLogout={onLogout} user={user} />;
};

export default NavBar;
