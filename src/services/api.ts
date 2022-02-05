import axios from "axios";
import { getToken } from "./auth";


const api = axios.create({
    baseURL: "https://agility-ecommerce-api.herokuapp.com/",
 
});

const integrador = axios.create({
    baseURL: "https://agility-ecommerce-api.herokuapp.com/",
    headers: {
      Authorization:'Client-ID 51ea2b9cfb2560e',
      Accept: "application/json",
      'Access-Control-Allow-Origin': 'https://agility-ecommerce-api.herokuapp.com/',
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
export {integrador};
