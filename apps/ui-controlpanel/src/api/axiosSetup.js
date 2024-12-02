import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/e-commerce",
  headers: {
    "Content-Type": "application/json",
  },
});

export function setLogoutInterceptor(cb) {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        const errorMsg = "Session expired. Please login again.";
        if (error.response.data) {
          error.response.data.message = errorMsg;
        } else {
          error.message = errorMsg;
        }
        cb();
      }
      return Promise.reject(error);
    }
  );
}
