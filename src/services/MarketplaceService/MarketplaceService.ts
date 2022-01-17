import { api, integrador } from "../api";

/**
*@Author
*@Issue
*/
export class MarketplaceService {

    //end-point da api
    url='api/empresa';

    //modelo de request post
    async post(pEntity: any){
      const response = await api.post(this.url+"/cred-livre", pEntity).then( resp =>{
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
      const response = await api.get(this.url+"/get-livre/1").then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error.response.data);
            return Promise.reject(error.response.data[0]);
        });;
      return response;
    }

    async getCategoriasMercadoLivre() {
      const response = await integrador.get('/api/m_livre/categorias').then(response =>{
        return response.data.response;
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    async findByCategoriaByIdMercadoLivre(id: string) {
      const response = await integrador.get(`/api/m_livre/categorias/${id}`).then(response =>{
        return response.data.response;
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }
    
  
}