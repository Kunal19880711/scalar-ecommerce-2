import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useData from "../hooks/useData";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import {
  addMicroservice,
  deleteMicroservice,
  getAllMicroservices,
  updateMicroservice,
} from "../api/microservice";
import MicroservicesView from "./MicroservicesView";

const Microservices = () => {
  const dispatch = useDispatch();
  const {
    data,
    error: fetchErrMsg,
    getData,
  } = useData(() => getAllMicroservices());
  const [selectedRow, setSelectedRow] = useState(null);
  const [createUpdateErrMsg, setCreateUpdateErrMsg] = useState(null);
  const [deleteErrMsg, setDeleteErrMsg] = useState(null);

  const onCreateOrUpdate = async (data) => {
    dispatch(showLoading());
    try {
      if (selectedRow === null) {
        const response = await addMicroservice(data);
      } else {
        const response = await updateMicroservice(selectedRow._id, data);
      }
      setCreateUpdateErrMsg(null);
      getData();
      return true;
    } catch (error) {
      setCreateUpdateErrMsg(error.response.data.message);
      console.log(error);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };

  const onDelete = async (data) => {
    dispatch(showLoading());
    try {
      const response = await deleteMicroservice(data._id);
      getData();
      return true;
    } catch (error) {
      setDeleteErrMsg(error.response.data.message);
      console.log(error);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <MicroservicesView
      data={data}
      fetchErrMsg={fetchErrMsg}
      selectedRow={selectedRow}
      setSelectedRow={setSelectedRow}
      onCreateOrUpdate={onCreateOrUpdate}
      createUpdateErrMsg={createUpdateErrMsg}
      onDelete={onDelete}
      deleteErrMsg={deleteErrMsg}
    />
  );
};

export default Microservices;
