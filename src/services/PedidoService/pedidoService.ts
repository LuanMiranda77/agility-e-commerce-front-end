import { api } from "../api";
import { IPedido } from "../../domain/types/IPedido";
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
        const response = await api.get(this.url);
      return response.data;
    }

  

  
}