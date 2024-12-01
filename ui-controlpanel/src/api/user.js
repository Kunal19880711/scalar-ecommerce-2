import { axiosInstance } from "./axiosSetup";

export const login = async (value) => {
  try {
    const response = await axiosInstance.post("/user/login", value);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/user/logout");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const viewCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/user/viewCurrentUser");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCurrentUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/user/updateCurrentUser",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const forgotPassword = async (payload) => {
  try {
    const response = await axiosInstance.post("/user/forgotPassword", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const resetPassword = async (payload) => {
  try {
    const response = await axiosInstance.post("/user/resetPassword", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
