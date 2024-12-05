import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DeleteModal from "./DeleteModal";
import SimpleTablePanel from "./SimpleTablePanel";
import l10n from "../constants/l10n";

const SimpleCurdView = ({
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
        entityName={l10n.ADMINUSER_ENTITY_NAME}
        onDelete={onDelete}
        selectedRowForDelete={selectedRowForDelete}
        setSelectedRowForDelete={setSelectedRowForDelete}
        deleteErrMsg={deleteErrMsg}
      />
    </Box>
  );
};

export default SimpleCurdView;
