import { FileImg } from "../../domain/types/FileImg";
import { IProduto } from "../../domain/types/IProduto";
import { Utils } from "../../utils/utils";
import { api, imgur } from "../api";
import { UploadFile } from './../uploadFile';



export class ProdutoService {

    url='api/produto';
  
   public async save(pEntity: IProduto) : Promise<IProduto>{
      let cont=0;
      for(let f of pEntity.imagens) {
        if (f && f.size < 5e6) {
            const formData = new FormData();
            formData.append('image', f);
            const res = await imgur.post(`https://api.imgur.com/3/image`, formData);
            pEntity.imagens[cont].objectURL =res.data.data.link;
            pEntity.imagens[cont].hash = res.data.data.deletehash;
            pEntity.imagens[cont].nome = "|"+f.name;
            pEntity.imagens[cont].tam = "|"+res.data.data.size;
        }
        cont++;
      }
      const response = await api.post(this.url, pEntity)
      .then(response => {
        console.log(pEntity);
        return response.data;
      }).catch(error => {
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    public async update(pEntity: IProduto) : Promise<IProduto>{
      const response = await api.put(this.url+`/${pEntity.id}`,pEntity)
      .then(response => {
        console.log(pEntity);
        return response.data;
      }).catch(error => {
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    public async delete(id:number){
      const response = await api.delete(this.url+`/${id}`).catch(error => {
        return Promise.reject(error.response.data[0]);
      });;
      return response;
    }

    public async deleteAll(array: IProduto[]){
      const response = await api.post(this.url+`/deleteall`, array).then(response => {
        return response.data;
      }).catch(error => {
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    public async getProdutos() : Promise<IProduto[]> {
        const response = await api.get(this.url).then(response =>{
          return response.data;
        }).catch(error=>{
          return Promise.reject(error);
        });
      return response;
    }

  

  
}