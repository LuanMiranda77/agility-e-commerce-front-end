
import { api } from "../api";
import { IUser } from "./IUser";

export class LoginService {

    url='user';

    public login(usuario : IUser) {
       api.post(this.url, usuario).then(response => response.data); 
    }
}
