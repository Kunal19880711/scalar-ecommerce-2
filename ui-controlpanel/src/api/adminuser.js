import { axiosInstance } from "./axiosSetup";

export const getAllAdmins = async () => {
  try {
    const response = await axiosInstance.get("/adminuser/getAllAdmins");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addAdmin = async (payload) => {
  try {
    const response = await axiosInstance.post("/adminuser/addAdmin", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateAdmin = async (id, payload) => {
  try {
    const response = await axiosInstance.patch(`/adminuser/updateAdmin/${id}`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAdmin = async (id) => {
  try {
    const response = await axiosInstance.delete(`/adminuser/deleteAdmin/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
