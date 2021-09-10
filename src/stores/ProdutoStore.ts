import { action, computed, makeObservable, observable } from "mobx";
import { IProduto } from "../domain/types/IProduto";
import {createContext}from "react";


class ProdutoStore{
  
  byId = observable.map();

  objNew = {
    id: 0,
    codigoBarras: '',
    nome: '',
    precoVarejo: 0,
    precoAtacado: 0,
    quantidade: 1,
    descricao: '',
    estrelas: 0,
    imagens: []
  };

  @observable
  produtos: Array<IProduto>;

  @observable
  produto: IProduto;
  

  constructor(){
    this.produtos = new Array<IProduto>();
    this.produto = this.objNew;
    makeObservable(this);
  }

  @action
  novo = () =>{
    this.produto = this.objNew;
  }

  @action
  update = (produto: IProduto) =>{
    this.produto = { ...produto };
  }

  @action
  add = (produto: IProduto) =>{
    this.produtos.push(produto);
  }

  @action
  remove = (id: number) =>{
    this.produtos = this.produtos.filter(produto => produto.id !== id);
  }

  @action
  load(produtos: IProduto[]): void {
    this.produtos = produtos;
  }
  
  @action
  findIndexById = (id: number) => {
    let index = -1;
    for (let i = 0; i < this.produtos.length; i++) {
        if (this.produtos[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
  }


  
  @computed
  get all() {
    return Array.from(this.byId.values());
  }
  

}
export default createContext(new ProdutoStore());