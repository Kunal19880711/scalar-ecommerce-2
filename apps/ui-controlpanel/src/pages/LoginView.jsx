import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import LoginPanel from "../components/LoginPanel";
import l10n from "../constants/l10n";
import Paths from "../constants/Paths";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(l10n.LOGIN_EMAIL_ERR_MSG),
  password: yup.string().required(l10n.LOGIN_PASS_ERR_MSG),
});

const LoginView = ({ onLoginSubmit, apiErrorMsg }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

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
        onSubmit={handleSubmit(onLoginSubmit)}
      >
        <Typography variant="h4" component="h1">
          {l10n.LOGIN_TITLE}
        </Typography>
        <TextField
          variant="standard"
          type="email"
          fullWidth
          label={l10n.LOGIN_EMAIL_LABEL}
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          variant="standard"
          type="password"
          fullWidth
          label={l10n.LOGIN_PASSWORD_LABEL}
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button fullWidth variant="contained" type="submit">
          {l10n.LOGIN_BTN_LABEL}
        </Button>
        {apiErrorMsg && (
          <Typography variant="caption" color="error">
            {apiErrorMsg}
          </Typography>
        )}
        <Link component={RouterLink} to={Paths.ResetPassword}>
          {l10n.LOGIN_RESET_PASSWORD}
        </Link>
      </Box>
    </LoginPanel>
  );
};

export default LoginView;
