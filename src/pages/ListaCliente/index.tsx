import React, { useEffect, useRef, useState, useContext } from 'react';

import { DialogProps } from '@material-ui/core/Dialog';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { ModalLoad } from '../../components/ModalLoad';
import { PedidoService } from '../../services/PedidoService/pedidoService';
import { Utils } from "../../utils/utils";
import { HeaderAdmin } from '../../components/HeaderAdmin';
import { IProduto } from '../../domain/types/IProduto';
import { classNames } from 'primereact/utils'
import { ButtonBase } from '../../components/ButtonBase';
import { MarketplaceService } from '../../services/MarketplaceService/MarketplaceService';
import { Tag } from 'primereact/tag';
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import { InputBase } from '../../components/InputBase';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { AddToQueue } from '@material-ui/icons';
import { DialogConfirme } from '../../components/DialogConfirme';
import { InputSearch } from '../../components/InputSearch';
import icon from "../../assets/icon-voltar.png";
import { Container, FormControl } from './styles';
import { observer } from 'mobx-react-lite';
import UsuarioStore from '../../stores/UsuarioStore';
import { ClienteService } from '../../services/ClienteService/clienteService';
import { UtilsDate } from '../../utils/utilsDate';
import { ICliente } from '../../domain/types/ICliente';
import { UsuarioService } from '../../services/UsuarioService/usuarioService';
import PedidoStore from '../../stores/PedidoStore';
import { IPedido } from '../../domain/types/IPedido';
import { statusPedido } from '../Pedido/enumStatus';

/**
*@Author Luan Miranda 
*@Issue MAs-66
*/

