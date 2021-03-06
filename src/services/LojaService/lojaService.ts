import { api } from "../api";

/**
*@Author
*@Issue
*/
export class LojaService {

   //end-point da api
   url='api/empresa';

   //modelo de request post
   async post(pEntity: any){
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
     const response = await api.get(this.url+"/1").then( resp =>{
           return resp.data;
       })
       .catch(error => {
           console.log(error.response.data);
           return Promise.reject(error.response.data[0]);
       });;
     return response;
   }
    
  
}