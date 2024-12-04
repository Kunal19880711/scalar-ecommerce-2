import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import AdminUserForm from "../components/AdminUserForm";
import AdminUserTable from "../components/AdminUserTable";

const AdminUsersView = ({
  tooltipHeight,
  data,
  fetchErrMsg,
  selectedRow,
  setSelectedRow,
  onCreateOrUpdate,
  createUpdateErrMsg,
  onDelete,
}) => {
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
        <AdminUserForm
          selectedRow={selectedRow}
          onCreateOrUpdateSubmit={onCreateOrUpdateSubmit}
          onCancelEdit={onCancelEdit}
          createUpdateErrMsg={createUpdateErrMsg}
        />
      </Paper>
      <Divider />
      <Paper
        elevation={3}
        sx={{
          m: 2,
          mt: 0,
          p: 2,
          width: { xs: "90%", md: 810 },
        }}
      >
        <AdminUserTable
          data={data}
          onSelect={setSelectedRow}
          onDelete={onDelete}
        />
      </Paper>
    </Box>
  );
};

export default AdminUsersView;
