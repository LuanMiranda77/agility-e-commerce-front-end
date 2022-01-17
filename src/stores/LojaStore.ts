import { IEmpresa } from './../domain/types/IEmpresa';
import { action, computed, makeObservable, observable } from "mobx";
import { createContext } from "react";

class LojaStore {

  objNew = {
    id: null,
    cnpj: '',
    instEstadual: '',
    instMunicipal: '',
    razaoSocial: '',
    nomeFantasia: '',

    // -----------endereços------------------
    logradouro: '',
    numero: '',
    complemento: null,
    bairro: '',
    cidade: '',
    cep: '',
    uf: '',

    // -------contatos----------------

    emailPrincipal: '',
    emailSegundario: '',
    celular1: '',
    celular2: '',
    foneFixo: '',
  }



  @observable
  isValid = {
    CNPJ: true,
  };

  @observable
  objPage: IEmpresa;


  constructor() {
    makeObservable(this);
    this.objPage = this.objNew
  };

  @action
  public load(obj: IEmpresa){
    this.objPage = {...obj}
  }


}
export default createContext(new LojaStore());