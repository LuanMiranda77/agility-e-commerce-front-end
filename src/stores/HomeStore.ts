import { action, computed, makeObservable, observable } from "mobx";
import {createContext}from "react";

class HomeStore{
  


  @observable
  objPage = {
   //adicionar atributos aqui
  };
  

  constructor(){
    makeObservable(this);
  }
  

}
export default createContext(new HomeStore());