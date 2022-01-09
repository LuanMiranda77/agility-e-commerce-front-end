import { ICliente } from "../../domain/types/ICliente";
import { UtilsDate } from "../../utils/utilsDate";
import { api } from "../api";

/**
*@Author
*@Issue
*/
export class UsuarioService {

    //end-point da api
    url='api/usuario';

    //modelo de request post
    async post(pEntity: ICliente){
      pEntity.dataNascimento = UtilsDate.formatByYYYYMMDDSemHora(pEntity.dataNascimento);
      console.log(pEntity);
      let user = {...pEntity.usuario};
      const response = await api.post(this.url, pEntity).then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error.response.data);
            return Promise.reject(error.response.data[0]);
        });;
      return response;
    }

    //modelo de request get
    async get(){
      const response = await api.get(this.url).then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error.response.data);
            return Promise.reject(error.response.data[0]);
        });;
      return response;
    }
    
  
}