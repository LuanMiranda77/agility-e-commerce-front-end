import { Divider } from 'primereact/divider';
import React, { useEffect, useContext, useState, useRef } from 'react';
import Summary from '../../components/Summary';
import { Container } from './styles';
import { Card } from 'primereact/card';
import { HeaderAdmin } from '../../components/HeaderAdmin';
import FooterAdmin from '../../components/FooterAdmin';
import { Carousel } from 'primereact/carousel';
import { IProduto } from '../../domain/types/IProduto';
import { ProdutoService } from '../../services/ProdutoServices/produtoServices';
import ProdutoStore from "../../stores/ProdutoStore"
import { Utils } from '../../utils/utils';
import { Toast } from 'primereact/toast';


const Dashbord: React.FC = () => {
  const tiker = 2000;
  const pedidoRealizados = 300000;
  const pedidoPagos = 500000;
  const pedidoCancelados = 30000;
  const total = Utils.formatCurrency(5000);
  const msg = useRef<Toast>(null);

  const store = useContext(ProdutoStore);
  const [produtos, setProduto]= useState<IProduto[]>([]);


  const produtoService = new ProdutoService();

  useEffect(() => {
    produtoService.getProdutos().then(data => setProduto(data))
    .catch(error => {
      Utils.messagemShow(msg,'error', 'Erro de listagem', error.mensagemUsuario,5000);
    });
  }, []);

  const responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '600px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1
    }
];

  const productTemplate = (product: IProduto) => {
    return (
      <div className="product-item">
        <div className="product-item-content">
          <div className="p-mb-3">
            <img src={product.imagens[0].objectURL} style={{ width: '3rem' }} onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.titulo} className="product-image" />
          </div>
          <div>
            <h4 className="p-mb-1">{"Nome:" + product.titulo}</h4>
            <h6 className="p-mt-0 p-mb-1">{"500 itens vendidos | Ultima venda 4 horas"}</h6>
          </div>
        </div>
      </div>
    );
  }


  return <Container>
    <HeaderAdmin />
    <div className="p-grid center p-mb-2">
      <Summary label="Ticket médio" description={tiker + "- item por pedido"} value={tiker} icon="pi pi-money-bill" color="#2C73D2" />
      <Summary label="Pedido realizados" description={pedidoRealizados + "- item por pedido"} value={pedidoRealizados} icon="pi pi-shopping-cart" color="#1ABC9C" />
      <Summary label="Pedido pagos" description={pedidoPagos + "- item por pedido"} value={pedidoPagos} icon="pi pi-shopping-cart" color="#62A9A5" />
      <Summary label="Pedidos cancelados" description={pedidoPagos + "- item por pedido"} value={pedidoCancelados} icon="pi pi-shopping-cart" color="#E74C3C" />
    </div>
    <div className="title p-felx">
      <label className="p-text-bold">Vendas total</label>
      <Divider className="divider" />
    </div>
    <Card className="p-shadow-5 total-style">
      <label className="p-text-bold">{total}</label>
    </Card>
    <div className="title p-felx">
      <label className="p-text-bold">Detalhes de vendas  no varejo</label>
      <Divider className="divider" />
    </div>
    <div className="p-grid center">
      <Summary label="Total de venda" description={tiker + "- item por pedido"} value={tiker} icon="" color="black" />
      <Summary label="Cartão" description={pedidoRealizados + "- item por pedido"} value={pedidoRealizados} icon="" color="black" />
      <Summary label="Boleto" description={pedidoPagos + "- item por pedido"} value={pedidoPagos} icon="" color="black" />
    </div>
    <div className="title p-felx">
      <label className="p-text-bold">Detalhes de vendas  no atacado</label>
      <Divider className="divider" />
    </div>
    <div className="p-grid center">
      <Summary label="Total de venda" description={tiker + "- item por pedido"} value={tiker} icon="" color="black" />
      <Summary label="Cartão" description={pedidoRealizados + "- item por pedido"} value={pedidoRealizados} icon="" color="black" />
      <Summary label="Boleto" description={pedidoPagos + "- item por pedido"} value={pedidoPagos} icon="" color="black" />
    </div>
    <div className="title p-felx">
      <Divider className="divider" />
    </div>
    <div className=" p-shadow-5 card p-mb-6">
      <label className="p-text-bold p-p-5 p-mt-5" style={{color: '#1ABC9C'}}>Os mais vendidos</label>
        <Carousel value={produtos} numVisible={4} numScroll={4} responsiveOptions={responsiveOptions} className="custom-carousel" circular
          autoplayInterval={5000} itemTemplate={productTemplate} />
    </div>
    <FooterAdmin />
    <Toast ref={msg} />
  </Container>;
}

export default Dashbord;