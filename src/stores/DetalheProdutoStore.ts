import { IFrete } from './../domain/types/IFrente';
import { makeObservable, observable } from "mobx";
import { createContext } from "react";
import { FileImg } from "../domain/types/FileImg";
import { ICategoria } from "../domain/types/ICategoria";
import { IProduto } from './../domain/types/IProduto';

class DetalheProdutoStore {




  @observable
  objPage = {
    //adicionar atributos aqui
    cep: '',
    quantidade: 1,
    color1: '#F47C1A',
    color2: '#d3d3d3',
    campoDescricao: '',
    imagemPrincipal: '',
    frete: {
      sCepOrigem: '58500000',
      sCepDestino: "",
      nVlPeso: '',
      nCdFormato: '1',
      nVlComprimento: '',
      nVlAltura: '',
      nVlLargura: '',
      nCdServico: ["04014", "04510"],
      nVlDiametro: "0",
    }
  };

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
    status:'',
    imagens: new Array<FileImg>(),
    categoria: { id:0, nome:'', idCategoriaPai:'',idCategoriaFilha: ''}
  };

  @observable
  resultFrete = {
    Codigo: "",
    Valor: "",
    PrazoEntrega: "",
    ValorSemAdicionais: "",
    ValorMaoPropria: "",
    ValorAvisoRecebimento: "",
    ValorValorDeclarado: "",
    EntregaDomiciliar: "",
    EntregaSabado: "",
    Erro: ""
  }

  @observable
  produto: IProduto;






  constructor() {
    makeObservable(this);
    this.produto = this.objNew;
    this.objPage.campoDescricao = this.produto.descricao;
  }


}
export default createContext(new DetalheProdutoStore());