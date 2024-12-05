import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DeleteModal from "./DeleteModal";
import SimpleTablePanel from "./SimpleTablePanel";
import { setToaster } from "../redux/toasterSlice";
import { entityChangeTypes, getToasterParams } from "../utils/utils";

const SimpleCurdView = ({
  entityName,
  tableCols,
  data,
  fetchErrMsg,
  getFormElement,
  selectedRow,
  setSelectedRow,
  onCreateOrUpdate,
  createUpdateErrMsg,
  onDelete,
  deleteErrMsg,
}) => {
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRowForDelete, setSelectedRowForDelete] = useState(null);
  const { tooltipHeight } = useSelector((store) => store.tooltipHeight);

  const onCancelEdit = () => {
    setSelectedRow(null);
  };
  const onCreateOrUpdateSubmit = async (data) => {
    const result = await onCreateOrUpdate(data);
    if (result) {
      setSelectedRow(null);
    }
    dispatch(
      setToaster(
        getToasterParams({
          entityName,
          changeType: selectedRow
            ? entityChangeTypes.UPDATE
            : entityChangeTypes.CREATE,
          success: result,
        })
      )
    );
    return result;
  };

  const onDeleteAction = async (data) => {
    setSelectedRowForDelete(data);
    setDeleteModalOpen(true);
  };

  const formElement = getFormElement({
    selectedRow,
    setSelectedRow,
    onCreateOrUpdateSubmit,
    onCancelEdit,
    createUpdateErrMsg,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: `calc(100vh - ${tooltipHeight}px)`,
      }}
    >
      <Paper
        elevation={3}
        sx={{ flexBasis: 1, m: 2, p: 2, width: { xs: "90%", md: 810 } }}
      >
        {formElement}
      </Paper>
      <Paper
        elevation={3}
        sx={{
          m: 2,
          mt: 0,
          p: 2,
          width: { xs: "90%", md: 810 },
        }}
      >
        <SimpleTablePanel
          columnList={tableCols}
          data={data}
          onSelect={setSelectedRow}
          onDeleteAction={onDeleteAction}
        />
      </Paper>
      <DeleteModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        entityName={entityName}
        onDelete={onDelete}
        selectedRowForDelete={selectedRowForDelete}
        setSelectedRowForDelete={setSelectedRowForDelete}
        deleteErrMsg={deleteErrMsg}
      />
    </Box>
  );
};

export default SimpleCurdView;
