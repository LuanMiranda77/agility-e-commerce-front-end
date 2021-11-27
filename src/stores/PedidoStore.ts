import { action, computed, makeObservable, observable } from "mobx";
import { IPedido } from "../domain/types/IPedido";
import {createContext}from "react";
import { IEndereco } from "../domain/types/IEndereco";
import {ICliente} from "../domain/types/ICliente";
import { IPagamento } from "../domain/types/IPagamento";
import { IUser } from "../domain/types/IUser";
import { UtilsDate } from "../utils/utilsDate";

class PedidoStore{


  
  byId = observable.map();

  usuario: IUser = {id: 0, nome:'', login:'', email:'', dataCriacao: null, dataAtualizacao: null, status: 'ATIVO', password: '', role: 'MASTER'};

  cliente: ICliente = { id: 0,
              usuario: this.usuario,
              cpfCnpj: '',
              tipo: 'VAREJO',
              enderecos: new Array<IEndereco>(),
              telefone: '',
              celular: ''
  };

  pagamento: IPagamento = {
    id: 0,
    numeroDeParcelas: 0,
    // dataEmissao: new Date,
    dataVencimento: UtilsDate.formatByYYYYMMDD(new Date),
    dataPagamento: UtilsDate.formatByYYYYMMDD(new Date) ,
    tipo: 'BOLETO',
    estatus: 'APROVADO',
  };

  endereco: IEndereco = {
    id: 0,
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    cep: '',
    uf : 'PB',

  };

  objNew = {
   //adicionar atributos aqui
   id: 0,
   dataDeCriacao: new Date(),
   dataFechamento: new Date(),
   pagamento: this.pagamento,
   cliente: this.cliente,
   enderecoDeEntrega: this.endereco,
   valorTotal: 0,
   valorFrete: 0,
   valorDesconto: 0,
   estatus: '',
  };

  @observable
  pedidos: Array<IPedido>;

  @observable
  pedido: IPedido;
  

  constructor(){
    this.pedidos = new Array<IPedido>();
    this.pedido = this.objNew;
    makeObservable(this);
  }

  @action
  novo = () =>{
    this.pedido = this.objNew;
  }

  @action
  update = (pedido: IPedido) =>{
    this.pedido = { ...pedido };
  }

  @action
  add = (pedido: IPedido) =>{
    this.pedidos.push(pedido);
  }

  @action
  remove = (id: number) =>{
    this.pedidos = this.pedidos.filter(pedido => pedido.id !== id);
  }

  @action
  load(pedidos: IPedido[]): void {
    console.log(pedidos) 
    // this.pedidos = pedidos;
  }
  
  @action
  findIndexById = (id: number) => {
    let index = -1;
    for (let i = 0; i < this.pedidos.length; i++) {
        if (this.pedidos[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
  }
  
  @computed
  get all() {
    //metodo de Mobx para calculo
    return  null;
  }
  

}
export default createContext(new PedidoStore());