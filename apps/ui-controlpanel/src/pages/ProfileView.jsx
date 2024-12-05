import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";

import FormBox from "../components/FormBox";
import l10n from "../constants/l10n";

const schema = yup.object().shape({
  name: yup.string().required(l10n.PROFILE_NAME_ERR_MSG),
  email: yup
    .string()
    .email(l10n.PROFILE_VALID_EMAIL_ERR_MSG)
    .required(l10n.PROFILE_EMAIL_ERR_MSG),
  password: yup.string(),
});

const ProfileView = ({ data, error, updateUser }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onCancel = () => {
    reset(data);
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  return (
    data && (
      <Paper
        elevation={3}
        sx={{
          flexBasis: 1,
          m: 2,
          ml: "auto",
          mr: "auto",
          p: 2,
          width: { xs: "90%", md: 810 },
        }}
      >
        <Box
          component="form"
          style={{
            display: "flex",
            gap: "1em",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
          onSubmit={handleSubmit(updateUser)}
        >
          <Typography variant="h5" component="h1">
            {l10n.PROFILE_TITLE}
          </Typography>
          <FormBox fullWidth>
            <InputLabel required>{l10n.PROFILE_NAME_LABEL}</InputLabel>
            <TextField
              variant="standard"
              type="text"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </FormBox>
          <FormBox fullWidth>
            <InputLabel required>{l10n.PROFILE_EMAIL_LABEL}</InputLabel>
            <TextField
              variant="standard"
              type="email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </FormBox>

          <FormBox fullWidth>
            <InputLabel>{l10n.PROFILE_PASSWORD_LABEL}</InputLabel>
            <TextField
              variant="standard"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </FormBox>
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
          <Box sx={{ display: "flex", gap: "1em", width: "100%" }}>
            <Button fullWidth variant="contained" type="submit">
              {l10n.PROFILE_UPDATE_BTN_LABEL}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              type="button"
              onClick={onCancel}
            >
              {l10n.CANCEL_BTN_LABEL}
            </Button>
          </Box>
        </Box>
      </Paper>
    )
  );
};

export default ProfileView;
