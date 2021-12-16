import React, { useRef, useContext, useEffect, useState } from "react"

import { Container } from './styles';
import { observer } from 'mobx-react-lite';
import CarrinhoStore from "../../stores/CarrinhoStore"
import { HeaderCliente } from "../../components/HeaderCliente";
import { FooterCliente } from "../../components/FooterCliente";
import { ButtonBase } from "../../components/ButtonBase";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Divider } from "@material-ui/core";
import { Carousel } from "primereact/carousel";
import { Utils } from "../../utils/utils";
import { IProduto } from "../../domain/types/IProduto";
import { Rating } from "primereact/rating";
import { ProdutoService } from "../../services/ProdutoService/produtoServices";
import { Toast } from "primereact/toast";

/**
*@Author Carlos Avelino
*@Issue <AE-27>Tela detalhe de Carrinho de Compras</AE-27>
*/

const Carrinho: React.FC = () => {
  const store = useContext(CarrinhoStore);
  const msg = useRef<Toast>(null);
  const [produtos, setProduto] = useState<IProduto[]>([]);
  const produtoService = new ProdutoService();
  const listaCarrinho = () => {

  }

  useEffect(() => {
    produtoService.getProdutos().then(
      
      data =>{setProduto(data)}
    ).catch(error => {
      Utils.messagemShow(msg, 'error', 'Erro de listagem', error.mensagemUsuario, 5000);
    });
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const responsiveOptionsProduts = [
    { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
    { breakpoint: '600px', numVisible: 2, numScroll: 2 },
    { breakpoint: '480px', numVisible: 1, numScroll: 1 }
  ];

  //produto templante
  const productTemplate = (product: IProduto) => {
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

  return <Container>
    <HeaderCliente />
    <div className='p-col-12 top'>
      <div>{listaCarrinho}</div>
      <div className='p-col-12 card  p-p-3'>
        <div className='p-grid p-p-2'>
          <div className='p-col-6 p-grid'>
            <div className='label-frete p-text-bold p-mr-2 p-mt-3'>
              <label htmlFor="frete">Calcular Frete</label>
            </div>
            <div className='p-mr-2 p-mt-2'>
              <InputMask mask="99999-999" type="text" />
            </div>
            <div className='p-mt-2'>
              <ButtonBase label='Calcular' icon='' className='p-button-warning' />
            </div>
          </div>
          <div className='p-col-6 p-text-right'>
            <div className='p-mr-2 p-text-right p-col-12'>
              <div className='p-grid p-text-right'>
                <label className='label-frete p-text-bold p-mr-2 p-mt-2' htmlFor="frete">Insira o Cupom de desconto </label>
                <InputText className='p-mr-2' type="text" />
                <ButtonBase label='Aplicar' icon='' className='p-button-warning' />
              </div>
            </div>
          </div>
        </div>
        <div className='p-field p-grid label-valor p-text-bold'>
          <label className='p-col-12 ' htmlFor="">Valor do Frete: <span className='p-ml-3 label-frete'>R$ 65</span></label>
          <label className='p-col-12' htmlFor="">Cupom de desconto: <span className='p-ml-3 label-frete'>R$ 65</span></label>
          <label className='p-col-12' htmlFor="">Valor Produtos: <span className='p-ml-3 label-frete'>R$ 65</span></label>
        </div>
        <div className='p-grid'>
          <div className='p-col-6'>
            <h1 className='label-frete'>TOTAL A PAGAR:  <span className='p-ml-3' style={{ color: 'var(--primary)' }}>R$ 65</span></h1>
          </div>
          <div className='p-col-6'>
            <ButtonBase icon='pi pi-check-circle' label='Finalizar pedido' className='p-button-success p-text-uppercase p-pl-6 p-pr-6 p-pt-4 p-pb-4' />
          </div>
        </div>
      </div>
      <div className='p-col-12'>
        <div className='card p-p-3'>
          <label className='text-title' htmlFor="title">Quem comprou estes produtos, comprou estes também!</label>
          <Divider />
          <div>
            <Carousel value={produtos} numVisible={5} numScroll={5}
              responsiveOptions={responsiveOptionsProduts}
              className="custom-carousel p-mt-4"
              circular
              autoplayInterval={5000}
              itemTemplate={productTemplate}
            />
          </div>
        </div>
      </div>
    </div>
    <FooterCliente />
    <Toast ref={msg} />
  </Container>;
}
export default observer(Carrinho);