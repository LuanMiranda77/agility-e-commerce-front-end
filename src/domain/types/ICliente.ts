import { IEndereco } from "./IEndereco";
import { IUser } from "./IUser";

export interface ICliente{
    id: number;
    usuario: IUser;
    cpfCnpj: String;
    tipoDeCliente: String;
    enderecos: Array<IEndereco>;
    telefone: String;
    celular: String;
}