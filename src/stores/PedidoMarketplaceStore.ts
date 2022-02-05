import { action, computed, makeObservable, observable } from "mobx";
import {createContext}from "react";
import { FileImg } from "../domain/types/FileImg";

class PedidoMarketplaceStore{
  


  @observable
  objPage = {
   //adicionar atributos aqui
  };

  @observable
  objUpdate = {
   //adicionar atributos aqui
   title: '',
   price: 0,
   status: '',
   available_quantity: 0,
  };

  objNew = {
    id: 0,
    codigoBarras: '',
    titulo: '',
    precoVarejo: 0,
    quantidade: 0,
    descricao: '',
    imagens: new Array<FileImg>(),
    status:'',
    categoria: '',
    qtn_inicial: 0, qtn_vendida: 0, garantia: '', dt_create: '', dt_update: '',
  };

  @observable
  pedidos: Array<any>;

  @observable
  pedido: any;
  

  constructor(){
    this.pedidos = new Array<any>();
    makeObservable(this);
  }

  @action
  load(pedidos: any[]): void {
    this.pedidos = pedidos;
  }

  @action
  load_prod(pedido: any) {
    this.pedido = {...pedido};
  }

  @action
  update() {
    this.objUpdate.title= this.pedido.titulo;
    this.objUpdate.available_quantity = this.pedido.quantidade;
    this.objUpdate.price = this.pedido.precoVarejo;
    this.objUpdate.status = this.pedido.status;
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

}
export default createContext(new PedidoMarketplaceStore());