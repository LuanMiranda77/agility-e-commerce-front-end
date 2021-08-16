
import { api } from "../api";
import { IUser } from "./IUser";

export class LoginService {

    url='user/login';

    public async login(pEntity : IUser) {
        const response = await api.post(this.url, pEntity);
        return response.data;
    }
}
