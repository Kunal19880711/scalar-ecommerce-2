import React from "react";
import { Outlet } from "react-router-dom";

const HomeView = () => {
  return (
    <>
      <div>HomeView</div>
      <Outlet />
    </>
  );
};

export default HomeView;
