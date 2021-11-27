import axios from "axios";
import { getToken } from "./auth";


const api = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
      Authorization:'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MzYxNjM2ODE5NDY1fQ.ehj0iKuf95ZUvqfInm2Mm99E4SaPIErxhQdEny4UnSlFnDW-F9md-baDHxsLeOq3dDzzmrl72ssdsH7FzyR4Ow',
      Accept: "application/json",
    }
 
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
