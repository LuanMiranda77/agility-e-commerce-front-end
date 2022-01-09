import { Utils } from './../utils/utils';
import { action, computed, makeObservable, observable } from "mobx";
import { createContext } from "react";
import { ICliente } from "../domain/types/ICliente";
import { IEndereco } from "../domain/types/IEndereco";
import { IUser } from "../domain/types/IUser";
import { UtilsDate } from '../utils/utilsDate';

class UsuarioStore {

  @observable
  objPag = {
    senha: '',
    isFormValidCPF: true,
    isFormValidNome: true,
    isFormValidCelular: true,
    isFormValidEmail: true,
    isFormValidSenha: true,
    submit: false,
  }


  @observable
  cliente: ICliente;

  @observable
  usuario: IUser;


  constructor() {
    makeObservable(this);
    this.usuario = {
      id: 0,
      nome: '',
      login: 'test',
      email: '',
      dataCriacao: null,
      dataAtualizacao: null,
      status: 'ATIVO',
      password: '',
      role: 'CLIENTE'
    };

    this.cliente = {
      id: 0,
      usuario: this.usuario,
      cpfCnpj: '',
      tipo: 'VAREJO',
      enderecos: new Array<IEndereco>(),
      telefone: '',
      celular: '',
      dataNascimento: new Date(),
      sexo: 'M',
    }
  }

  @action
  public setDataNascimento = (data: Date) => {
    this.cliente.dataNascimento = data;
  }

  @action
  public isValid = () => {
    
    if (!Utils.isValidEmail(this.usuario.email)) {
      this.objPag.isFormValidEmail = true;
      return 'Endereço de e-mail inválido!'
    }
    else if (this.objPag.senha !== this.usuario.password || this.objPag.senha.length > this.usuario.password.length || this.objPag.senha.length < this.usuario.password.length) {
      this.objPag.isFormValidSenha = true;
      return 'Senha diferentes!';
    }
    else {
      // this.resetForm();
      return '';

    }
  }

  @action
  public setCliente = (cl: ICliente) => {
    this.cliente = { ...cl };
  }

  @action
  public resetForm = () => {
    this.objPag = {
      senha: '',
      isFormValidCPF: true,
      isFormValidNome: true,
      isFormValidCelular: true,
      isFormValidEmail: true,
      isFormValidSenha: true,
      submit: false,
    }
    this.usuario = {
      id: 0,
      nome: '',
      login: 'test',
      email: '',
      dataCriacao: null,
      dataAtualizacao: null,
      status: 'ATIVO',
      password: '',
      role: 'CLIENTE'
    };

    this.cliente = {
      id: 0,
      usuario: this.usuario,
      cpfCnpj: '',
      tipo: 'VAREJO',
      enderecos: new Array<IEndereco>(),
      telefone: '',
      celular: '',
      dataNascimento: new Date(),
      sexo: 'M',
    }
  }

  @action
  public isValidaFormBranco = () => {
    if (this.cliente.cpfCnpj.length === 0) {
      this.objPag.isFormValidCPF = false;
      return false;
    }
    else if (this.usuario.nome.length === 0) {
      this.objPag.isFormValidNome = false;
      return false;
    }
    else if (this.cliente.celular.length === 0) {
      this.objPag.isFormValidCelular = false;
      return false;
    }
    else if (this.objPag.senha.length === 0) {
      this.objPag.isFormValidSenha = false;
      return false;
    } else if (this.usuario.password.length === 0) {
      this.objPag.isFormValidSenha = false;
      return false;
    } else if (this.usuario.email.length === 0) {
      this.objPag.isFormValidEmail = false;
      return false;
    }
    return true
  }


}
export default createContext(new UsuarioStore());