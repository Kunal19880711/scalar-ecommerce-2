import { axiosInstance } from "./axiosSetup";

export const getAllMicroServices = async () => {
  try {
    const response = await axiosInstance.get("/microservice/getAllMicroServices");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createMicroService = async (payload) => {
  try {
    const response = await axiosInstance.post("/microservice/createMicroService", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateMicroService = async (id, payload) => {
  try {
    const response = await axiosInstance.patch(`/microservice/updateMicroService/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteMicroService = async (id) => {
  try {
    const response = await axiosInstance.delete(`/microservice/deleteMicroService/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
