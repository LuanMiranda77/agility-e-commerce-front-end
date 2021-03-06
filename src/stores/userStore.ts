import { IUser } from "../domain/types/IUser";
import { action, computed, makeObservable, observable} from "mobx";
import React from "react";


class UserStore {

  @observable
  users: Array<IUser>;

  user: IUser;


  constructor() {
    makeObservable(this);
    this.users = [];
    this.user = {id: 0,
                nome:'', 
                login:'', 
                email:'', 
                dataCriacao: null, 
                dataAtualizacao: null, 
                status: 'ATIVO', 
                password: '', 
                role: 'MASTER'
  };
  }

  @action
  add = (user: IUser) =>{
    this.users.push(user);
  }

  @action
  remove = (id: number) =>{
    //this.users = this.users.filter(user => user.id !== id);
  }

  @action
  load(users: IUser[]): void {
    //users.forEach((it) => this.byId.set(it.id, new User(this.store, it)));
  }
  
}
export default React.createContext(new UserStore());