import { api } from "../api";
import { ICategoria } from "../../domain/types/ICategoria";
export class CategoriaService {

    url='api/categoria';

    async save(pEntity: ICategoria){
      const response = await api.post(this.url, pEntity);
      return response.data;
    }
    update(pEntity: ICategoria) : void{
      api.put(this.url+`/${pEntity.id}`,pEntity);
    }
    delete(id:number){
      api.delete(this.url+`/${id}`);
    }
    deleteAll(array: ICategoria[]){
      api.post(this.url+`/deleteall`, array);
    }
    async getCategorias() {
        const response = await api.get(this.url);
      return response.data;
    }

  

  
}