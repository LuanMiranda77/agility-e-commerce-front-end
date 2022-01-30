import { ICliente } from './../../domain/types/ICliente';
import { api } from "../api";

/**
*@Author
*@Issue
*/
export class ClienteService {

    //end-point da api
    url='api/cliente';

    //modelo de request post
    async post(pEntity: ICliente){
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
    async get(id: Number){
      const response = await api.get(this.url+`/${id}`).then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error.response.data);
            return Promise.reject(error.response.data[0]);
        });
      return response;
    }
    //modelo de request get
    async getClientes(){
      const response = await api.get(this.url).then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error.response.data);
            return Promise.reject(error.response.data[0]);
        });
      return response;
    }

    async updateTipo(id: number, tipo: string) {
      const response = api.put(this.url+`/tipo/${id}/${tipo}`).then(response =>{
        return response.data;
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });
      return response;;
    }

    
  
}