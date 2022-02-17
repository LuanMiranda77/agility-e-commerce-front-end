import React, { useRef, useContext, useEffect, useState } from "react"

import { Container } from './styles';
import { observer } from 'mobx-react-lite';
import CarrinhoStore from "../../stores/CarrinhoStore";
import PedidoStore from "../../stores/PedidoStore";
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
import { InputNumber } from "primereact/inputnumber";
import { useHistory } from 'react-router-dom';
import { ModalLoad } from "../../components/ModalLoad";
import { PedidoService } from "../../services/PedidoService/pedidoService";

/**
*@Author Carlos Avelino
*@Issue <AE-27>Tela detalhe de Carrinho de Compras</AE-27>
*/

const Carrinho: React.FC = () => {
  const store = useContext(CarrinhoStore);
  const storePedido = useContext(PedidoStore);
  let itemPedido = {  pedido: {}, produto: {}, quantidadeVendida: 0};
  const msg = useRef<Toast>(null);
  const [produtos, setProduto] = useState<IProduto[]>([]);
  const produtoService = new ProdutoService();
  const [modalLoad, setModalLoad] = useState(false);
  const [carrinho, setCarrinho] = useState<Array<IProduto>>([]);
  let [total, setTotal] = useState(0);
  const history = useHistory();
  const pedidoService = new PedidoService();


  const listaCarrinho = () => {
    let _carrinho = getDadosLocalStorage();
    produtos.map((item: any) => {
      return <div className='p-col-12'>
        <div className='p-grid'>
          <div>
            <img src={item.imagens[0].objectURL ? item.imagens[0].objectURL : 'https://e7.pngegg.com/pngimages/400/322/png-clipart-for-liturgical-year-open-graphics-illustration-box-black-and-white-angle-furniture.png'} alt="" />
          </div>
          <div>
            <h2>{item.titulo}</h2>
          </div>
          <div>
            <label className='p-mr-5'>Quantidade</label>
            <InputNumber style={{ width: '5rem' }}
              inputId="horizontal" value={item.quantidade}
              onValueChange={(e) => item.quantidade === 0 ? item.quantidade = 1 : item.quantidade = e.value}
              showButtons
              buttonLayout="horizontal" step={1}
              decrementButtonClassName="p-button-danger"
              incrementButtonClassName="p-button-success"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
            />
          </div>
          <div>
            <label htmlFor="">|Total:<span className='p-text-bold p-ml-1' style={{ color: 'var(--secondary)' }}>{item.precoVarejo}</span></label>
          </div>
          <div>
            <ButtonBase icon='pi pi-trash' label='REMOVER'></ButtonBase>
          </div>
        </div>
      </div>
    });
  }

  const setDadosLocalStorage = (carrinho: any) => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  const getDadosLocalStorage = () => {
    return JSON.parse(localStorage.getItem("carrinho") || "[]");
  }

  useEffect(() => {
    produtoService.getProdutos().then(
      data => {
        setProduto(data);
      }
    ).catch(error => {
      Utils.messagemShow(msg, 'error', 'Erro de listagem', error.mensagemUsuario, 5000);
    });
  }, []);

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

  const removerProdutoCarrinho = (idProduto: number) =>{
    let produtos = getDadosLocalStorage();
    produtos = produtos.filter((item: IProduto) => item.id !== idProduto);
    setDadosLocalStorage(produtos);
    window.location.reload();
  }

  const calculoCarrinho = (quantidade: number, idProduto: number) => {
    let produtos = getDadosLocalStorage();
    produtos.forEach((item: IProduto) => {
        if(item.id === idProduto ){
          item.quantidade = quantidade;
        }
    });
    setDadosLocalStorage(produtos);
    window.location.reload();

  }

  const calcularPedido = (lista: []) =>{
     let total
     lista.forEach((e) => e)
  }

  const createPedido = () =>{
    setModalLoad(true);
    let cliente = Utils.getClienteLocal();
    storePedido.pedido.cliente = cliente;
    let endereco = cliente.enderecos?.find((e) => e.padrao === 'S');
    if(endereco){
      endereco.id = null;
      delete endereco.padrao;
    }
    storePedido.loadEndereEntrega(endereco ? endereco : storePedido.endereco);
    storePedido.pedido.valorFrete = store.objPage.valorFrete;
    storePedido.pedido.valorDesconto = store.objPage.valorDesconto;
    storePedido.pedido.valorTotal = (total + store.objPage.valorFrete) - store.objPage.valorDesconto;
    storePedido.pedido.produtos = getDadosLocalStorage().map((e: any) => {
      let pedCopy = {...storePedido.pedido}
      itemPedido.produto=e;
      pedCopy.produtos=[];
      itemPedido.pedido=pedCopy;
      itemPedido.quantidadeVendida = e.quantidade;
      return itemPedido; 
    });
    console.log(storePedido.pedido);
    // return false;
    pedidoService.save(storePedido.pedido).then(data =>{
      setModalLoad(false);
      setDadosLocalStorage([]);
      storePedido.pedido = data;
      history.push('/checkout');
    }
    ).catch(error => {
      setModalLoad(false);
      Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
    });
  }

  return <Container>
    <HeaderCliente />
    <div className='p-col-12 top'>
      <div className='title-top card' style={{color: 'var(--text-title)'}}><h2>Carrinho de compras</h2> </div>
      {getDadosLocalStorage().map((item: any) => {
      total+=item.quantidade * item.precoVarejo;  
      return <div className='p-col-12'>
        <div className='p-grid card p-shadow-2'>
          <div className='p-col-1 p-text-center'>
            <img className='img-lista'  src={item.imagens[0].objectURL ? item.imagens[0].objectURL : 'https://e7.pngegg.com/pngimages/400/322/png-clipart-for-liturgical-year-open-graphics-illustration-box-black-and-white-angle-furniture.png'} alt="" />
          </div>
          <div className='p-col-4 p-mt-2'>
            <h2>{item.titulo}</h2>
          </div>
          <div className='p-col-3 p-mt-2'>
            <label className='p-mr-5'>Quantidade</label>
            <InputNumber style={{ width: '0.3rem', size: '0.25rem' }}
              inputId="horizontal" value={item.quantidade}
              onValueChange={(e) => {calculoCarrinho(e.value, item.id)}}
              showButtons
              buttonLayout="horizontal" step={1}
              decrementButtonClassName="p-button-danger"
              incrementButtonClassName="p-button-success"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
            />
          </div>
          <div className='p-col-2 p-text-center p-mt-2'>
            <label htmlFor="">Total:<span className='p-text-bold p-ml-1' style={{ color: 'var(--secondary)' }}>{Utils.formatCurrency(item.quantidade * item.precoVarejo)}</span></label>
          </div>
          <div className='p-col-2 p-text-right p-mt-2'>
            <ButtonBase className='p-button-warning'  icon='pi pi-trash' label='REMOVER'onClick={() => removerProdutoCarrinho(item.id)} ></ButtonBase>
          </div>
        </div>
      </div>
      })};
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
          <div className='p-col-6'>
            <div className='p-mr-2 p-col-12'>
              <div className='p-grid'>
                <label className='label-frete p-text-bold p-mr-2 p-mt-2' htmlFor="frete">Insira o Cupom de desconto </label>
                <InputText className='p-mr-2' type="text" />
                <ButtonBase label='Aplicar' icon='' className='p-button-warning'/>
              </div>
            </div>
          </div>
        </div>
        <div className='p-field p-grid label-valor p-text-bold'>
          <label className='p-col-12 ' htmlFor="">Valor do Frete: <span className='p-ml-3 label-frete'>{Utils.formatCurrency(store.objPage.valorFrete)}</span></label>
          <label className='p-col-12' htmlFor="">Cupom de desconto: <span className='p-ml-3 label-frete'>{Utils.formatCurrency(store.objPage.valorDesconto)}</span></label>
          <label className='p-col-12' htmlFor="">Valor Produtos: <span className='p-ml-3 label-frete'>{Utils.formatCurrency(total)}</span></label>
        </div>
        <div className='p-grid'>
          <div className='p-col-6'>
            <h1 className='label-frete'>TOTAL A PAGAR:  <span className='p-ml-3' style={{ color: 'var(--primary)' }}>{Utils.formatCurrency(total + store.objPage.valorFrete - store.objPage.valorDesconto)}</span></h1>
          </div>
          <div className='p-col-6 p-text-right'>
            <ButtonBase icon='pi pi-check-circle' label='Finalizar pedido' className='p-button-success p-text-uppercase p-pl-6 p-pr-6 p-pt-4 p-pb-4' onClick={createPedido} />
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
    <ModalLoad visible={modalLoad} />
    <Toast ref={msg} />
  </Container>;
}
export default observer(Carrinho);