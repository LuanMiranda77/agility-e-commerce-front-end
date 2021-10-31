import { PaginatorJumpToPageInputOptions } from "primereact/paginator";
import { ICliente } from "./ICliente";
import { IEndereco } from "./IEndereco";
import { IPagamento } from "./IPagamento";

export interface IPedido{
  //adicionar os atributos
  //Autor Carlos Avelino - AE-30
  id: number;
  dataCriacao: Date;
  dataFechamento: Date;
  pagamento: IPagamento;
  cliente: ICliente;
  enderecoDeEntrega: IEndereco;
  valorTotal: number;
  valorFrete: number;
  valorDesconto: number;
  status: string;
}