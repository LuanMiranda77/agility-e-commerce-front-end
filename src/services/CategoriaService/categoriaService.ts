import { api } from "../api";
import { ICategoria } from "../../domain/types/ICategoria";
export class CategoriaService {

    url='api/categoria';

    public async save(pEntity: ICategoria){
      const response = await api.post(this.url, pEntity).then(response => {
        return response.data;
      }).catch(error => {
        console.error(error.response.data[1]);
        return Promise.reject(error.response.data[0]);
      });
      return response;    
    }

    public async update(pEntity: ICategoria) {
      const response = await api.put(this.url+`/${pEntity.id}`,pEntity).then(response => {
        return response.data;
      }).catch(error => {
        console.error(error.response.data[1]);
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    public async delete(id:number){
      const response = await api.delete(this.url+`/${id}`).then(response => {
        return response.data;
      }).catch(error => {
        console.error(error.response.data[1]);
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    public async deleteAll(array: ICategoria[]){
      const response = await api.post(this.url+`/deleteall`, array).then(response => {
        return response.data;
      }).catch(error => {
        console.error(error.response.data[1]);
        return Promise.reject(error.response.data[0]);
      });
      return response;;
    }

    async getCategorias() {
        const response = await api.get(this.url).then(response => {
          return response.data;
        }).catch(error => {
          console.error(error.response.data[1]);
          return Promise.reject(error.response.data[0]);
        });
      return response;
    }

  

  
}