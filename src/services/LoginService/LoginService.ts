
import { api } from "../api";
import { login, TOKEN_KEY } from "../auth";
import { IUser } from "../../domain/types/IUser";

export class LoginService {

    url='api/usuario/login';
    auth='/tokken';
    erro='';

    public async login(pEntity : IUser) {
        
        api.post(this.auth, {email:'admin',password:'Ads%$#@!Ads'}).then(response =>{
            login(response.data);

        });
        const response = await api.post(this.url, pEntity)
        .then( resp =>{
            return resp.data;
        })
        .catch(error => {
            return Promise.reject(error.response.data[0]);
        });
        return response;
    }


}
