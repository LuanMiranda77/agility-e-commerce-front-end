
import { api } from "../api";
import { login, TOKEN_KEY } from "../auth";
import { IUser } from "./IUser";

export class LoginService {

    url='api/user/login';
    auth='/tokken';



    public async login(pEntity : IUser) {
        
        api.post(this.auth, {email:'admin',password:'Ads%$#@!Ads'}).then(response =>{
            console.log(response.data);
            login(response.data);

        });
       
        
        
        const response = await api.post(this.url, pEntity);
        return response.data;
    }
}
