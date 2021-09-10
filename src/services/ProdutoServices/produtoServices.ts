
import { api } from "../api";
import {IProduto} from "../../domain/types/IProduto";
export class ProdutoService {

    url='api/produto';

    async save(pEntity: IProduto){
      const response = await api.post(this.url, pEntity);
      return response.data;
    }
    update(pEntity: IProduto) : void{
      api.put(this.url+`/${pEntity.id}`,pEntity);
    }
    delete(id:number){
      api.delete(this.url+`/${id}`);
    }
    deleteAll(array: IProduto[]){
      api.post(this.url+`/deleteall`, array);
    }
    async getProdutos() {
        const response = await api.get(this.url);
      return response.data;
    }

  

  
}