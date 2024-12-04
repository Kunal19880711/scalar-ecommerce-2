import React, { useEffect, useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import l10n from "../constants/l10n";

const MicroservicesTable = ({ data, onSelect, onDelete }) => {
  const tableParent = useRef(null);
  const [tableHeight, setTableHeight] = useState(500); // a ball park value
  const paginationModel = { page: 0, pageSize: 10 };
  const columns = [
    {
      field: "serviceName",
      headerName: l10n.MICROSERVICE_TABLE_COL_SERVICE_NAME,
      width: 150,
    },
    {
      field: "serviceUrl",
      headerName: l10n.MICROSERVICE_TABLE_COL_SERVICE_URL,
      flex: 1,
    },
    {
      field: "action",
      headerName: l10n.COL_ACTIONS,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "0.5em" }}>
          <IconButton
            color="primary"
            onClick={() => {
              onSelect(params.row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              onDelete(params.row);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
      width: 150,
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSelector: true,
    },
  ];

  useEffect(() => {
    if (tableParent.current) {
      setTableHeight(
        tableParent.current.offsetHeight +
          window.innerHeight -
          document.body.scrollHeight
      );
    }
  }, [data]);
  return (
    <Box
      sx={{ width: "100%", minWidth: 500, height: `${tableHeight}px` }}
      ref={tableParent}
    >
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 20, 50]}
        sx={{ border: 0 }}
        disableRowSelectionOnClick
        disableSelectionOnClick
      />
    </Box>
  );
};

export default MicroservicesTable;
