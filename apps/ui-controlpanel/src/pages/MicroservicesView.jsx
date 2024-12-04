import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MicroserviceForm from "../components/MicroservicesForm";
import MicroserviceTable from "../components/MicroservicesTable";

const MicroservicesView = ({
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
        <MicroserviceForm
          selectedRow={selectedRow}
          onCreateOrUpdateSubmit={onCreateOrUpdateSubmit}
          onCancelEdit={onCancelEdit}
          createUpdateErrMsg={createUpdateErrMsg}
        />
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
        <MicroserviceTable
          data={data}
          onSelect={setSelectedRow}
          onDelete={onDelete}
        />
      </Paper>
    </Box>
  );
};

export default MicroservicesView;
