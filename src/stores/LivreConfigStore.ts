import { action, computed, makeObservable, observable } from "mobx";
import {createContext}from "react";

class LivreConfigStore{
  


  @observable
  objPage = {
   //adicionar atributos aqui
    id: null,
    client_id: '',
    client_secret:'',
    access_token: null,
    token_type: null,
    expires_in: null,
    scope: null,
    user_id: null,
    refresh_token: null,
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
export default createContext(new LivreConfigStore());