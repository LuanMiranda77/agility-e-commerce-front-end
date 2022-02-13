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
            // console.log(error.response.data);
            return "erro";
        });;
      return response;
    }

    async getCategoriasMercadoLivre() {
      const response = await integrador.get('/api/m_livre/categorias').then(response =>{
        return response.data.response;
      }).catch(error=>{
        console.log(error.response.data);
        return Promise.reject(error.response.data);
      });
      return response;
    }

    async findByCategoriaByIdMercadoLivre(id: string) {
      const response = await integrador.get(`/api/m_livre/categorias/${id}`).then(response =>{
        return response.data.response;
      }).catch(error=>{
        console.log(error.response.data);
        return Promise.reject(error.response.data);
      });
      return response;
    }

    async findProdutoByIdMercadoLivre(ids: Array<string>) {
      const response = await integrador.post(`/api/m_livre/items/ids`, ids).then(response =>{
        console.log(response.data[0].body);
        return response.data[0].body;
      }).catch(error=>{
        console.log(error.response.data);
        return Promise.reject(error.response.data);
      });
      return response;
    }

    async findProdutosByMercadoLivre() {
      const response = await integrador.get('/api/m_livre/items').then(response =>{
        return response.data.response;
      }).catch(error=>{
        console.log(error.response.data);
        return Promise.reject(error.response.data);
      });
      return response;
    }

    async putProdutosByMercadoLivre(id: string, produto: any) {
      const response = await integrador.put('/api/m_livre/item/'+id, produto).then(response =>{
        return response.data.response;
      }).catch(error=>{
        console.log(error.response.data);
        return Promise.reject(error.response.data);
      });
      return response;
    }

    async findPedidos(id: string) {
      const response = await integrador.get(`/api/m_livre/pedidos/${id}`).then(response =>{
        return response.data.response;
      }).catch(error=>{
        console.log(error.response.data);
        return Promise.reject(error.response.data);
      });
      return response;
    }

    async findPedidosByStatus(status: string) {
      const response = await integrador.get(`/api/m_livre/pedidos/status/${status}`).then(response =>{
        return response.data.response;
      }).catch(error=>{
        console.log(error.response.data);
        return Promise.reject(error.response.data);
      });
      return response;
    }

    async deleteImage(hash: string) {
      const response = await integrador.delete(`/api/m_livre/item/image/${hash}`).then(response =>{
        return response.data.response;
      }).catch(error=>{
        console.log(error.response.data);
        return Promise.reject(error.response.data);
      });
      return response;
    }


    
  
}