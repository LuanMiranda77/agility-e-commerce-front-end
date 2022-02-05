import { action, computed, makeObservable, observable } from "mobx";
import {createContext}from "react";

class ClienteStore{
  



  

  constructor(){
    makeObservable(this);
  }
  

}
export default createContext(new ClienteStore());