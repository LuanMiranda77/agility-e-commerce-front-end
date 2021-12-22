import React, { useContext, useEffect, useState, useRef } from "react"

import { Container } from './styles';
import { observer } from 'mobx-react-lite';
import DetalheProdutoStore from "../../stores/DetalheProdutoStore"
import { HeaderCliente } from "../../components/HeaderCliente";
import { FooterCliente } from "../../components/FooterCliente";
import { ProdutoService } from "../../services/ProdutoService/produtoServices";
import { Toast } from "primereact/toast";
import { Utils } from "../../utils/utils";
import { Rating } from "primereact/rating";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from 'primereact/inputmask';
import { ButtonBase } from "../../components/ButtonBase";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Image } from 'primereact/image';
import { PedidoService } from "../../services/PedidoService/pedidoService";
import { useHistory } from 'react-router-dom';
import { IProduto } from "../../domain/types/IProduto";
/**
*@Author Luan Miranda 
*@Issue AE-24
*/

const DetalheProduto: React.FC = (props: any) => {
  const store = useContext(DetalheProdutoStore);
  const produtoService = new ProdutoService();
  const toast = useRef<Toast>(null);
  const history = useHistory();
  const [selectedCity1, setSelectedCity1] = useState<any>(null);

  useEffect(() => {
    produtoService.findProduto(props.match.params.id).then(data => {
      store.produto = data;
      store.objPage.campoDescricao = store.produto.descricao;
      if (store.produto.imagens.length > 0) {
        store.objPage.imagemPrincipal = store.produto.imagens[0].objectURL;
      }
    }).catch(error => {
      Utils.messagemShow(toast, 'info', `AVISO`, error.mensagemUsuario, 3000);
    });
  }, [props.match.params.id]);

  const cities = [
    { name: 'pracelar-1x', code: 'pv' },
    { name: 'pracelar-2x', code: 'RM' },
    { name: 'pracelar-3x', code: 'LDN' },
    { name: 'pracelar-4x', code: 'IST' },
    { name: 'pracelar-5x', code: 'PRS' }
  ];

  const onCityChange = (e: { value: any }) => {
    setSelectedCity1(e.value);
  }

  const calculaFrete = () =>{
    store.objPage.frete.nVlAltura = ''+store.produto.altura;
    store.objPage.frete.nVlPeso = ''+store.produto.peso;
    store.objPage.frete.nVlComprimento = ''+store.produto.comprimento;
    store.objPage.frete.nVlLargura = ''+store.produto.largura;
    store.objPage.frete.sCepDestino = store.objPage.cep;
    const pedidoService = new PedidoService();
    pedidoService.calculaFrete(store.objPage.frete).then(result =>{
      store.resultFrete = {...result[1]};
    }).catch(error => {
      Utils.messagemShow(toast, 'info', `AVISO`, error.mensagemUsuario, 3000);
    });;
  }

  const onClickDescricao = (id: number) => {
    let color1 = '#F47C1A';
    let color2 = '#d3d3d3';

    if (id === 1) {
      store.objPage.color1 = color1;
      store.objPage.color2 = color2;
      store.objPage.campoDescricao = store.produto.descricao;
    } else {
      store.objPage.color1 = color2;
      store.objPage.color2 = color1;
      store.objPage.campoDescricao = 'termo de garantia'
    }
  }

  const listaImgens = () => {
    store.produto.imagens.map(item =>
      <div className="">
        <img className="img-pequena" src={'https://cf.shopee.com.br/file/ded58046f39cf91196ac3154f36ecdea'} alt="" />
      </div>
    )
  }

  const trocaImagens = (url: string) => {
    store.objPage.imagemPrincipal = url;
  }

  const productTemplate = () => {
    const product = store.produto;
    let img = '';
    if (product.imagens[0].objectURL) {
      img = product.imagens[0].objectURL;
    }

    return (
      <div className="product-item">
        <div className="product-item-content p-shadow-2">
          <div className="p-mb-3 p-mt-3 p-text-center">
            <img src={img} onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
              alt={product.titulo}
              className="product-image" />
          </div>
          <div className='p-p-2'>
            <h5 className="p-mb-1">{product.titulo}</h5>
            <label className='preco p-text-bold' htmlFor="preco">{Utils.formatCurrency(product.precoVarejo)}</label>
          </div>
          <div className='p-p-2 p-text-right'>
            <Rating value={product.estrelas} readOnly stars={5} cancel={false} />
            <small className='p-ml-3'>266 vendidos</small>
          </div>
        </div>
      </div>
    );
  }

  const setDadosLocalStorage = (carrinho: any) => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  const getDadosLocalStorage = () => {
    return JSON.parse(localStorage.getItem("carrinho") || "[]");
  }

  const addCarrinho = (produto: IProduto) => {
      let array = getDadosLocalStorage();
      array.push(produto);
      setDadosLocalStorage(array);
      window.location.reload();
  }

  return <Container>
    <HeaderCliente />
    <div className="p-col-12 top p-p-3">
      <div className="p-grid p-p-2  card">
        <div className="p-sm-12 p-md-12 p-lg-6 p-xl-6">
          <div className="p-grid ">
            <div className="p-col-2">
              {store.produto.imagens.map((item, key) =>
                <div className="">
                  <img className="curson-pointer img-pequena" src={item.objectURL} alt="" onClick={() => trocaImagens(item.objectURL)} />
                </div>
              )}
            </div>
            <div className="p-col-10">
              {/* <Image src="https://cf.shopee.com.br/file/ded58046f39cf91196ac3154f36ecdea" alt="Image" 
              width="250" template="Preview Content" 
              preview/> */}
              <img className="img-grande" src={store.objPage.imagemPrincipal} alt="" />
            </div>
          </div>
          <div className="p-mt-5">
            <label className="text-compartilha p-mr-3">Compartilhar:</label>
            <Button icon="pi pi-facebook p-px-2" className="p-button-rounded p-button-help p-mr-2" />
            <Button icon="pi pi-twitter p-px-2" className="p-button-rounded" />
          </div>
        </div>

        <div className="p-sm-12 p-md-12 p-lg-6 p-xl-6 p-pl-6">
          <div className="p-field p-text-bold">
            <label htmlFor="">{store.produto.titulo}</label>
          </div>
          <div className='p-field p-grid p-p-2'>
            <Rating value={store.produto.estrelas} readOnly stars={5} cancel={false} />
            <small className='p-ml-3'>266 vendidos</small>
          </div>
          <div className="p-field p-p-3" style={{ background: '#d3d3d3', height: '4rem', borderRadius: '0.20rem' }}>
            <h1 className="p-text-bold" style={{ color: 'var(--secondary)' }}>{Utils.formatCurrency(store.produto.precoVarejo)}</h1>
          </div>
          <div className="p-field p-mt-4">
            <label className='p-mr-3'>Parcelamento</label>
            <Dropdown value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Selecinar parcela" />
          </div>
          <div className="p-field p-mt-6">
            <label className='p-mr-5'>Quantidade</label>
            <InputNumber
              className="p-ml-1"
              inputId="horizontal" value={store.produto.quantidade}
              onValueChange={(e) => store.produto.quantidade === 0 ? store.produto.quantidade = 1 : store.produto.quantidade = e.value}
              showButtons
              buttonLayout="horizontal" step={1}
              decrementButtonClassName="p-button-danger"
              incrementButtonClassName="p-button-success"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
            />
          </div>
          <div className="p-grid p-field  p-mt-6">
            <label className='p-mr-3 pl-ml-2'>Consultar frete</label>
            <InputMask className="cep" id='cep' name='cep' mask='99999-999' value={store.objPage.cep} placeholder="99999-999" onChange={(e) => store.objPage.cep = e.value} />
            <ButtonBase className="but-cep p-p-2" icon='' label='OK' onClick={calculaFrete} />
            {store.resultFrete.Codigo !== '' && store.objPage.cep !== '' ? <small className="p-text-bold p-ml-3 p-mt-2" style={{ color: 'var(--green)' }}>{`${store.resultFrete.PrazoEntrega} dias úteis, R$ ${store.resultFrete.Valor}`}</small> : ''}
          </div>
          <div className="p-grid p-mt-5">
            <div className="p-col-6 p-field">
              <ButtonBase icon='pi pi-shopping-cart' label="ADICIONAR SACOLA" className="p-button-outlined p-button-warning p-p-3" onClick={() => addCarrinho(store.produto)} />
            </div>
            <div className="p-col-6 p-field">
              <ButtonBase icon='pi pi-check-circle' label="COMPRAR AGORA" className="p-button-success p-p-3" onClick={() =>history.push('/checkout')}  />
            </div>
          </div>
        </div>


      </div>
      <div className="p-mt-5">
      </div>
      <div className="p-grid">
        <div className="p-col-9">
          <div className="card p-p-3">
            <small className="p-text-bold" style={{ color: 'var(--green)' }}>Informações do produto</small>
            <Divider />
            <small className="curson-pointer p-mr-3 p-text-bold" style={{ color: `${store.objPage.color1}` }} onClick={() => { onClickDescricao(1) }}>Descrição do produto</small>
            <small className="p-mr-3 p-text-bold">|</small>
            <small className="curson-pointer p-text-bold" style={{ color: `${store.objPage.color2}` }} onClick={() => { onClickDescricao(2) }}>Termos e garantia do produto</small>
            <div className="p-p-3 p-mt-3" style={{ background: '#d3d3d3', height: '20rem', borderRadius: '0.20rem' }}>
              <label htmlFor="">{store.objPage.campoDescricao}</label>
            </div>
          </div>
        </div>
        <div className="p-col-3">
          <div className="card p-p-3">
            <small className="p-text-bold" style={{ color: 'var(--green)' }}>O top da semana</small>
            <Divider />
            {() => productTemplate}
          </div>
        </div>
      </div>

    </div>
    < FooterCliente />
    <Toast ref={toast} />
  </Container>;
}
export default observer(DetalheProduto);