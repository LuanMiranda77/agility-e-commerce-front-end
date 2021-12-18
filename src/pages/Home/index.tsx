import React, { useContext, useEffect, useState, useRef } from "react"

import { Container } from './styles';
import { observer } from 'mobx-react-lite';
import HomeStore from "../../stores/HomeStore";
import { HeaderCliente } from '../../components/HeaderCliente'
import { FooterCliente } from '../../components/FooterCliente'
import { Galleria } from 'primereact/galleria';
import { Divider } from "primereact/divider";
import { Carousel } from "primereact/carousel";
import { IProduto } from "../../domain/types/IProduto";
import { ProdutoService } from "../../services/ProdutoService/produtoServices";
import { Toast } from "primereact/toast";
import { Utils } from "../../utils/utils";
import { Rating } from "primereact/rating";
import config from "../../config/index.json";
import { DataView, DataViewLayoutOptions, DataViewSortOrderType } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { ButtonBase } from "../../components/ButtonBase";
import { useHistory } from 'react-router-dom';

/**
*@Author Luan Mirnada
*@Issue AE-25
*/

const Home: React.FC = () => {
  const store = useContext(HomeStore);
  const msg = useRef<Toast>(null);
  const history = useHistory();
  const [produtos, setProduto] = useState<IProduto[]>([]);
  const produtoService = new ProdutoService();

  const [images, setImages] = useState([
    { itemImageSrc: 'https://images.tcdn.com.br/img/img_prod/789097/1623690285_banner_site_-_full_banner_-_2110_px_3.jpg', alt: 'banner-1' },
    { itemImageSrc: 'https://www.camadijoias.com.br/imagens/banner1.jpg', alt: 'banner-1' },
    { itemImageSrc: 'https://www.pratafina.com.br/blog/wp-content/uploads/2019/06/Blog_Banner-Joias_Personalizadas.jpg', alt: 'banner-1' }
  ]);

  const responsiveOptions = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 }
  ];

  const itemTemplate = (item: any) => {
    return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', height: '300px', display: 'block' }} />;
  }

  //produto templante
  const productTemplate = (product: IProduto) => {
    let img = '';
    if (product.imagens[0].objectURL) {
      img = product.imagens[0].objectURL;
    }

    return (
      <div className="product-item">
        <div id='produto-3'className="cursor-pointer product-item-content p-shadow-2" onClick={() =>onEventDetalhesProduto(product.id)}>
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

  //listagem de produtos
  const [layout, setLayout] = useState('grid');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState<DataViewSortOrderType>();
  const [sortField, setSortField] = useState('');
  const sortOptions = [
    { label: 'Preço alto para baixo', value: '!price' },
    { label: 'Preço baixo para alto', value: 'price' },
  ];

  const onSortChange = (event: any) => {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    }
    else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  }

  const renderListItem = (product: IProduto) => {
    let img = '';
    if (product.imagens[0].objectURL) {
      img = product.imagens[0].objectURL;
    }
    return (
      <div className="p-col-12">
        <div id='produto-2' className="cursor-pointer product-list-item" onClick={() =>onEventDetalhesProduto(product.id)}>
          <img src={img} onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.titulo} className="product-image" />
          <div className="product-list-detail">
            <div className="product-name">{product.titulo}</div>
            {/* <div className="product-description">{data.description}</div> */}
            <Rating value={product.estrelas} readOnly cancel={false}></Rating>
            <i className="pi pi-tag product-category-icon"></i>
            <span className="product-category">{product.categorias[0].nome}</span>
          </div>
          <div className="product-list-action">
            <span className="product-price">{Utils.formatCurrency(product.precoVarejo)}</span>
            <ButtonBase className='p-button-success' icon="pi pi-shopping-cart" label="Carrinho" disabled={product.quantidade === 0}></ButtonBase>
            {/* <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span> */}
          </div>
        </div>
      </div>
    );
  }

  const renderGridItem = (product: IProduto) => {
    let img = '';
    if (product.imagens[0].objectURL) {
      img = product.imagens[0].objectURL;
    }
    return (
      <div className="p-col-12 p-md-3">
        <div id='produto-1' className="cursor-pointer product-grid-item p-shadow-2" onClick={() =>onEventDetalhesProduto(product.id)}>
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{product.categorias[0].nome}</span>
            </div>
            <div className="frete-gratis">
              <span className={`product-badge status-success`}>{'Frete Grátis'}</span>
            </div>
          </div>
          <div className="product-grid-item-content">
            <img src={img} onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.titulo} className="product-image" />
            <div className="product-name">{product.titulo}</div>
            {/* <div className="product-description">{data.description}</div> */}
            <Rating value={product.estrelas} readOnly cancel={false}></Rating>
            <span className="product-price">{Utils.formatCurrency(product.precoVarejo)}</span>
          </div>
          <div className="product-grid-item-bottom">
            <small>{'266 vendidos'}</small>
            {product.quantidade === 0 ? 
            <div className="text-esgotado p-text-bold p-p-2"><label htmlFor="">ESGOTADO</label></div>
            :<ButtonBase className='p-button-success' icon="pi pi-shopping-cart" label="Carrinho" disabled={product.quantidade === 0}></ButtonBase>}
          </div>
        </div>
      </div>
    );
  }

  const itemTemplateLista = (product: any, layout: any) => {
    if (!product) {
      return ;
    }

    if (layout === 'list')
      return renderListItem(product);
    else if (layout === 'grid')
      return renderGridItem(product);
  }

  const renderHeader = () => {
    return (
      <div className="p-grid p-nogutter">
        <div className="p-col-6" style={{ textAlign: 'left' }}>
          <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Ordenar por preço" onChange={onSortChange} />
        </div>
        <div className="p-col-6" style={{ textAlign: 'right' }}>
          <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
      </div>
    );
  }

  const header = renderHeader();

  const onEventDetalhesProduto = (idProduto: number) => {
        history.push(`detalheproduto/${idProduto}`)
  }

  return <Container>
    <HeaderCliente />
    <div className='banner-top'>
      <Galleria value={images}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        style={{ maxWidth: '100%', maxheight: '300px' }}
        showThumbnails={false}
        showIndicators
        changeItemOnIndicatorHover
        item={itemTemplate}
        circular autoPlay transitionInterval={2000}
      />
    </div>
    <div className='p-col-12'>
      <div className='card'>
        <label className='text-title' htmlFor="title">Veja as últimas novidades selecionadas para você!</label>
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
    <div className='banner-meio'>
      <img src={config.ACESS_TOKEN_MERC_PAGO} alt="banner"
        style={{ width: '100%', height: '200px' }} />
    </div>
    <div className='p-col-12'>
      <div className='card'>
        <label className='text-title' htmlFor="title">Os Tops para você</label>
        <Divider />
        <div className="dataview-demo">
          <div className="card">
            <DataView value={produtos} layout={layout} header={header}
              itemTemplate={itemTemplateLista} paginator 
              sortField={sortField} sortOrder={sortOrder} rows={12}
               
              />
          </div>
        </div>
      </div>
    </div>
    <FooterCliente />
    <Toast ref={msg} />
  </Container>;
}
export default observer(Home);