import { api, inte } from "../api";
import { IPedido } from "../../domain/types/IPedido";
import { IEndereco } from "../../domain/types/IEndereco";

export class PedidoService {

    url='api/pedido';

    async save(pEntity: IPedido){
      const response = await api.post(this.url, pEntity);
      return response.data;
    }
    update(pEntity: IPedido) : void{
      api.put(this.url+`/${pEntity.id}`,pEntity);
    }
    delete(id:number){
      api.delete(this.url+`/${id}`);
    }
    deleteAll(array: IPedido[]){
      api.post(this.url+`/deleteall`, array);
    }
    async getPedidos() {
      const response = await api.get(this.url).then(response =>{
        return response.data;
      }).catch(error=>{
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }
    async findPedidoByEstatus(pEntity: IPedido) {
      console.log(pEntity);
      const response = await api.post(this.url+'/find-data', pEntity).then(response =>{
        return response.data;
      }).catch(error=>{
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }
    async findPedidoByData(pEntity: IPedido) {
      console.log(pEntity);
      const response = await api.post(this.url+'/find-data-all', pEntity).then(response =>{
        return response.data;
      }).catch(error=>{
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    async getRastreio() {
      const response = await api.get(this.url).then(response =>{
        return response.data;
      }).catch(error=>{
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    
}
