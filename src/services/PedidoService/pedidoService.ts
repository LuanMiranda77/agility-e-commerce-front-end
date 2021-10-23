import { api } from "../api";
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
        const response = [{id: 1, dataCriacao: null,  dataFechamento: null,
          valorTotal: 1000,
          valorDesconto: 10,
          valorFrete: 50,
          status: 'FINALIZADO',
          cliente: null},];
        // await api.get(this.url);
      return response;
    }

  

  
}