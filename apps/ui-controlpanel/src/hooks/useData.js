import { useEffect } from "react";
import useFetchData from "./useFetchData";

const defaultOps = { deps: [], defaultValue: [] };

const useData = (dataFetcher, options = {}) => {
  const { deps, defaultValue } = { ...defaultOps, ...options };
  const { data, error, getData } = useFetchData(dataFetcher, { defaultValue });

  useEffect(() => {
    getData();
  }, deps);

  return { data, error, getData };
};

export default useData;