const ListaCliente: React.FC = () => {
  const store = useContext(UsuarioStore);
  const storePedido = useContext(PedidoStore);
  const [modalLoad, setModalLoad] = useState(false);
  const [detalheModal, setDetalheModal] = useState(false);
  const [maketId, setMarketId] = useState(0);
  const msg = useRef<Toast>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const clienteService = new ClienteService();
  const [pedidos, setPedidos] = useState<IPedido[]>(new Array<IPedido>());
  const [optionTipo, setOptionTipo] = useState([{ id: 1, name: '	VAREJO', value: 'VAREJO' }, { id: 3, name: 'ATACADO', value: 'ATACADO' }]);
  const [totalcompra, setTotalCompra] = useState(0);
  let frete = 0;
  useEffect(() => {
    clienteService.getClientes().then(data => {
      store.loadClientes(data);
    });
  }, []);

  const updateStatus = (cliente: ICliente, tipo: number) => {
    setModalLoad(true);
    const usuarioService = new UsuarioService();
    let status = 'ATIVO';
    if (tipo === 2) {
      status = 'INATIVO';
    }
    usuarioService.updateStatus(cliente.usuario.id, status).then(data => {
      store.clientes.map(item => {
        if (item.id === cliente.id) {
          item.usuario.status = status;
        }
      });
      setModalLoad(false);
      Utils.messagemShow(msg, 'success', 'Salvo', '😃 Dados alterados com sucesso', 5000);
    }).catch(error => {
      setModalLoad(false);
      Utils.messagemShow(msg, 'error', '😱 Erro de carregamento', error.mensagemUsuario, 3000);
    });

  }

  const onSave = () => {
    setModalLoad(true);
    clienteService.updateTipo(store.cliente.id, store.cliente.tipo).then(data => {
      store.clientes.map(item => {
        if (item.id === store.cliente.id) {
          item.tipo = store.cliente.tipo;
        }
      });
      setModalLoad(false);
      setDetalheModal(false);
      Utils.messagemShow(msg, 'success', 'Salvo', '😃 Dados alterados com sucesso', 5000);
    }).catch(error => {
      setModalLoad(false);
      setDetalheModal(false);
      Utils.messagemShow(msg, 'error', '😱 Erro de carregamento', error.mensagemUsuario, 3000);
    });

  }

  const onDetalhes = (cliente: ICliente) => {
    storePedido.pedido.cliente = cliente;
    storePedido.pedido.dataDeCriacao = UtilsDate.formatByYYYYMMDD(UtilsDate.subtrairDiasByData(90));
    storePedido.pedido.dataFechamento = UtilsDate.formatByYYYYMMDD(UtilsDate.adicionarDiasByData(1));
    storePedido.pedido.estatus = "FINALIZADO"
    const pedidoService = new PedidoService();
    pedidoService.getPedidosByCliente(storePedido.pedido).then(data => {
      data.reverse();
      setPedidos(data);
      let soma = 0;
      pedidos.forEach((item: IPedido) => {
        soma += item.valorTotal;
        frete += item.valorFrete;
        console.log(item);
      });
      setTotalCompra(soma);
    }
    ).catch(error => {
      Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
    });
    setDetalheModal(true);
    store.load(cliente);
  }


  const actionBodyTemplate = (rowData: ICliente) => {
    return (
      <div className="p-grid buttonAction">
        {rowData.usuario.status === 'ATIVO' ?
          <Button label="" icon="pi pi-pause" className="p-button-rounded p-button-danger teste p-mr-2" tooltip="Pausar cliente" onClick={() => updateStatus(rowData, 2)} />
          :
          <Button label="" icon="pi pi-play" className="p-button-rounded p-button-success teste p-mr-2" tooltip="Ativar cliente" onClick={() => updateStatus(rowData, 1)} />
        }
        <Button label="" icon="pi pi-chart-bar" className="p-button-primary p-mr-2 p-mb-2" tooltip="Ver detalhes" onClick={() => onDetalhes(rowData)} />
      </div>
    );
  }

  const header = (
    <div className="table-header p-grid">
      <div className='p-col-12 p-lg-1  p-xl-1'>
        <h5 className="p-m-0">Listagem dos clientes</h5>
      </div>
      <div className="p-col-12 p-lg-6 p-ml-2 pesquisar">
        <InputSearch placeholder="Pesquise..." type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} />
      </div>
    </div>
  );

  const bodyTemplateColumnA = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">Id:</span>
        {rowData.id}
      </div>
    );
  }

  const bodyTemplateColumnB = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">Nome:</span>
        {rowData.usuario.nome}
      </div>
    );
  }

  const bodyTemplateColumnC = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">Tipo:</span>
        <span>{rowData.tipo}</span>
      </div>
    );
  }

  const bodyTemplateColumnD = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">Data:</span>
        {UtilsDate.formatByDDMMYYYY(rowData.dataDeCriacao)}
      </div>
    );
  }

  const bodyTemplateColumnE = (rowData: any) => {
    let status = rowData.usuario.status;
    let color = '';
    if (status === 'ATIVO') {
      color = "success";
    }
    if (status === 'INATIVO') {
      color = "danger";
    }
    return (
      <div>
        <span className="p-column-title">Status:</span>
        <Tag severity={color} value={status} rounded></Tag>
      </div>
    );
  }

  const bodyTemplateColumnF = (rowData: any) => {
    return (
      <div>
        {UtilsDate.formatByDDMMYYYY(rowData.dataFechamento)}
      </div>
    );
  }

  const bodyTemplateColumnG = (rowData: any) => {
    const p = Utils.formatCurrency(rowData.valorDesconto);
    return (
      <div style={{ color: 'red', fontWeight: 'bold' }}>
        <span>{p}</span>
      </div>
    );
  }
  const bodyTemplateColumnH = (rowData: any) => {
    const p = Utils.formatCurrency(rowData.valorFrete);
    return (
      <div style={{ color: 'blue', fontWeight: 'bold' }}>
        <span>{p}</span>
      </div>
    );
  }

  const bodyTemplateColumnI = (rowData: any) => {
    const p = Utils.formatCurrency(rowData.valorTotal);
    return (
      <div style={{ color: 'green', fontWeight: 'bold' }}>
        <span>{p}</span>
      </div>
    );
  }

  const bodyTemplateColumnJ = (rowData: any) => {
    let status = rowData.estatus;
    if (status === statusPedido.PENDENTE) {
      status = "warning";
    }
    if (status === statusPedido.FINALIZADO) {
      status = "primary";
    }
    if (status === statusPedido.NAO_ENVIADO) {
      status = "warning";
    }

    if (status === statusPedido.CANCELADO) {
      status = "danger";
    }

    if (status === statusPedido.RECEBIDO) {
      status = "success";
    }
    return (
      <div>
        <Tag severity={status} value={rowData.estatus} rounded></Tag>
      </div>
    );
  }

  let te = "21.8rem";
  const tamanhoTela = window.screen.availHeight;
  if (tamanhoTela > 768) {
    te = "40rem";
  }


  return (<Container>

    <HeaderAdmin />

    <div className='p-col-12'>
      <div className="card p-p-2">
        <div className="datatable-crud-demo datatable-responsive-demo">
          <div className="table">
            <DataTable
              value={store.clientes}
              // selection={selectedProdutos}
              // onSelectionChange={(e) => setSelectedprodutos(e.value)}
              dataKey="id" paginator rows={10}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Mostrando  {first} - {last} total de {totalRecords} clientes"
              globalFilter={globalFilter}
              header={header}
              scrollable
              scrollHeight={te}
              className="p-datatable-responsive-demo"
            >
              {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
              <Column field="id" header="ID" body={bodyTemplateColumnA} headerStyle={{ width: '8%' }} sortable></Column>
              <Column field="usuario.nome" header="nome" body={bodyTemplateColumnB} headerStyle={{ width: '30%' }} sortable></Column>
              <Column field="tipo" header="Tipo" body={bodyTemplateColumnC} sortable></Column>
              <Column field="dataCriacao" header="Desde" body={bodyTemplateColumnD} sortable></Column>
              <Column field="status" header="Status" body={bodyTemplateColumnE} sortable></Column>
              <Column body={actionBodyTemplate}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
    {/* =========================modal de edição====================== */}
    <Dialog
      className="p-col-12"
      open={detalheModal}
      onClose={() => setDetalheModal(false)}
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
              <button type="button" onClick={() => setDetalheModal(false)} className="p-grid "
                style={{ background: 'white', border: '0' }}    >
                <img src={icon} alt="img" />
                <label htmlFor="" className="p-mt-2 p-text-bold" style={{ color: 'var(--text-title)', fontSize: '18px' }}>VOLTAR</label>
              </button>
            </div>
          </div>
          <div className="p-col-7 p-lg-2 p-xl-2">
            <h5 className="p-text-bold p-text-uppercase p-mt-2 titulo-modal"
              style={{ color: 'var(--secondary)' }}>
              CÓDIGO: {store.cliente.id}
            </h5>
          </div>
        </div>

      </DialogTitle>
      <DialogContent dividers={scroll === 'paper'} style={{ background: 'var(--background)' }}>
        <FormControl>
          <div>
            <h4> Atenção compras dos útilmos 90 dias</h4>
          </div>
          <div className="card p-p-2">
            <h5 className='label-text p-ml-2'>Informações do cliente</h5>
            <div className='p-p-3 p-grid'>
              <div className="p-col-12 p-lg-3 p-xl-3">
                <label className='p-text-bold' htmlFor="">Cliente:</label>
                <h4>{store.cliente.usuario.nome}</h4>
              </div>
              <div className='p-col-8 p-lg-2 p-xl-2'>
                <label className='p-text-bold' htmlFor="">Descontos totais:</label>
                <h4 style={{ color: 'red' }}>{Utils.formatCurrency(frete)}</h4>
              </div>
              <div className='p-col-8 p-lg-2 p-xl-2'>
                <label className='p-text-bold' htmlFor="">Frete totais:</label>
                <h4 style={{ color: 'blue' }}>{Utils.formatCurrency(frete)}</h4>
              </div>
              <div className='p-col-8 p-lg-2 p-xl-2'>
                <label className='p-text-bold' htmlFor="">Compras totais:</label>
                <h4 style={{ color: 'green' }}>{Utils.formatCurrency(totalcompra)}</h4>
              </div>
              <div className='p-field p-col-12 p-lg-2 p-xl-2 p-mt-1'>
                <label className='p-text-bold' htmlFor="" style={{ width: '100%' }}>Tipo</label>
                <Dropdown className='test' value={store.cliente.tipo} options={optionTipo} onChange={(e) => store.cliente.tipo = e.value} optionLabel="name" placeholder="Selecione o status" style={{ zIndex: '99' }} />
              </div>
              <div className="p-col-4 p-lg-1 p-xl-1">
                <Tag className='p-shadow-2 p-p-3' severity={store.cliente.usuario.status === 'ATIVO' ? 'success' : 'danger'} value={store.cliente.usuario.status} rounded></Tag>
              </div>
            </div>
            <div>
              <DataTable value={pedidos} scrollable scrollHeight={te}>
                <Column field="id" header="Name" headerStyle={{ width: '8%' }}></Column>
                <Column field="dataFechamento" header="Data de Fehcamento" body={bodyTemplateColumnF}></Column>
                <Column field="valorDesconto" header="Desconto" body={bodyTemplateColumnG}></Column>
                <Column field="valorFrete" header="Frete" body={bodyTemplateColumnH}></Column>
                <Column field="valorTotal" header="Total" body={bodyTemplateColumnI}></Column>
                <Column field="estatus" header="Status" body={bodyTemplateColumnJ}></Column>
              </DataTable>
            </div>
          </div>
        </FormControl>
      </DialogContent>
      <DialogActions style={{ padding: '0px' }} >
        <div className="but-save">
          <ButtonBase label="SALVAR" icon="" className="p-button-success p-mt-2 p-mb-2 p-mr-5 p-pr-6 p-pl-6" onClick={onSave} />
        </div>
      </DialogActions>
    </Dialog>
    <Toast ref={msg} />
    <ModalLoad visible={modalLoad} />
    {/* <Detalhes modalDialog={modalDialog} closeFuncion={hideDialog} store={store} /> */}
    {/* <DialogConfirme
      show={deleteProdutoDialog}
      text={"Anúncio: " + store.objUpdate.title}
      titulo='Realmente deseja encerra o anúncio?  Esta ação não pode ser desfeita!'
      setFunctionButtonSim={onSave}
      setFunctionButtonNao={() => setDeleteprodutoDialog(false)} /> */}
  </Container>
  );
}
export default observer(ListaCliente);