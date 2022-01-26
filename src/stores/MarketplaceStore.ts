import { IProduto } from './../domain/types/IProduto';
import { action, computed, makeObservable, observable } from "mobx";
import {createContext}from "react";
import { FileImg } from '../domain/types/FileImg';

class MarketplaceStore{
  


  @observable
  objPage = {
   //adicionar atributos aqui
  };

  @observable
  objUpdate = {
   //adicionar atributos aqui
   title: '',
   price: '',
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
  produtos: Array<any>;

  @observable
  produto: any;
  

  constructor(){
    this.produtos = new Array<any>();
    this.produto = this.objNew;
    makeObservable(this);
  }

  @action
  load(produtos: any[]): void {
    this.produtos = produtos;
  }

}
export default createContext(new MarketplaceStore());