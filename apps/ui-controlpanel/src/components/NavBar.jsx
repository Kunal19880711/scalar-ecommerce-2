import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout as apiLogout } from "../api/user";
import { logout } from "../redux/userSlice";
import { setTooltipHeight } from "../redux/tooltipHeightSlice";
import NavBarView from "./NavBarView";

const NavBar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const updateTooltipHeight = (newVal) => dispatch(setTooltipHeight(newVal));

  const onLogout = async () => {
    try {
      await apiLogout();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
  return <NavBarView onLogout={onLogout} user={user} updateTooltipHeight={updateTooltipHeight} />;
};

export default NavBar;
