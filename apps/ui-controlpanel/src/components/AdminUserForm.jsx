import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";

import l10n from "../constants/l10n";
import FormBox from "./FormBox";

const initialValue = {
  name: "",
  email: "",
  password: "",
};

const AdminUserForm = ({
  selectedRow,
  onCreateOrUpdateSubmit,
  onCancelEdit,
  createUpdateErrMsg,
}) => {
  const isNew = selectedRow === null;
  const formShape = {
    name: yup.string().required(l10n.ADMINUSER_FORM_NAME_ERR_MSG),
    email: yup.string().email().required(l10n.ADMINUSER_FORM_EMAIL_ERR_MSG),
  };
  if (isNew) {
    formShape.password = yup
      .string()
      .required(l10n.ADMINUSER_FORM_PASSWORD_ERR_MSG);
  }
  const schema = yup.object().shape(formShape);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onFormSubmit = async (data) => {
    const result = await onCreateOrUpdateSubmit(data);
    if (result) {
      reset(initialValue);
    }
  };

  const onCancel = () => {
    if (selectedRow === null) {
      reset(initialValue);
    } else {
      onCancelEdit();
    }
  };

  useEffect(() => {
    const newValues = selectedRow || initialValue;
    reset(newValues);
  }, [selectedRow]);

  return (
    <Box
      component="form"
      style={{
        display: "flex",
        gap: "1em",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <Typography variant="h5" component="h1">
        {isNew
          ? l10n.ADMINUSER_FORM_TITLE_CREATE_ADMIN
          : l10n.ADMINUSER_FORM_TITLE_UPDATE_ADMIN}
      </Typography>
      <FormBox fullWidth>
        <InputLabel required>{l10n.ADMINUSER_FORM_NAME_LABEL}</InputLabel>
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
        <InputLabel required>{l10n.ADMINUSER_FORM_EMAIL_LABEL}</InputLabel>
        <TextField
          variant="standard"
          type="email"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </FormBox>
      {isNew && (
        <FormBox fullWidth>
          <InputLabel required>{l10n.ADMINUSER_FORM_PASSWORD_LABEL}</InputLabel>
          <TextField
            variant="standard"
            type="password"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </FormBox>
      )}
      {createUpdateErrMsg && (
        <Typography variant="body1" color="error">
          {createUpdateErrMsg}
        </Typography>
      )}
      <Box sx={{ display: "flex", gap: "1em", width: "100%" }}>
        <Button fullWidth variant="contained" type="submit">
          {isNew
            ? l10n.ADMINUSER_FORM_CREATE_BTN_LABEL
            : l10n.ADMINUSER_FORM_UPDATE_BTN_LABEL}
        </Button>
        <Button fullWidth variant="outlined" type="button" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AdminUserForm;
