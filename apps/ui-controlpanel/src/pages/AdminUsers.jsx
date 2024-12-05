import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useData from "../hooks/useData";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import AdminUsersView from "./AdminUsersView";
import {
  addAdmin,
  deleteAdmin,
  getAllAdmins,
  updateAdmin,
} from "../api/adminuser";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { data, error: fetchErrMsg, getData } = useData(() => getAllAdmins());
  const [selectedRow, setSelectedRow] = useState(null);
  const [createUpdateErrMsg, setCreateUpdateErrMsg] = useState(null);
  const [deleteErrMsg, setDeleteErrMsg] = useState(null);

  const onCreateOrUpdate = async (data) => {
    dispatch(showLoading());
    try {
      if (selectedRow === null) {
        const response = await addAdmin(data);
      } else {
        delete data["password"];
        const response = await updateAdmin(selectedRow._id, data);
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
      const response = await deleteAdmin(data._id);
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
    <AdminUsersView
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

export default AdminUsers;
