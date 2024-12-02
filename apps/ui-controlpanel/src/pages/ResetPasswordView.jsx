import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoginPanel from "../components/LoginPanel";
import l10n from "../constants/l10n";
import Paths from "../constants/Paths";
import Link from "@mui/material/Link";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(l10n.RESET_PASS_EMAIL_ERR_MSG),
  otp: yup.string().required(l10n.RESET_PASS_OTP_ERR_MSG),
  password: yup.string().required(l10n.RESET_PASS_PASS_ERR_MSG),
});
const FIELD_EMAIL = "email";

const ResetPasswordView = ({
  onGenereteOtp,
  apiGenerateOtpErrMsg,
  onResetPassSubmit,
  apiResetPassErrorMsg,
}) => {
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onGenereteOtpClick = async () => {
    const result = await trigger([FIELD_EMAIL]);
    if (result) {
      onGenereteOtp({ email: getValues(FIELD_EMAIL) });
    }
  };

  return (
    <LoginPanel>
      <Box
        component="form"
        style={{
          display: "flex",
          gap: "2em",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
        onSubmit={handleSubmit(onResetPassSubmit)}
      >
        <Typography variant="h4" component="h1">
          {l10n.RESET_PASS_TITLE}
        </Typography>
        <TextField
          variant="standard"
          type={FIELD_EMAIL}
          fullWidth
          label={l10n.RESET_PASS_EMAIL_LABEL}
          {...register(FIELD_EMAIL)}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Button fullWidth variant="contained" onClick={onGenereteOtpClick}>
          {l10n.RESET_PASS_GENERATE_OTP_BTN_LABEL}
        </Button>
        {apiGenerateOtpErrMsg && (
          <Typography variant="body1" color="error">
            {apiGenerateOtpErrMsg}
          </Typography>
        )}
        <TextField
          variant="standard"
          type="text"
          fullWidth
          label={l10n.RESET_PASS_OTP_LABEL}
          {...register("otp")}
          error={!!errors.otp}
          helperText={errors.otp?.message}
        />
        <TextField
          variant="standard"
          type="password"
          fullWidth
          label={l10n.RESET_PASS_PASSWORD_LABEL}
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button fullWidth variant="contained" type="submit">
          {l10n.RESET_PASS_BTN_LABEL}
        </Button>
        {apiResetPassErrorMsg && (
          <Typography variant="body1" color="error">
            {apiResetPassErrorMsg}
          </Typography>
        )}
        <Link to={Paths.Login} component={RouterLink}>
          {l10n.RESET_PASS_LOGIN_HERE}
        </Link>
      </Box>
    </LoginPanel>
  );
};

export default ResetPasswordView;
