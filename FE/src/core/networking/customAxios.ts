import axios from "axios";
import queryString from "query-string";

export const customAxios = (baseURL: string, contentType: string) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": contentType,
    },
    paramsSerializer: (params) => queryString.stringify(params),
  });
  axiosInstance.interceptors.request.use(async (config) => {
    return config;
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return response.data;
      }
      return response;
    },
    (error) => {
      throw error;
    }
  );
  return axiosInstance;
};
