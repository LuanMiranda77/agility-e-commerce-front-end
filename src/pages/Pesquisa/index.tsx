import { Divider } from "@material-ui/core";
import { observer } from 'mobx-react-lite';
import { Checkbox } from "primereact/checkbox";
import { DataView, DataViewLayoutOptions, DataViewSortOrderType } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Rating } from "primereact/rating";
import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ButtonBase } from "../../components/ButtonBase";
import { FooterCliente } from "../../components/FooterCliente";
import { HeaderCliente } from "../../components/HeaderCliente";
import { IProduto } from "../../domain/types/IProduto";
import { ProdutoService } from "../../services/ProdutoService/produtoServices";
import PesquisaStore from "../../stores/PesquisaStore";
import { Utils } from "../../utils/utils";
import { Container } from './styles';
import { useHistory } from 'react-router-dom';


/**
*@Author
*@Issue
*/

const Pesquisa: React.FC = (props: any) => {
  const store = useContext(PesquisaStore);
  const produtoService = new ProdutoService();
  const toast = useRef<Toast>(null);
  const [produtos, setProduto] = useState<IProduto[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const history = useHistory();

  const filterProdutos = (tipo: string, dados: string) => {
    produtoService.filterProdutos(tipo, dados).then(data => {
      setProduto(data);
    }).catch(error => {
      Utils.messagemShow(toast, 'info', `AVISO`, error.mensagemUsuario, 3000);
    });
  }

  useEffect(() => {
    console.log('dfdsf')
    if (props.match.params.filter.substr(1, 1) === '!') {
      let categ = props.match.params.filter.split('!');
      filterProdutos('CATEGORIA',categ[1]);
    } else {
      produtoService.pesquisaProdutosByTitle(props.match.params.filter).then(data => {
        setProduto(data);
      }).catch(error => {
        Utils.messagemShow(toast, 'info', `AVISO`, error.mensagemUsuario, 3000);
      });
    }
  }, [props.match.params.filter]);




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
        <div id='produto-list' className="cursor-pointer product-list-item" onClick={() =>onEventDetalhesProduto(product.id)}>
          <img src={img} onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.titulo} className="product-image" />
          <div className="product-list-detail">
            <div className="product-name">{product.titulo}</div>
            {/* <div className="product-description">{data.description}</div> */}
            <Rating value={product.estrelas} readOnly cancel={false}></Rating>
            <i className="pi pi-tag product-category-icon"></i>
            <span className="product-category">{product.categoria.nome}</span>
          </div>
          <div className="product-list-action">
            <span className="product-price">{Utils.formatCurrency(product.precoVarejo)}</span>
            <ButtonBase className='p-button-success' icon="pi pi-shopping-cart" label="Carrinho" disabled={product.quantidade === 0} onClick={() => addCarrinho(product)}></ButtonBase>
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
        <div id="produto-grid" className="cursor-pointer product-grid-item p-shadow-2" onClick={() =>onEventDetalhesProduto(product.id)}>
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{product.categoria.nome}</span>
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
              : <ButtonBase className='p-button-success' icon="pi pi-shopping-cart" label="Carrinho" disabled={product.quantidade === 0} onClick={() => addCarrinho(product)}></ButtonBase>}
          </div>
        </div>
      </div>
    );
  }

  const itemTemplateLista = (product: any, layout: any) => {
    if (!product) {
      return;
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
    console.log(history.replace('/'));
    history.push(`detalheproduto/${idProduto}`);
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


  return (
    <Container>
      <HeaderCliente />
      <div className="p-col-12 top">
        <div className="p-grid p-p-2">
          <div className="p-col-2">
            <div className="card p-col-12">
              <label className="p-text-bold " htmlFor="filtros">
                <i className="pi pi-filter p-mr-2 p-mb-3" style={{ 'fontSize': '1em' }}></i>
                Filtros
              </label>
              <Divider />
              <br />
              <div className="p-mb-2">
                <label htmlFor="">{'Serviço & Promoção'}</label>
                <div className="p-mt-2">
                  <Checkbox inputId="binary" checked={checked} onChange={e => setChecked(e.checked)} />
                  <label className="p-ml-2" htmlFor="filter">Desconto</label>
                </div>
                <div className="p-mt-2">
                  <Checkbox inputId="binary" checked={checked} onChange={e => setChecked(e.checked)} />
                  <label className="p-ml-2" htmlFor="filter">Frete grátis</label>
                </div>
              </div>
              <Divider className="p-mb-3" />
              <div className="p-mb-2">
                <label htmlFor="">{'Faixa de Preço'}</label>
                <div className="p-col-12">
                  <div className="p-grid p-mt-1 p-text-center">
                    {/* <InputText className="p-col-5 p-mr-1" type="number" placeholder="R$ Min" onChange={(e) => store.objPage.precoMin = e.currentTarget.value} />
                    <InputText className="p-col-5" type='number' placeholder="R$ Max" onChange={(e) => store.objPage.precoMax = e.currentTarget.value} /> */}
                    <InputNumber className="p-mb-2" placeholder="R$ MIN" onValueChange={(e) => store.objPage.precoMin = '' + e.value} mode="currency" currency="BRL" locale="pt-br" />
                    <InputNumber placeholder="R$ MAX" onValueChange={(e) => store.objPage.precoMax = '' + e.value} mode="currency" currency="BRL" locale="pt-br" />
                  </div>
                </div>
                <div className="p-mt-1 p-text-center">
                  <ButtonBase icon="pi pi-filter" label="filtra" className="p-col-10 p-button-success" onClick={() => filterProdutos('PRECO', store.objPage.precoMin + '-' + store.objPage.precoMax + '-V')} />
                </div>
              </div>
              <Divider className="p-mb-3" />
              <div>
                <label className="p-mb-3" htmlFor="">{'Avaliação'}</label>
                <div className="p-mt-3">
                  <div className="estrela p-mb-3 p-grid" onClick={() => filterProdutos('ESTRELA', '5')}>
                    <Rating value={5} readOnly cancel={false}></Rating>
                    <i className="pi pi-filter p-ml-3" style={{ 'fontSize': '1em' }}></i>
                  </div>
                  <div className="estrela p-mb-3 p-grid" onClick={() => filterProdutos('ESTRELA', '4')}>
                    <Rating value={4} readOnly cancel={false}></Rating>
                    <i className="pi pi-filter p-ml-3" style={{ 'fontSize': '1em' }}></i>
                  </div>
                  <div className="estrela p-mb-3 p-grid" onClick={() => filterProdutos('ESTRELA', '3')}>
                    <Rating value={3} readOnly cancel={false}></Rating>
                    <i className="pi pi-filter p-ml-3" style={{ 'fontSize': '1em' }}></i>
                  </div>
                  <div className="estrela p-mb-3 p-grid" onClick={() => filterProdutos('ESTRELA', '2')}>
                    <Rating value={2} readOnly cancel={false}></Rating>
                    <i className="pi pi-filter p-ml-3" style={{ 'fontSize': '1em' }}></i>
                  </div>
                  <div className="estrela p-mb-3 p-grid" onClick={() => filterProdutos('ESTRELA', '1')}>
                    <Rating value={1} readOnly cancel={false}></Rating>
                    <i className="pi pi-filter p-ml-3" style={{ 'fontSize': '1em' }}></i>
                  </div>
                </div>
              </div>
              <Divider className="p-mb-3" />
            </div>
          </div>
          <div className="p-col-10">
            <div className="card p-col-12">
              <label htmlFor="">
                <i className="pi pi-search p-mr-2 p-mb-3" style={{ 'fontSize': '1em' }}></i>
                {`Resultado da pesquisa para: `}
                <span className="p-text-bold p-text-uppercase" style={{ color: 'var(--primary)' }}>{
                  props.match.params.filter.substr(1, 1) === '!' ? 
                  props.match.params.filter.substr(2, props.match.params.filter.length) :
                  props.match.params.filter
                }
                </span>
              </label>
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
        </div>
      </div>
      <Toast ref={toast} />
      <FooterCliente />
    </Container>
  );
}
export default observer(Pesquisa);