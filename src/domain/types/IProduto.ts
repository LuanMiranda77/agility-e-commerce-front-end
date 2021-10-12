import { FileImg } from "./FileImg";
import { ICategoria } from "./ICategoria";
import { ImagemProduto } from "./ImagemProduto";

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
  imagens: FileImg[];
  categorias: ICategoria[];
}