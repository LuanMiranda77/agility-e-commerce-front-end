import { ImagemProduto } from "./ImagemProduto";

export interface IProduto{
  id: number;
  codigoBarras: string;
  nome: string;
  precoVarejo: number;
  precoAtacado: number;
  quantidade: number;
  descricao: string;
  estrelas: number;
  imagens: ImagemProduto[];
}