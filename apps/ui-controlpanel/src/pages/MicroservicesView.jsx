import React from "react";
import MicroserviceForm from "../components/MicroservicesForm";
import SimpleCurdView from "../components/SimpleCurdView";
import l10n from "../constants/l10n";

const tableCols = [
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
];

const MicroservicesView = ({
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
    <MicroserviceForm
      selectedRow={selectedRow}
      setSelectedRow={setSelectedRow}
      onCreateOrUpdateSubmit={onCreateOrUpdateSubmit}
      onCancelEdit={onCancelEdit}
      createUpdateErrMsg={createUpdateErrMsg}
    />
  );

  return (
    <SimpleCurdView
    entityName={l10n.MICROSERVICE_ENTITY_NAME}
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

export default MicroservicesView;
