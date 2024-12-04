import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [selectedRow, setSelectedRow] = useState(null);
  const { data, error, getData } = useData(() => getAllAdmins());
  const { tooltipHeight } = useSelector((store) => store.tooltipHeight);
  const [createUpdateErrMsg, setCreateUpdateErrMsg] = useState(null);

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
    } catch (error) {
      setCreateUpdateErrMsg(error.response.data.message);
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <AdminUsersView
      tooltipHeight={tooltipHeight}
      data={data}
      fetchErrMsg={error}
      selectedRow={selectedRow}
      setSelectedRow={setSelectedRow}
      onCreateOrUpdate={onCreateOrUpdate}
      createUpdateErrMsg={createUpdateErrMsg}
      onDelete={onDelete}
    />
  );
};

export default AdminUsers;
