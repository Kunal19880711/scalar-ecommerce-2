import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Toolbar from "@mui/material/Toolbar";

const HomeView = () => {
  return (
    <>
      <NavBar />
      <Toolbar />
      <Outlet />
    </>
  );
};

export default HomeView;
