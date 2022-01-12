import { IEndereco } from './../domain/types/IEndereco';
import { action, computed, makeObservable, observable } from "mobx";
import {createContext}from "react";

class EnderecoStore{
  
  objNew = {
    id: null,
    logradouro:'',
    numero:'',
    complemento:'',
    bairro:'',
    cidade:'',
    cep:'',
    uf :'',
    padrao: ''
  }

  @observable
  objPage: IEndereco;
  

  constructor(){
    makeObservable(this);
    this.objPage = this.objNew;
  }

  @action
  public load(endereco: IEndereco){
    this.objPage = {...endereco}
  }

  @action
  public new(){
    this.objPage = this.objNew;
  }

  

}
export default createContext(new EnderecoStore());