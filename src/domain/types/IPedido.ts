import { ICliente } from "./ICliente";

export interface IPedido{
  //adicionar os atributos
  //Autor Carlos Avelino - AE-30
  id: number;
  // dataCriacao: Date;
  // dataFechamento: Date;
  valorTotal: number;
  valorDesconto: number;
  valorFrete: number;
  status: string;
  cliente: any;
  
}