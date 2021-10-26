
import { api } from "../api";
import { login, TOKEN_KEY } from "../auth";
import { IUser } from "../../domain/types/IUser";

export class LoginService {

    url='api/usuario';
    auth='/tokken';
    erro='';

    public async login(pEntity : IUser) {
        
        api.post(this.auth, {email:'admin',password:'Ads%$#@!Ads'}).then(response =>{
            login(response.data);

        });
        const response = await api.post(this.url+'/login', pEntity)
        .then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error.response.data[0]);
            return Promise.reject(error.response.data[0]);
        });
        return response;
    }

    public async recuperarSenha(user: IUser){
        const response = await api.post(this.url+'/recuperasenha', user)
        .then( resp =>{
            return resp.data;
        })
        .catch(error => {
            return Promise.reject(error.response.data[0]);
        });
        return response;
    }


}
