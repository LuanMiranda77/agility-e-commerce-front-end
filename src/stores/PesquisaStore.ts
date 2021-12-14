import { action, computed, makeObservable, observable } from "mobx";
import {createContext}from "react";

class PesquisaStore{
  


  @observable
  objPage = {
   //adicionar atributos aqui
   precoMin: '0',
   precoMax: '100',
  };
  

  constructor(){
    makeObservable(this);
  }
  

}
export default createContext(new PesquisaStore());