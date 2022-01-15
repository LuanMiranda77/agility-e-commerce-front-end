import { action, computed, makeObservable, observable } from "mobx";
import {createContext}from "react";

class PagoConfigStore{
  
  @observable
  objPage = {
   //adicionar atributos aqui
    id: null,
    public_key: '',
    client_id: '',
    client_secret:'',
    access_token: '',
    status: 'S',
  };
  

  constructor(){
    makeObservable(this);
  }

  @action
  public load(obj: any){
    this.objPage = {...obj}
  }
  

}
export default createContext(new PagoConfigStore());