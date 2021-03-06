import { api } from "../api";

/**
*@Author
*@Issue
*/
export class ConfigPagamentoService {

    //end-point da api
    url='api/empresa';

    //modelo de request post
    async post(pEntity: any){
      const response = await api.post(this.url+"/cred-pago", pEntity).then( resp =>{
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
      const response = await api.get(this.url+"/get-pago/1").then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error.response.data);
            return Promise.reject(error.response.data[0]);
        });;
      return response;
    }
    
  
}