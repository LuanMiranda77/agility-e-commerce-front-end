import { IEnderecoEntrega } from './IEnderecoEntrega';
import { PaginatorJumpToPageInputOptions } from "primereact/paginator";
import { ICliente } from "./ICliente";
import { IEndereco } from "./IEndereco";
import { IPagamento } from "./IPagamento";

export interface IPedido{
  //adicionar os atributos
  //Autor Carlos Avelino - AE-30
  id: number;
  dataDeCriacao: Date;
  dataFechamento: Date;
  pagamento: IPagamento;
  cliente: ICliente;
  enderecoEntrega: IEnderecoEntrega;
  valorTotal: number;
  valorFrete: number;
  valorDesconto: number;
  estatus: string;
  codigoRastreio: string | null;
}