import { useState } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/loaderSlice";

const defaultOps = { defaultValue: [] };

const useFetchData = (dataFetcher, options = {}) => {
  const { defaultValue } = { ...defaultOps, ...options };
  const dispatch = useDispatch();
  const [data, setData] = useState(defaultValue);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await dataFetcher();
      const data = Array.isArray(response?.data)
        ? response?.data.map((entity) => ({
            ...entity,
            key: entity._id,
          }))
        : response?.data;
      setData(data);
      setError(null);
    } catch (err) {
      setData(defaultValue);
      setError(error.response.data.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  return { data, error, getData };
};

export default useFetchData;
