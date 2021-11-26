import { action, computed, makeObservable, observable } from "mobx";
import { ICheckout } from "../domain/types/ICheckout";
import {createContext}from "react";

class CheckoutStore{
  
  byId = observable.map();

  objNew = {
    transaction_amount: 0,
    token: '',
    description: '',
    installments: 0,
    payment_method_id: '',
    issuer_id: '',
    payer: {
        email: '', //obrigatorio
        identification: {
            type: '', // CPF ou CNPJ
            number: ''
        }
    },
    type:'CARTAO'
  };

  @observable
  checkouts: Array<ICheckout>;

  @observable
  checkout: ICheckout;
  

  constructor(){
    this.checkouts = new Array<ICheckout>();
    this.checkout = this.objNew;
    makeObservable(this);
  }

  @action
  novo = () =>{
    this.checkout = this.objNew;
  }

  @action
  update = (Checkout: ICheckout) =>{
    this.checkout = { ...Checkout };
  }

  @action
  add = (Checkout: ICheckout) =>{
    this.checkouts.push(Checkout);
  }

  @action
  remove = (id: string) =>{
    this.checkouts = this.checkouts.filter(Checkout => Checkout.payment_method_id !== id);
  }

  @action
  load(Checkouts: ICheckout[]): void {
    this.checkouts = Checkouts;
  }
  
  @action
  findIndexById = (id: string) => {
    let index = -1;
    for (let i = 0; i < this.checkouts.length; i++) {
        if (this.checkouts[i].payment_method_id === id) {
            index = i;
            break;
        }
    }
    return index;
  }
  
  @computed
  get all() {
    //metodo de Mobx para calculo
    return  null;
  }
  

}
export default createContext(new CheckoutStore());