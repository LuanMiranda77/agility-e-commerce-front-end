import { action, computed, makeObservable, observable } from "mobx";
import {createContext}from "react";

class CarrinhoStore{
  


  @observable
  objPage = {
   //adicionar atributos aqui
   valorFrete: 0,
   valorDesconto: 0,
   total: 0
  };
  

  constructor(){
    makeObservable(this);
  }
  

}
export default createContext(new CarrinhoStore());