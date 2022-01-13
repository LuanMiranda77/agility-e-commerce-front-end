import { action, computed, makeObservable, observable } from "mobx";
import {createContext}from "react";

class TrocaSenhaStore{
  


  @observable
  objPage = {
   //adicionar atributos aqui
   nova: '',
   confirmar: '',
  };
  

  constructor(){
    makeObservable(this);
    this.objPage = { nova:'', confirmar: '',};
  }

  @action
  public new(){
    this.objPage = { nova:'', confirmar: '',};
  }
  

}
export default createContext(new TrocaSenhaStore());