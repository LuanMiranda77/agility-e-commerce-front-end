import { action, computed, makeObservable, observable } from "mobx";
import {createContext}from "react";

class EnderecoStore{
  


  @observable
  objPage = {
   //adicionar atributos aqui
   
  };
  

  constructor(){
    makeObservable(this);
  }

  @action
  public load(){

  }
  

}
export default createContext(new EnderecoStore());