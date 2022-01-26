import React, { useEffect, useRef, useState, useContext } from 'react';

import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { Timeline } from 'primereact/timeline';
import { Toast } from 'primereact/toast';
import icon from "../../assets/icon-voltar.png";
import { ModalLoad } from '../../components/ModalLoad';
import { PedidoService } from '../../services/PedidoService/pedidoService';
import { Utils } from "../../utils/utils";
import { Carousel } from 'primereact/carousel';
import markets from './markets.json'
import { Container } from './styles';
import { observer } from 'mobx-react-lite';
import MarketplaceStore from "../../stores/MarketplaceStore"
import { HeaderAdmin } from '../../components/HeaderAdmin';
import { IProduto } from '../../domain/types/IProduto';
import { classNames } from 'primereact/utils'
import { ButtonBase } from '../../components/ButtonBase';
import { MarketplaceService } from '../../services/MarketplaceService/MarketplaceService';
import { Tag } from 'primereact/tag';

/**
*@Author
*@Issue
*/

const Marketplace: React.FC = () => {
  const store = useContext(MarketplaceStore);
  const [modalLoad, setModalLoad] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [maketId, setMarketId] = useState(0);
  const msg = useRef<Toast>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedProdutos, setSelectedprodutos] = useState<IProduto[]>([]);
  const marketplaceService = new MarketplaceService();

  // useEffect(() => {
  //   marketplaceService.findProdutosByMercadoLivre().then(data => {
  //     store.load(data)
  //   }).catch(error => {
  //     Utils.messagemShow(msg, 'info', `AVISO`, error.mensagemUsuario, 3000);
  //   });
  // }, []);

  const responsiveOptionsProduts = [
    { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
    { breakpoint: '600px', numVisible: 2, numScroll: 2 },
    { breakpoint: '480px', numVisible: 1, numScroll: 1 }
  ];

  const onFindBuscarProdutos = (id: number) => {
    setModalLoad(true);
    if (id === 1) {
      marketplaceService.findProdutosByMercadoLivre().then(data => {
        store.load(data);
        setModalLoad(false);
        setMarketId(id);
      }).catch(error => {
        setModalLoad(false);
        Utils.messagemShow(msg, 'error', '😱 Erro de carregamento', error.mensagemUsuario, 3000);
      });
    } else {
      setModalLoad(false);
      setMarketId(id);
    }

  }

  //templante de itens
  const productTemplate = (market: any) => {
    let img = '';
    if (market.logo) {
      img = market.logo;
    }

    return (
      <div className="product-item">
        <div id='market-1' className="cursor-pointer product-item-content p-shadow-2" onClick={() => onFindBuscarProdutos(market.id)}>
          <div className="p-mt-1 p-text-center">
            <img style={{ width: "100%" }} src={img} onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
              alt={market.nome}
              className="product-image" />
          </div>
          {/* <div className='p-p-2'>
            <h5 className="p-mb-1">{market.nome}</h5>
            <label className='preco p-text-bold' htmlFor="preco">{Utils.formatCurrency(market.descricao)}</label>
          </div>
          <div className='p-p-2 p-text-right'>
            <small className='p-ml-3'>266 vendidos</small>
          </div> */}
        </div>
      </div>
    );
  }

  const imageBodyTemplate = (rowData: IProduto) => {
    let imgURL = ''
    if (rowData.imagens[0]) {
      imgURL = rowData.imagens[0].url;
    }
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img
      id='link'
      src={imgURL}
      onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
      className="product-image"
    />
  }

  const priceBodyTemplate = (rowData: IProduto) => {
    return Utils.formatCurrency(rowData.precoAtacado);
  }

  const updateProduto = () => {

  }

  const updateStatus = (produto: any, tipo: number) => {
    setModalLoad(true);
    store.objUpdate.available_quantity = produto.quantidade;
    store.objUpdate.price = produto.precoVarejo;
    store.objUpdate.title = produto.titulo;
    store.objUpdate.price = produto.precoVarejo;
    if (tipo === 1) {
      store.objUpdate.status = 'active';
    } else {
      store.objUpdate.status = 'paused';
    }
    marketplaceService.putProdutosByMercadoLivre(produto.id, store.objUpdate).then(data => {
      store.produtos.map(item => {
        if (item.id === data.id) {
          item.status = data.status;
        }
      });
      setModalLoad(false);
      Utils.messagemShow(msg, 'success', 'Salvo', '😃 Anúncio pausado com sucesso', 5000);
    }).catch(error => {
      setModalLoad(false);
      Utils.messagemShow(msg, 'error', '😱 Erro de carregamento', error.mensagemUsuario, 3000);
    });

  }


  const actionBodyTemplate = (rowData: IProduto) => {
    return (
      <div className="p-grid buttonAction">
        <Button label="" icon="pi pi-pencil" className="p-button-rounded p-button-secondary p-mr-2 p-mb-2" tooltip="Editar anúncio" />
        {rowData.status === 'active' ?
          <Button label="" icon="pi pi-pause" className="p-button-rounded p-button-danger teste p-mr-2" tooltip="Pausar anúncio" onClick={() => updateStatus(rowData, 2)} />
          :
          <Button label="" icon="pi pi-play" className="p-button-rounded p-button-success teste p-mr-2" tooltip="Ativar anúncio" onClick={() => updateStatus(rowData, 1)} />
        }
        <Button label="" icon="pi pi-chart-bar" className="p-button-rounded p-button-primary p-mr-2 p-mb-2" tooltip="Ver detalhes" />
      </div>
    );
  }

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Listagem dos anúcios</h5>
    </div>
  );

  const bodyTemplateColumnA = (rowData: IProduto) => {
    return (
      <div>
        <span className="p-column-title">Cod.Barras:</span>
        {rowData.id}
      </div>
    );
  }
  const bodyTemplateColumnB = (rowData: IProduto) => {
    return (
      <div>
        <span className="p-column-title">Titulo:</span>
        {rowData.titulo}
      </div>
    );
  }
  const bodyTemplateColumnC = (rowData: IProduto) => {
    const p = Utils.formatCurrency(rowData.precoVarejo);;
    return (
      <div>
        <span className="p-column-title">Preço:</span>
        <span>{p}</span>
      </div>
    );
  }
  const bodyTemplateColumnD = (rowData: IProduto) => {
    let status = rowData.status;
    if (status === 'active') {
      status = "success";
    }
    if (status === 'paused') {
      status = "danger";
    }

    return (
      <div>
        <span className="p-column-title">Status:</span>
        <Tag severity={status} value={rowData.status === 'active' ? 'ATIVO' : 'PAUSADO'} rounded></Tag>
      </div>
    );
  }
  const bodyTemplateColumnE = (rowData: IProduto) => {
    const stockClassName = classNames({
      'outofstock': rowData.quantidade === 0,
      'lowstock': rowData.quantidade > 0 && rowData.quantidade < 10,
      'instock': rowData.quantidade > 5
    });
    return (
      <div className={stockClassName}>
        <span className="p-column-title">Quatidade:</span>
        {rowData.quantidade}
      </div>
    );
  }

  let te = "21.8rem";
  const tamanhoTela = window.screen.availHeight;
  if (tamanhoTela > 768) {
    te = "40rem";
  }

  const testeMarket = () => {
    return (
      <div className='crad p-p-2'>
        <label htmlFor="">teste</label>


      </div>
    );

  }


  return (<Container>
    <HeaderAdmin />
    <div>
      <Carousel value={markets.dados} numVisible={4} numScroll={4}
        responsiveOptions={responsiveOptionsProduts}
        className="custom-carousel p-mt-4"
        circular
        autoplayInterval={5000}
        itemTemplate={productTemplate}
      />
    </div>
    <div className='p-col-12'>
      {maketId === 1 ?
        <div className="card p-p-2">
          <div className="datatable-crud-demo datatable-responsive-demo">
            <div className="table">
              <DataTable
                value={store.produtos} selection={selectedProdutos}
                onSelectionChange={(e) => setSelectedprodutos(e.value)}
                dataKey="id" paginator rows={10}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando  {first} - {last} total de {totalRecords} produtos"
                globalFilter={globalFilter}
                header={header}
                scrollable
                scrollHeight={te}
                className="p-datatable-responsive-demo"
              >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column header="" body={imageBodyTemplate} headerStyle={{ width: '10%' }}></Column>
                {/* <Column field="codigoBarras" header="Codigo" body={bodyTemplateColumnA} headerStyle={{ width: '12%' }} sortable></Column> */}
                <Column field="titulo" header="Titulo" body={bodyTemplateColumnB} headerStyle={{ width: '30%' }} sortable></Column>
                <Column field="precoVarejo" header="Preço" body={bodyTemplateColumnC} sortable></Column>
                <Column field="quantidade" header="Quantidade" body={bodyTemplateColumnE} sortable></Column>
                <Column field="status" header="Status" body={bodyTemplateColumnD} sortable></Column>
                <Column body={actionBodyTemplate}></Column>
              </DataTable>
            </div>
          </div>


        </div>
        : maketId === 0 ? '' :
          <div className='card p-p-2 card-aviso'>
            <div className='p-col-12 p-text-center' >
              <div className='' style={{background: '#d3d3d3'}}>
                <label htmlFor="" className='p-text-bold p-mb-3' style={{color: 'red'}}>Aviso</label>
                <h4>O Marketplace ainda não esta disponível nesta versão, esperamos liberar o mais breve possível.</h4>
              </div>
            </div>


          </div>
      }
    </div>
    <Toast ref={msg} />
    <ModalLoad visible={modalLoad} />

  </Container>
  );
}
export default observer(Marketplace);