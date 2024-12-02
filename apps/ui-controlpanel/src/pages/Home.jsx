import React from "react";
import HomeView from "./HomeView";
import EnsureLoginStatus, {
  LoginStatus,
} from "../components/EnsureLoginStatus";

const Home = () => {
  return (
    <EnsureLoginStatus status={LoginStatus.LoggedIn}>
      <HomeView />
    </EnsureLoginStatus>
  );
};

export default Home;
