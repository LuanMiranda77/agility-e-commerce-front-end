
import { ICategoria } from "./ICategoria";

export interface IProduto{
  id: number;
  codigoBarras: string;
  titulo: string;
  precoVarejo: number;
  precoAtacado: number;
  quantidade: number;
  descricao: string;
  estrelas: number;
  peso: number;
  comprimento: number;
  altura: number;
  largura: number;
  imagens: Array<any>;
  categorias: Array<ICategoria>;
}