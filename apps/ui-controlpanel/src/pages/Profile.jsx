import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileView from "./ProfileView";
import { updateUserData } from "../redux/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, updateUserError } = useSelector((store) => store.user);

  const updateUser = (data) => {
    if (!data.password) {
      delete data.password;
    }
    dispatch(updateUserData(data)).then((action) => {
      console.log("success", action.payload);
    });
  };

  return (
    <ProfileView data={user} error={updateUserError} updateUser={updateUser} />
  );
};

export default Profile;
