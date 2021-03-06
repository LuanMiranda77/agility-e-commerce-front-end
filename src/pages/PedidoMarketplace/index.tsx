import React, { useEffect, useRef, useState, useContext } from 'react';

import { DialogProps } from '@material-ui/core/Dialog';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Timeline } from 'primereact/timeline';
import { Toast } from 'primereact/toast';
import icon from "../../assets/icon-voltar.png";
import { ModalLoad } from '../../components/ModalLoad';
import { PedidoService } from '../../services/PedidoService/pedidoService';
import { Utils } from "../../utils/utils";
import { Carousel } from 'primereact/carousel';
import markets from '../Marketplace/markets.json'
import { Container, FormControl } from './styles';
import { observer } from 'mobx-react-lite';
import MarketplaceStore from "../../stores/MarketplaceStore"
import { HeaderAdmin } from '../../components/HeaderAdmin';
import { IProduto } from '../../domain/types/IProduto';
import { classNames } from 'primereact/utils'
import { ButtonBase } from '../../components/ButtonBase';
import { MarketplaceService } from '../../services/MarketplaceService/MarketplaceService';
import { Tag } from 'primereact/tag';
import { Dialog, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import { InputBase } from '../../components/InputBase';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { AddToQueue } from '@material-ui/icons';
import { DialogConfirme } from '../../components/DialogConfirme';
import { InputSearch } from '../../components/InputSearch';
import PedidoMarketplaceStore from "../../stores/PedidoMarketplaceStore"
import { UtilsDate } from '../../utils/utilsDate';
import { Detalhes } from './detalhes';

/**
*@Author
*@Issue
*/

const PedidoMarketplace: React.FC = () => {
  const store = useContext(PedidoMarketplaceStore);

  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [modalLoad, setModalLoad] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [maketId, setMarketId] = useState(0);
  const msg = useRef<Toast>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedProdutos, setSelectedprodutos] = useState<IProduto[]>([]);
  const marketplaceService = new MarketplaceService();
  const [modalDialog, setModalDialog] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const [deleteProdutoDialog, setDeleteprodutoDialog] = useState(false);
  const [arrayStatus, setArrayStatus] = useState([{ id: 1, name: 'Ativo', value: 'active' }, { id: 3, name: 'Pausado', value: 'paused' }]);

  const hideDialog = () => {
    setModalDialog(false);
  }

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
      marketplaceService.findPedidos("1").then(data => {
        store.load(data);
        setModalLoad(false);
        setMarketId(id);
      }).catch(error => {
        setModalLoad(false);
        Utils.messagemShow(msg, 'error', '???? Erro de carregamento', error.mensagemUsuario, 3000);
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
    if (rowData.imagens.length > 0) {
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

  const updateProduto = (prod: any) => {
    if (prod.status === 'paused') {
      arrayStatus.push({ id: 2, name: 'Encerrado', value: 'closed' });
    } else {
      setArrayStatus(arrayStatus.filter(item => item.id !== 2));
    }
    setModalEdit(true);
    store.load_prod(prod);
    store.update();
    // let op = arrayStatus.find(item => item.value === store.objUpdate.status);
    // if(op != null){
    //   setSelectedStatus(op.value);
    // }
  }

  const filterPedidos = (status: string) =>{
    setModalLoad(true);
    if (status === "1" || status === "2" || status === "3") {
      marketplaceService.findPedidos(status).then(data => {
        store.load(data);
        setModalLoad(false);
      }).catch(error => {
        setModalLoad(false);
        Utils.messagemShow(msg, 'error', '???? Erro de carregamento', error.mensagemUsuario, 3000);
      });
    }else{
      marketplaceService.findPedidosByStatus(status).then(data => {
        store.load(data);
        setModalLoad(false);
      }).catch(error => {
        setModalLoad(false);
        Utils.messagemShow(msg, 'error', '???? Erro de carregamento', error.mensagemUsuario, 3000);
      });
    }
  }


  const detalhe = (prod: any) => {
    setModalDialog(true);
    store.load_prod(prod);

  }

  const updateStatus = (pedido: any, tipo: number) => {
    setModalLoad(true);
    store.objUpdate.available_quantity = pedido.quantidade;
    store.objUpdate.price = pedido.precoVarejo;
    store.objUpdate.title = pedido.titulo;
    if (tipo === 1) {
      store.objUpdate.status = 'active';
    } else {
      store.objUpdate.status = 'paused';
    }
    marketplaceService.putProdutosByMercadoLivre(pedido.id, store.objUpdate).then(data => {
      store.pedidos.map(item => {
        if (item.id === data.id) {
          item.status = data.status;
        }
      });
      setModalLoad(false);
      Utils.messagemShow(msg, 'success', 'Salvo', '???? An??ncio pausado com sucesso', 5000);
    }).catch(error => {
      setModalLoad(false);
      Utils.messagemShow(msg, 'error', '???? Erro de carregamento', error.mensagemUsuario, 3000);
    });

  }

  const onSave = () => {
    if (store.objUpdate.available_quantity === 0 || store.objUpdate.price === 0 || store.objUpdate.title === '') {
      Utils.messagemShow(msg, 'error', '???? Erro ao salvar', 'Campos em branco', 6000);
      return false;
    } else if (store.objUpdate.price < 0) {
      Utils.messagemShow(msg, 'error', '???? Erro de campo quantidade', 'quantidade menor que 0', 6000);
    }
    setModalLoad(true);
    marketplaceService.putProdutosByMercadoLivre(store.pedido.id, store.objUpdate).then(data => {
      const index = store.findIndexById(store.pedido.id);
      store.pedidos[index] = data;
      setModalLoad(false);
      setModalEdit(false);
      Utils.messagemShow(msg, 'success', 'Salvo', '???? An??ncio alterado com sucesso', 5000);
    }).catch(error => {
      setModalLoad(false);
      Utils.messagemShow(msg, 'error', '???? Erro de carregamento', error.mensagemUsuario, 3000);
    });
  }


  const actionBodyTemplate = (rowData: IProduto) => {
    return (
      <div className="buttonAction">
        <Button label="" icon="pi pi-chart-bar" className="p-button-primary p-mr-2 p-mb-2" tooltip="Ver detalhes" onClick={() => detalhe(rowData)} />
      </div>
    );
  }

  const header = (
    <div className="table-header p-grid">
      <div className='p-col-12 p-lg-1  p-xl-1'>
        <h5 className="p-m-0">Listagem dos pedidos</h5>
      </div>
      <div className="p-col-12 p-lg-6 p-xl-6  pesquisar">
        <InputSearch placeholder="Pesquise..." type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} />
      </div>
      <div className="p-col-12 p-lg-5 p-xl-5 p-text-right">
        <Button className='p-mt-1 p-mr-3 p-shadow-3' label='' icon='pi pi-amazon' style={{ height: '38px' }} tooltip="Todos" tooltipOptions={{ position: 'top' }}  onClick={() => filterPedidos("1")}/>
        <Button className='p-mt-1 p-mr-3 p-shadow-3 p-button-warning' label='' icon='pi pi-exclamation-circle' style={{ height: '38px' }} tooltip="Pedidos pendentes" tooltipOptions={{ position: 'top' }} onClick={() => filterPedidos("2")} />
        <Button className='p-mt-1 p-mr-3 p-shadow-3 p-button-secondary' label='' icon='pi pi-cloud-download' style={{ height: '38px' }} tooltip="Pedidos recentes" tooltipOptions={{ position: 'top' }} onClick={() => filterPedidos("3")}/>
        <Button className='p-mt-1 p-mr-3 p-shadow-3 p-button-danger' label='' icon='pi pi-ban' style={{ height: '38px' }} tooltip="Pedidos cancelados" tooltipOptions={{ position: 'top' }} onClick={() => filterPedidos("cancelled")}/>
        <Button className='p-mt-1 p-button-success' label='' icon='pi pi-check-circle' style={{ height: '38px' }} tooltip="Pedidos concluidos" tooltipOptions={{ position: 'top' }} onClick={() => filterPedidos("delivered")}/>
      </div>
    </div>
  );

  const bodyTemplateColumnA = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">ID:</span>
        {rowData.id}
      </div>
    );
  }
  const bodyTemplateColumnB = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">Cliente:</span>
        {rowData.buyer.nickname}
      </div>
    );
  }
  const bodyTemplateColumnC = (rowData: any) => {
    const p = Utils.formatCurrency(rowData.total_amount);;
    return (
      <div>
        <span className="p-column-title">Valor:</span>
        <span>{p}</span>
      </div>
    );
  }
  const bodyTemplateColumnD = (rowData: any) => {
    let status = rowData.status;
    let color = '';
    if (status === 'active') {
      color = "success";
      status = "ATIVO";
    }
    if (status === 'paused') {
      color = "danger";
      status = "PAUSADO";
    }
    if (status === 'under_review') {
      color = "primary";
      status = "REVIS??O";
    }
    if (status === 'cancelled') {
      color = "danger";
      status = "CANCELADO";
    }

    return (
      <div>
        <span className="p-column-title">Status:</span>
        <Tag severity={color} value={status} rounded></Tag>
      </div>
    );
  }
  const bodyTemplateColumnE = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">Data venda:</span>
        {UtilsDate.formatByDDMMYYYY(rowData.date_created)}
      </div>
    );
  }

  const bodyTemplateColumnF = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">Data final:</span>
        {UtilsDate.formatByDDMMYYYY(rowData.expiration_date)}
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
      <Carousel value={markets.dados} numVisible={8} numScroll={8}
        responsiveOptions={responsiveOptionsProduts}
        className="custom-carousel p-mt-4"
        circular
        autoplayInterval={5000}
        itemTemplate={productTemplate}
      />
    </div>
    <div className='p-col-12'>
      <Divider />
      {maketId === 1 ?
        <div className="card p-p-2">
          <div className="datatable-crud-demo datatable-responsive-demo">
            <div className="table">
              <DataTable
                value={store.pedidos} selection={selectedProdutos}
                onSelectionChange={(e) => setSelectedprodutos(e.value)}
                dataKey="id" paginator rows={10}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando  {first} - {last} total de {totalRecords} pedidos"
                globalFilter={globalFilter}
                header={header}
                scrollable
                scrollHeight={te}
                className="p-datatable-responsive-demo"
              >
                {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                {/* <Column header="" body={imageBodyTemplate} headerStyle={{ width: '10%' }}></Column> */}
                <Column field="id" header="C??digo" body={bodyTemplateColumnA} headerStyle={{ width: '12%' }} sortable></Column>
                <Column field="buyer.nickname" header="Cliente" body={bodyTemplateColumnB} headerStyle={{ width: '30%' }} sortable></Column>
                <Column field="total_amount" header="Valor" body={bodyTemplateColumnC} sortable></Column>
                <Column field="date_created" header="Dt. Venda" body={bodyTemplateColumnE} sortable></Column>
                <Column field="expiration_date" header="Dt. Final" body={bodyTemplateColumnF} sortable></Column>
                <Column field="status" header="Status" body={bodyTemplateColumnD} sortable></Column>
                <Column body={actionBodyTemplate}></Column>
              </DataTable>
            </div>
          </div>


        </div>
        : maketId === 0 ? '' :
          <div className='card p-p-2 card-aviso'>
            <div className='p-col-12 p-text-center' >
              <div className='' style={{ background: '#d3d3d3' }}>
                <label htmlFor="" className='p-text-bold p-mb-3' style={{ color: 'red' }}>Aviso</label>
                <h4>O Marketplace ainda n??o esta dispon??vel nesta vers??o, esperamos liberar o mais breve poss??vel.</h4>
              </div>
            </div>


          </div>
      }
    </div>
    {/* =========================modal de edi????o====================== */}
    <Dialog
      className="p-col-12"
      open={modalEdit}
      onClose={() => setModalEdit(false)}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullScreen
      style={{ zIndex: 999 }}
    >
      <DialogTitle id="dialog-title" style={{ padding: '0px' }}>
        <div className="p-grid  p-col-12">
          <div className="p-col-5 p-lg-10 p-xl-10">
            <div className="p-col-12">
              <button type="button" onClick={() => setModalEdit(false)} className="p-grid "
                style={{ background: 'white', border: '0' }}    >
                <img src={icon} alt="img" />
                <label htmlFor="" className="p-mt-2 p-text-bold" style={{ color: 'var(--text-title)', fontSize: '18px' }}>VOLTAR</label>
              </button>
            </div>
          </div>
          <div className="p-col-7 p-lg-2 p-xl-2">
            <h5 className="p-text-bold p-text-uppercase p-mt-2 titulo-modal"
              style={{ color: 'var(--secondary)' }}>
              C??DIGO: {store.pedido}
            </h5>
          </div>
        </div>
      </DialogTitle>
      <DialogContent dividers={scroll === 'paper'} style={{ background: 'var(--background)' }}>
        <FormControl>
          <div className="card p-p-2">
            <h5 className='label-text p-ml-2'>Informa????es do an??ncio</h5>
            <div className='p-p-3 p-grid'>
              <div className="p-col-12 p-lg-9 p-xl-9">
                <InputBase type='text' label='titulo' placeholder='Digitar titulo do an??ncio' value={store.objUpdate.title} onChange={(e) => { store.objUpdate.title = e.currentTarget.value }} />
              </div>
              <div className='p-field p-col-12 p-lg-2 p-xl-2 p-mt-1'>
                <label htmlFor="" style={{ width: '100%' }}>Status</label>
                <Dropdown className='test' value={store.objUpdate.status} options={arrayStatus} onChange={(e) => store.objUpdate.status = e.value} optionLabel="name" placeholder="Selecione o status" style={{ zIndex: '99' }} />
              </div>
            </div>
            <div className="p-col-12  p-lg-3 p-xl-3">
              <label htmlFor="pricovarejo" className='p-col-12' >Pre??o</label>
              <InputNumber
                id="pricevarejo"
                value={store.objUpdate.price}
                onValueChange={(e) => store.objUpdate.price = e.target.value}
                mode="currency"
                currency="BRL"
                locale="pt-br"
                className='p-col-12'
              />
            </div>
            <div className='p-col-12 p-lg-3 p-xl-3 p-p-3'>
              <InputBase type='number' label='Quantidade' placeholder='Digitar a quantidade do an??ncio' value={store.objUpdate.available_quantity} onChange={(e) => { store.objUpdate.available_quantity = Number(e.currentTarget.value) }} />
            </div>
            {/* <div className='p-col-12'>
                <h5 className='label-text'>Imagens do an??ncio</h5>
              </div>
              <Divider />
              <div className='p-col-12 p-lg-12 p-xl-12'>
                <Carousel value={store.pedido.imagens} numVisible={4} numScroll={4}
                  responsiveOptions={responsiveOptionsProduts}
                  className="custom-carousel p-mt-4"
                  circular
                  autoplayInterval={5000}
                  itemTemplate={productTemplate}
                />
              </div> */}
          </div>
        </FormControl>
        <div className="p-text-right p-mt-3">
          {store.objUpdate.status !== 'closed' ?
            <ButtonBase icon='pi pi-check' label='Salvar' className="p-button-success p-pr-6 p-pl-6" onClick={onSave} />
            :
            <ButtonBase icon='pi pi-check' label='Salvar' className="p-button-success p-pr-6 p-pl-6" onClick={() => setDeleteprodutoDialog(true)} />
          }
        </div>
      </DialogContent>
    </Dialog>
    <Toast ref={msg} />
    <ModalLoad visible={modalLoad} />
    <Detalhes modalDialog={modalDialog} closeFuncion={hideDialog} store={store.pedido} />
    <DialogConfirme
      show={deleteProdutoDialog}
      text={"An??ncio: " + store.objUpdate.title}
      titulo='Realmente deseja encerra o an??ncio?  Esta a????o n??o pode ser desfeita!'
      setFunctionButtonSim={onSave}
      setFunctionButtonNao={() => setDeleteprodutoDialog(false)} />
  </Container>
  );
}
export default observer(PedidoMarketplace);