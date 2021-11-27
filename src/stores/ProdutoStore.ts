import { action, computed, makeObservable, observable } from "mobx";
import { IProduto } from "../domain/types/IProduto";
import { createContext } from "react";
import { ICategoria } from "../domain/types/ICategoria";
import { FileImg } from "../domain/types/FileImg";


class ProdutoStore {

  byId = observable.map();

  objNew = {
    id: 0,
    codigoBarras: '',
    titulo: '',
    precoVarejo: 0,
    precoAtacado: 0,
    quantidade: 1,
    descricao: '',
    estrelas: 0,
    peso: 0,
    comprimento: 0,
    altura: 0,
    largura: 0,
    imagens: new Array<FileImg>(),
    categorias: new Array<ICategoria>()
  };

  @observable
  produtos: Array<IProduto>;

  @observable
  produto: IProduto;


  constructor() {
    this.produtos = new Array<IProduto>();
    this.produto = this.objNew;
    makeObservable(this);
    
  }

  @action
  novo = () => {
    this.produto = this.objNew;
  }

  @action
  update = (produto: IProduto) => {
    this.produto = { ...produto };
  }

  @action
  add = (produto: IProduto) => {
    this.produtos.push(produto);
  }

  @action
  remove = (id: number) => {
    this.produtos = this.produtos.filter(produto => produto.id !== id);
  }

  @action
  load(produtos: IProduto[]): void {
    this.produtos = produtos;
  }

  @action
  setCategorias(categorias: ICategoria[]): void{
    console.log(categorias);
    this.produto.categorias = categorias;
  }

  @action
  setImagens(imagens: FileImg[]): void{
    this.produto.imagens = imagens;
  }

  @action
  findIndexById = (id: number) => {
    let index = -1;
    for (let i = 0; i < this.produtos.length; i++) {
      if (this.produtos[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }



  @computed
  get all() {
    return Array.from(this.byId.values());
  }


}
export default createContext(new ProdutoStore());