import axios from "axios";
import { getToken } from "./auth";


const api = axios.create({
    baseURL: "http://localhost:8080/",
 
});

const integrador = axios.create({
    baseURL: "http://localhost:5000/",
});

const imgur = axios.create({
  baseURL: "",
  headers: {
    Authorization:'Client-ID 51ea2b9cfb2560e',
    Accept: "application/json",
  }

});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
});


export {api};
export {imgur};
export {integrador};
