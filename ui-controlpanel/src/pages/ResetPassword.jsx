import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ResetPasswordView from "./ResetPasswordView";
import { forgotPassword, resetPassword } from "../api/user";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import EnsureLoginStatus, {
  LoginStatus,
} from "../components/EnsureLoginStatus";

const ResetPassword = () => {
  const dispatch = useDispatch();

  const [apiGenerateOtpErrMsg, setApiGenerateOtpErrMsg] = useState(null);
  const [apiResetPassErrorMsg, setApiResetPassErrorMsg] = useState(null);

  const onGenereteOtp = async (data) => {
    dispatch(showLoading());
    try {
      const response = await forgotPassword(data);
    } catch (error) {
      console.log(error);
      setApiGenerateOtpErrMsg(error.response.data.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  const onResetPassSubmit = async (data) => {
    dispatch(showLoading());
    try {
      const response = await resetPassword(data);
    } catch (error) {
      console.log(error);
      setApiResetPassErrorMsg(error.response.data.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <EnsureLoginStatus status={LoginStatus.LoggedOut}>
      <ResetPasswordView
        onGenereteOtp={onGenereteOtp}
        apiGenerateOtpErrMsg={apiGenerateOtpErrMsg}
        onResetPassSubmit={onResetPassSubmit}
        apiResetPassErrorMsg={apiResetPassErrorMsg}
      />
    </EnsureLoginStatus>
  );
};

export default ResetPassword;
