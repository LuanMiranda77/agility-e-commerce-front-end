import { api, integrador } from "../api";
import { IPedido } from "../../domain/types/IPedido";
import { IEndereco } from "../../domain/types/IEndereco";
import { IFrete } from "../../domain/types/IFrente";
import { ICliente } from "../../domain/types/ICliente";

export class PedidoService {

    url='api/pedido';

    async save(pEntity: IPedido){
      const response = await api.post(this.url, pEntity).then(response =>{
        return response.data;
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }
    async update(pEntity: IPedido) {
      const response = api.put(this.url+`/${pEntity.id}`,pEntity).then(response =>{
        return response.data;
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });
      return response;;
    }

    async updateStatus(id: number, code: string, status: string) {
      const response = api.put(this.url+`/status/${id}/${code}/${status}`).then(response =>{
        return response.data;
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });
      return response;;
    }

    async delete(id:number){
      api.delete(this.url+`/${id}`).then(response =>{
        
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });;
    }
    async deleteAll(array: IPedido[]){
      api.post(this.url+`/deleteall`, array).then(response =>{
        
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });;
    }
    async getPedidosById(id:number) {
      const response = await api.get(this.url+`/${id}`).then(response =>{
        return response.data;
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    async getPedidosByCliente(pEntity: IPedido) {
      const response = await api.post(this.url+`/find-pedidos-by-cliente`, pEntity).then(response =>{
        return response.data;
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    async getPedidosByClienteStatus(pEntity: IPedido) {
      const response = await api.post(this.url+`/find-pedidos-by-cliente-status`, pEntity).then(response =>{
        return response.data;
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    async getPedidos() {
      const response = await api.get(this.url).then(response =>{
        return response.data;
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }
    async findPedidoByEstatus(pEntity: IPedido) {
      console.log(pEntity);
      const response = await api.post(this.url+'/find-data', pEntity).then(response =>{
        return response.data;
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }
    async findPedidoByData(pEntity: IPedido) {
      console.log(pEntity);
      const response = await api.post(this.url+'/find-data-all', pEntity).then(response =>{
        return response.data;
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    async getRastreio(codigo: string) {
      const response = await integrador.post('/api/correio/rastreio', [codigo]).then(response =>{
        return response.data.response[0];
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    async calculaFrete(frete: any) {
      const response = await integrador.post('/api/correio/calcular', frete).then(response =>{
        return response.data.response;
      }).catch(error=>{
        console.log(error);
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    
}
