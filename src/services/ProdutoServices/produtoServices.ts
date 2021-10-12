import { FileImg } from "../../domain/types/FileImg";
import { IProduto } from "../../domain/types/IProduto";
import { api } from "../api";
import { UploadFile } from './../uploadFile';



export class ProdutoService {

    url='api/produto';
  
   public async save(pEntity: IProduto,  file: File[]) : Promise<IProduto>{
      const updateFile = new UploadFile();
      file.forEach(e  =>  {
        updateFile.uploadImg(e).then(res =>{
          // const imge: FileImg={objectURL: '', hash: '', size: 0}
          // imge.hash = res?.hash ? res.hash : "";
          // imge.objectURL = res?.objectURL ? res.objectURL : '';
          // imge.size = e.size;
          pEntity.imagens.push(res);
        }).catch(error => {
        return Promise.reject(error.response.data);
      });;
      })
      const response = await api.post(this.url, pEntity)
      .then(response => {
        return response.data;
      }).catch(error => {
        return Promise.reject(error.response.data[0]);
      });
      return response;
    }

    public async update(pEntity: IProduto) : Promise<IProduto>{
      const response = await api.put(this.url+`/${pEntity.id}`,pEntity)
      .then(response => {
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