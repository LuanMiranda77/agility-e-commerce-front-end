import { imgur } from "./api";

export class UploadFile{

    public uploadImg(file: any[]){
      
      file.forEach(f => {
        if (f && f.size < 5e6) {
          const formData = new FormData();
          formData.append('image', f);
          imgur.post(`https://api.imgur.com/3/image`, formData).then(res =>{
            f.objectURL = res.data.data.link;
            f.hash = res.data.data.deletehash;
          }).catch(error =>{
              return Promise.reject(error.response.data[0]);
          });
        }
      });
      return file;
    };
      
    async deleteImg(hash: string) {
        const response = await imgur.delete(`https://api.imgur.com/3/image/${hash}`);
        return response.data;
    }

    async getImg(hash: string) {
        const response = await imgur.get(`https://api.imgur.com/3/image/${hash}`);
        return response.data.data;
    }  

    
}