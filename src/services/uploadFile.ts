import { FileImg } from "../domain/types/FileImg";
import { imgur } from "./api";

export class UploadFile{

    async uploadImg(file: File){
        if (file && file.size < 5e6) {
          const formData = new FormData();
          formData.append('image', file);
          const img: FileImg={objectURL: '', hash: ''}
          const response = await imgur.post(`https://api.imgur.com/3/image`, formData)
          img.objectURL = response.data.data.link;
          img.hash = response.data.data.deletehash;
          return img;
        };
      }
      
    async deleteImg(hash: string) {
        const response = await imgur.delete(`https://api.imgur.com/3/image/${hash}`);
        return response.data;
    }

    async getImg(hash: string) {
        const response = await imgur.get(`https://api.imgur.com/3/image/${hash}`);
        return response.data.data;
    }  

    
}