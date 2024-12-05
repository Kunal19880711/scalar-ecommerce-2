import React from "react";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { setToaster } from "../redux/toasterSlice";
import { entityChangeTypes, getToasterParams } from "../utils/utils";
import l10n from "../constants/l10n";

const DeleteModal = ({
  open,
  setOpen,
  entityName,
  onDelete,
  selectedRowForDelete,
  setSelectedRowForDelete,
  deleteErrMsg,
}) => {
  const title = l10n.DELETE_MODAL_TITLE.replace("{ENTITY_NAME}", entityName);
  const msg = l10n.DELETE_MODAL_MSG.replace("{ENTITY_NAME}", entityName);
  const dispatch = useDispatch();

  const onConfirm = async () => {
    const result = await onDelete(selectedRowForDelete);
    if (result) {
      setSelectedRowForDelete(null);
      setOpen(false);
    }
    dispatch(
      setToaster(
        getToasterParams({
          entityName,
          changeType: entityChangeTypes.DELETE,
          success: result,
        })
      )
    );
  };

  const onCancel = () => {
    setSelectedRowForDelete(null);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{msg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="warning" onClick={onConfirm}>
          {l10n.DELETE_MODAL_DELETE_BTN_LABEL}
        </Button>
        <Button onClick={onCancel} autoFocus>
          {l10n.DELETE_MODAL_CANCEL_BTN_LABEL}
        </Button>
      </DialogActions>
      {deleteErrMsg && (
        <Typography variant="body1" color="error">
          {deleteErrMsg}
        </Typography>
      )}
    </Dialog>
  );
};

export default DeleteModal;
