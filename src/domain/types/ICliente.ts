import { IEndereco } from "./IEndereco";
import { IUser } from "./IUser";

export interface ICliente{
    id: number;
    usuario: IUser;
    cpfCnpj: string;
    tipo: string;
    enderecos: Array<IEndereco>;
    telefone: string;
    celular: string;
    dataNascimento: Date;
    sexo: string;
}