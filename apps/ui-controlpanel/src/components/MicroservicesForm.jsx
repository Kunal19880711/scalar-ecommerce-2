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
  serviceName: "",
  serviceUrl: "",
};

const schema = yup.object().shape({
  serviceName: yup
    .string()
    .required(l10n.MICROSERVICE_FORM_SERVICE_NAME_ERR_MSG),
  serviceUrl: yup.string().required(l10n.MICROSERVICE_FORM_SERVICE_URL_ERR_MSG),
});

const MicroservicesForm = ({
  selectedRow,
  onCreateOrUpdateSubmit,
  onCancelEdit,
  createUpdateErrMsg,
}) => {
  const isNew = selectedRow === null;
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
          ? l10n.MICROSERVICE_FORM_TITLE_CREATE_MICROSERVICE
          : l10n.MICROSERVICE_FORM_TITLE_UPDATE_MICROSERVICE}
      </Typography>
      <FormBox fullWidth>
        <InputLabel required>
          {l10n.MICROSERVICE_FORM_SERVICE_NAME_LABEL}
        </InputLabel>
        <TextField
          variant="standard"
          type="text"
          fullWidth
          {...register("serviceName")}
          error={!!errors.serviceName}
          helperText={errors.serviceName?.message}
        />
      </FormBox>
      <FormBox fullWidth>
        <InputLabel required>
          {l10n.MICROSERVICE_FORM_SERVICE_URL_LABEL}
        </InputLabel>
        <TextField
          variant="standard"
          type="text"
          fullWidth
          {...register("serviceUrl")}
          error={!!errors.serviceUrl}
          helperText={errors.serviceUrl?.message}
        />
      </FormBox>
      {createUpdateErrMsg && (
        <Typography variant="body1" color="error">
          {createUpdateErrMsg}
        </Typography>
      )}
      <Box sx={{ display: "flex", gap: "1em", width: "100%" }}>
        <Button fullWidth variant="contained" type="submit">
          {isNew
            ? l10n.MICROSERVICE_FORM_CREATE_BTN_LABEL
            : l10n.MICROSERVICE_FORM_UPDATE_BTN_LABEL}
        </Button>
        <Button fullWidth variant="outlined" type="button" onClick={onCancel}>
          {l10n.CANCEL_BTN_LABEL}
        </Button>
      </Box>
    </Box>
  );
};

export default MicroservicesForm;
