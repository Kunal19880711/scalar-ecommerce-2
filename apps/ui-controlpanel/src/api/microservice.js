import { axiosInstance } from "./axiosSetup";

export const getAllMicroservices = async () => {
  try {
    const response = await axiosInstance.get(
      "/microservice/getAllMicroservices"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addMicroservice = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/microservice/createMicroService",
      payload
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateMicroservice = async (id, payload) => {
  try {
    const response = await axiosInstance.patch(
      `/microservice/updateMicroService/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteMicroservice = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/microservice/deleteMicroService/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
