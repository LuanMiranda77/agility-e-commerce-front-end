
import { api } from "../api";
import {IProduto} from "./produtoInterface";
export class ProdutoService {

    url='produto';

    save(pEntity: IProduto){
      return api.post(this.url,pEntity).then(response => response.data);;
    }
    update(pEntity: IProduto) : void{
      api.put(this.url,pEntity);
    }
    delete(id:number){
      api.delete(this.url+`/${id}`);
    }
    getProdutos() {
        return api.get(this.url).then(response => response.data);
    }

  

  
}