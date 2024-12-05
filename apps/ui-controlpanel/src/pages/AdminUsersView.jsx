import React from "react";
import AdminUserForm from "../components/AdminUserForm";
import SimpleCurdView from "../components/SimpleCurdView";
import l10n from "../constants/l10n";

const tableCols = [
  { field: "name", headerName: l10n.ADMINUSER_TABLE_COL_NAME, width: 150 },
  { field: "email", headerName: l10n.ADMINUSER_TABLE_COL_EMAIL, flex: 1 },
];

const AdminUsersView = ({
  data,
  fetchErrMsg,
  selectedRow,
  setSelectedRow,
  onCreateOrUpdate,
  createUpdateErrMsg,
  onDelete,
  deleteErrMsg,
}) => {
  const getFormElement = ({
    selectedRow,
    setSelectedRow,
    onCreateOrUpdateSubmit,
    onCancelEdit,
    createUpdateErrMsg,
  }) => (
    <AdminUserForm
      selectedRow={selectedRow}
      setSelectedRow={setSelectedRow}
      onCreateOrUpdateSubmit={onCreateOrUpdateSubmit}
      onCancelEdit={onCancelEdit}
      createUpdateErrMsg={createUpdateErrMsg}
    />
  );

  return (
    <SimpleCurdView
      entityName={l10n.ADMINUSER_ENTITY_NAME}
      tableCols={tableCols}
      data={data}
      fetchErrMsg={fetchErrMsg}
      getFormElement={getFormElement}
      selectedRow={selectedRow}
      setSelectedRow={setSelectedRow}
      onCreateOrUpdate={onCreateOrUpdate}
      createUpdateErrMsg={createUpdateErrMsg}
      onDelete={onDelete}
      deleteErrMsg={deleteErrMsg}
    />
  );
};

export default AdminUsersView;
