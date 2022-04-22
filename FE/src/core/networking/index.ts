import { customAxios } from "@core/networking/customAxios";
import { baseURL } from "@core/networking/env";
import axios from "axios";

type IObjAxi = {
  [key: string]: string;
} | null;

const axiosForJSON = customAxios(baseURL, "application/json");
const axiosForMultipart = customAxios(baseURL, "multipart/form-data");

export class axi {
  static get(url: string, obj: IObjAxi = null) {
    if (obj !== null) {
      return axiosForJSON.get(`${url}`, { params: obj });
    }
    return axiosForJSON.get(`${url}`);
  }

  static post(url: string, obj: IObjAxi = null) {
    if (obj !== null) {
      return axiosForJSON.post(`${url}`, obj);
    }
    return axiosForJSON.post(`${url}`);
  }

  static postMultiPart(url: string, obj: IObjAxi = null) {
    let formData = new FormData();
    if (obj !== null) {
      Object.keys(obj).forEach((k) => {
        let v = obj[k];
        formData.append(k, v);
      });
    }
    return axiosForMultipart.post(url, formData);
  }

  static delete(url: string) {
    return axiosForJSON.delete(`${url}`);
  }

  static put(url: string, obj: IObjAxi = null) {
    if (obj !== null) {
      return axiosForJSON.put(`${url}`, obj);
    }
    return axiosForJSON.put(`${url}`);
  }

  static putMultiPart(url: string, obj: IObjAxi = null) {
    let formData = new FormData();
    if (obj !== null) {
      Object.keys(obj).forEach((k) => {
        let v = obj[k];
        formData.append(k, v);
      });
    }
    axios
      .post(`${url}`, formData, {
        params: { _method: "put" },
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
}
