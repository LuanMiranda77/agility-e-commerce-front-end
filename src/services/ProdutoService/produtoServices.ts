import { MarketplaceService } from './../MarketplaceService/MarketplaceService';
import { IProduto } from "../../domain/types/IProduto";
import { api, imgur, integrador } from "../api";



export class ProdutoService {

  url = 'api/produto';

  public async save(pEntity: IProduto, check: Boolean): Promise<IProduto> {
    let cont = 0;
    for (let f of pEntity.imagens) {
      if (f && f.size < 5e6) {
        const formData = new FormData();
        // formData.append('image', f);
        formData.append('file', f);
        // const res = await imgur.post(`https://api.imgur.com/3/image`, formData);
        const res = await integrador.post(`api/m_livre/item/upload`, formData);
        pEntity.imagens[cont].objectURL = res.data.objectURL;
        pEntity.imagens[cont].hash = res.data.hash;
        pEntity.imagens[cont].nome = "|" + res.data.nome;
        pEntity.imagens[cont].tam = "|" + res.data.size;
      }
      cont++;
    }

    const response = await api.post(this.url, pEntity).then(response => {
        if (check === true) {
          this.enviarProdutoMercLivre(pEntity).then(data => {
            let obj = {id: null, produto: response, idMarkeplace: data.id, tipo:1}
            api.post(this.url+"/item-market", obj);
          }).catch(error => {
            return Promise.reject(error.response.data[0]);
          });;
        }
        return response.data;
      }).catch(error => {
        return Promise.reject(error.response.data[0]);
      });
    return response;
  }

  public async update(pEntity: IProduto): Promise<IProduto> {
    const response = await api.put(this.url + `/${pEntity.id}`, pEntity)
      .then(response => {
        if(pEntity.idMarketplace !== null || pEntity.idMarketplace !== ''){
           const marketService = new MarketplaceService();
           let objUpdate = {title: pEntity.titulo, descricao: pEntity.descricao}
           marketService.putProdutosByMercadoLivre(pEntity.idMarketplace, objUpdate);
        }
        return response.data;
      }).catch(error => {
        return Promise.reject(error.response.data[0]);
      });
    return response;
  }

  public async delete(id: number) {
    const response = await api.delete(this.url + `/${id}`).catch(error => {
      return Promise.reject(error.response.data[0]);
    });;
    return response;
  }

  public async deleteAll(array: IProduto[]) {
    const response = await api.post(this.url + `/deleteall`, array).then(response => {
      return response.data;
    }).catch(error => {
      return Promise.reject(error.response.data[0]);
    });
    return response;
  }

  public async getProdutos(): Promise<IProduto[]> {
    const response = await api.get(this.url).then(response => {
      return response.data;
    }).catch(error => {
      return Promise.reject(error.response.data[0]);
    });
    return response;
  }

  public async enviarProdutoMercLivre(produto: IProduto): Promise<any> {
    const response = await integrador.post('/api/m_livre/item', produto).then(result => {
      return result.data;
    }).catch(error => {
      console.error("Erro desenvolvedor:", error.response.data.mensagemDesenvolvedor);
      return Promise.reject(error.response.data.mensagemUsuario);
    });
    return response;
  }

  public async enviarProdutoMassa(array: Array<IProduto>): Promise<IProduto[]> {
    const response = await integrador.post('/api/m_livre/item', array).then(response => {
      return response.data;
    }).catch(error => {
      console.error("Erro desenvolvedor:", error.response.data.mensagemDesenvolvedor);
      return Promise.reject(error.response.data.mensagemUsuario);
    });
    return response;
  }

  public async pesquisaProdutosByTitle(params: string): Promise<IProduto[]> {
    const response = await api.get(this.url + `/busca/${params}`).then(response => {
      return response.data;
    }).catch(error => {
      return Promise.reject(error.response.data[0]);
    });
    return response;
  }

  public async filterProdutos(tipo: string, dados: string): Promise<IProduto[]> {
    const response = await api.get(this.url + `/filter/${tipo}&${dados}`).then(response => {
      return response.data;
    }).catch(error => {
      console.log(error.response);
      return Promise.reject(error.response.data[0]);
    });
    return response;
  }

  public async findProduto(id: number) {
    const response = await api.get(this.url + `/${id}`).then(response => {
      return response.data;
    }).catch(error => {
      console.log(error.response);
      return Promise.reject(error.response.data[0]);
    });
    return response;
  }




}