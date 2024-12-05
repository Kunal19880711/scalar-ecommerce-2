import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileView from "./ProfileView";
import { updateUserData } from "../redux/userSlice";
import { setToaster } from "../redux/toasterSlice";
import l10n from "../constants/l10n";
import { entityChangeTypes, getToasterParams } from "../utils/utils";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, updateUserError } = useSelector((store) => store.user);

  const updateUser = (data) => {
    if (!data.password) {
      delete data.password;
    }
    dispatch(updateUserData(data)).then((action) => {
      console.log("success", action.payload);
      dispatch(
        setToaster(
          getToasterParams({
            entityName: l10n.PROFILE_TITLE,
            changeType: entityChangeTypes.UPDATE,
            success: action.payload,
          })
        )
      );
    });
  };

  return (
    <ProfileView data={user} error={updateUserError} updateUser={updateUser} />
  );
};

export default Profile;
