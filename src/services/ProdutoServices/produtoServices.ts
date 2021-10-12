import { UploadFile } from './../uploadFile';

import { api } from "../api";
import {IProduto} from "../../domain/types/IProduto";
import { FileImg } from "../../domain/types/FileImg";

export class ProdutoService {

    url='api/produto';
  
    async save(pEntity: IProduto,  file: File[]){
      const updateFile = new UploadFile();
      file.forEach(e  =>  {
        const img = updateFile.uploadImg(e);
        const imge: FileImg={objectURL: '', hash: ''}
        pEntity.imagens.push(img);
      });
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