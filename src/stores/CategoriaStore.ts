import { action, computed, makeObservable, observable } from "mobx";
import { ICategoria } from "../domain/types/ICategoria";
import {createContext}from "react";

class CategoriaStore{
  
  byId = observable.map();

  objNew = {
   //adicionar atributos aqui
   id: 0,
  nome: ''
  };

  @observable
  categorias: Array<ICategoria>;

  @observable
  categoria: ICategoria;
  

  constructor(){
    this.categorias = new Array<ICategoria>();
    this.categoria = this.objNew;
    makeObservable(this);
  }

  @action
  novo = () =>{
    this.categoria = this.objNew;
  }

  @action
  update = (categoria: ICategoria) =>{
    this.categoria = { ...categoria };
  }

  @action
  add = (categoria: ICategoria) =>{
    this.categorias.push(categoria);
  }

  @action
  remove = (id: number) =>{
    this.categorias = this.categorias.filter(categoria => categoria.id !== id);
  }

  @action
  load(categorias: ICategoria[]): void {
    this.categorias = categorias;
  }
  
  @action
  findIndexById = (id: number) => {
    let index = -1;
    for (let i = 0; i < this.categorias.length; i++) {
        if (this.categorias[i].id === id) {
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
export default createContext(new CategoriaStore());