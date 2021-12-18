import { api, integrador } from "../api";
import { IPedido } from "../../domain/types/IPedido";
import { IEndereco } from "../../domain/types/IEndereco";
import { IFrete } from "../../domain/types/IFrente";

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

    async getRastreio(codigo: string) {
      const response = await integrador.post('/api/correio/rastreio', [codigo]).then(response =>{
        return response.data[0];
      }).catch(error=>{
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    async calculaFrete(frete: any) {
      const response = await integrador.post('/api/correio/calcular', frete).then(response =>{
        return response.data.response;
      }).catch(error=>{
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    
}
