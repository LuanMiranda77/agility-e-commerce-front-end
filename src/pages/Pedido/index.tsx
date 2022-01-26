import { Dialog, DialogContent, DialogTitle, DialogProps } from '@material-ui/core';
import { observer } from 'mobx-react-lite'
import { Button } from "primereact/button"
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Divider } from "primereact/divider"
import { FileUpload } from 'primereact/fileupload'
import { TabMenu, TabMenuTabChangeParams } from 'primereact/tabmenu'
import { Tag } from 'primereact/tag'
import { Toast } from 'primereact/toast'
import React, { useContext, useEffect, useRef, useState } from "react"
import iconCarrinho from '../../assets/iconCarrinho.svg'
import { ButtonBase } from '../../components/ButtonBase'
import { HeaderAdmin } from "../../components/HeaderAdmin"
import { InputSearch } from "../../components/InputSearch"
import { ModalLoad } from '../../components/ModalLoad'
import { IPedido } from "../../domain/types/IPedido"
import { PedidoService } from "../../services/PedidoService/pedidoService"
import PedidoStore from "../../stores/PedidoStore"
import { Utils } from "../../utils/utils"
import { UtilsDate } from "../../utils/utilsDate"
import { DetalhePedido } from "./detalhe"
import { Container, FormControl } from "./styles"
import { statusPedido } from './enumStatus';
import icon from "../../assets/icon-voltar.png";
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { InputBase } from '../../components/InputBase';


const Pedido: React.FC = () => {
    const store = useContext(PedidoStore);
    const [modalDialog, setModalDialog] = useState(false);
    const [modalLoad, setModalLoad] = useState(false);
    const [modalStatus, setModalStatus] = useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [selectedPedidos, setSelectedPedidos] = useState<IPedido[]>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [activeIndex, setActiveIndex] = useState(0); // usado pelo  filtro de pedido
    const [pedidos, setPedidos] = useState<IPedido[]>(new Array<IPedido>());
    const msg = useRef<Toast>(null);
    const pedidoService = new PedidoService();
    const [checkStatus, setCheckStatus] = useState(false);
    // Data calendário
    const [data, setData] = useState(new Date());
    const [dateInicail, setDateInicail] = useState<Date | Date[] | undefined>(new Date(UtilsDate.subtrairDiasByData(30)));
    const [dateFinal, setDateFinal] = useState<Date | Date[] | undefined>(new Date());

    useEffect(() => {
        let userLogado = Utils.getTokenLogin();
        if (userLogado?.role === 'MASTER') {
            pedidoService.getPedidos().then(data => {
                setPedidos(data);
            }
            ).catch(error => {
                Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
            });
        } else if (userLogado?.role === 'CLIENTE') {
            store.pedido.cliente = Utils.getClienteLocal();
            store.pedido.dataDeCriacao = UtilsDate.formatByYYYYMMDD(dateInicail);
            store.pedido.dataFechamento = UtilsDate.formatByYYYYMMDD(dateFinal);
            store.pedido.estatus = "FINALIZADO"
            pedidoService.getPedidosByCliente(store.pedido).then(data => {
                setPedidos(data);
            }
            ).catch(error => {
                Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
            });
        }

    }, []);



    const hideDialog = () => {
        setModalDialog(false);
    }

    const editar = (rowData: IPedido) => {
        setModalStatus(true);
        store.update(rowData);
    }

    const onCheckStatus = (status: boolean) => {
        if (status) {
            store.pedido.estatus = statusPedido.ENVIADO;
        } else {
            store.pedido.estatus = statusPedido.FINALIZADO;
        }
        setCheckStatus(status);
    }

    const onEditStatus = () => {
        if (store.pedido.id !== null && store.pedido.codigoRastreio !== null) {
            pedidoService.updateStatus(store.pedido.id, store.pedido.codigoRastreio, store.pedido.estatus).then(data => {
                let array = pedidos.map((pedido: IPedido) => {
                    if (pedido.id === store.pedido.id) {
                        pedido.estatus = store.pedido.estatus
                        pedido.codigoRastreio = store.pedido.codigoRastreio
                    }
                    return pedido;
                });
                setPedidos(array);
                setModalStatus(false);
                setCheckStatus(false);
                Utils.messagemShow(msg, 'success', 'Salvo', '😃 Dados salvo com sucesso', 5000);

            }).catch(error => {
                setModalStatus(false);
                setCheckStatus(false);
                Utils.messagemShow(msg, 'error', '😱 Erro de carregamento', error.mensagemUsuario, 5000);
            });
        }
    }

    const actionBodyTemplate = (rowData: IPedido) => {
        let userLogado = Utils.getTokenLogin();
        return (
            <div className="buttonAction p-grid">
                <Button label="" icon="pi pi-chart-bar" className="p-mr-4 p-button-primary p-mr-2 p-mb-2" tooltip="Ver detalhes" onClick={() => detalhesPedido(rowData)} />
                {rowData.estatus === statusPedido.FINALIZADO && userLogado?.role === "MASTER"?
                    <Button tooltip="Trocar status do pedido" tooltipOptions={{ position: 'top' }} label="" icon="pi pi-cog" className="p-button-danger p-mr-2 p-mb-2" onClick={() => editar(rowData)} />
                    : ''
                }
            </div>
        );
    }


    const bodyTemplateColumnA = (rowData: IPedido) => {
        return (
            <div>
                <span className="p-column-title">Id:</span>
                {rowData.id}
            </div>
        );
    }
    const bodyTemplateColumnB = (rowData: IPedido) => {
        return (
            <div>
                <span className="p-column-title">Cliente:</span>
                {rowData.cliente.usuario.nome}
            </div>
        );
    }

    const bodyTemplateColumnC = (rowData: IPedido) => {
        return (
            <div>
                <span className="p-column-title">Data:</span>
                {UtilsDate.formatByDDMMYYYY(rowData.dataDeCriacao)}
            </div>
        );
    }

    const bodyTemplateColumnD = (rowData: IPedido) => {
        const p = Utils.formatCurrency(rowData.valorDesconto);
        return (
            <div>
                <span className="p-column-title">V. Desconto:</span>
                <span style={{ color: 'var(--red)' }}>{p}</span>
            </div>
        );
    }

    const bodyTemplateColumnE = (rowData: IPedido) => {
        const p = Utils.formatCurrency(rowData.valorFrete);
        return (
            <div>
                <span className="p-column-title">V. Frete:</span>
                <span style={{ color: 'var(--blue)' }}>{p}</span>
            </div>
        );
    }

    const bodyTemplateColumnF = (rowData: IPedido) => {
        const p = Utils.formatCurrency(rowData.valorTotal);
        return (
            <div>
                <span className="p-column-title">V. Total:</span>
                <span style={{ color: 'var(--green)' }}>{p}</span>
            </div>
        );
    }


    const bodyTemplateColumnG = (rowData: IPedido) => {
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
                <span className="p-column-title">Status:</span>
                <Tag severity={status} value={rowData.estatus} rounded></Tag>
            </div>
        );
    }
    const filterPedidoStatus = (index: Number) => {
        setModalLoad(true);
        store.pedido.dataDeCriacao = UtilsDate.formatByYYYYMMDD(dateInicail);
        store.pedido.dataFechamento = UtilsDate.formatByYYYYMMDD(dateFinal);
        // var mySet = new Set();
        // mySet.delete(store.pedido.cliente);
        let userLogado = Utils.getTokenLogin();
        if (index === 0) {
            store.pedido.estatus = 'FINALIZADO';
            if (userLogado?.role === 'MASTER') {
                pedidoService.findPedidoByData(store.pedido).then(data => {
                    setPedidos(data);
                    setModalLoad(false);
                }).catch(error => {
                    setModalLoad(false);
                    Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
                });
            } else if (userLogado?.role === 'CLIENTE') {
                store.pedido.cliente = Utils.getClienteLocal();
                store.pedido.dataDeCriacao = UtilsDate.formatByYYYYMMDD(dateInicail);
                store.pedido.dataFechamento = UtilsDate.formatByYYYYMMDD(dateFinal);
                pedidoService.getPedidosByCliente(store.pedido).then(data => {
                    setPedidos(data);
                    setModalLoad(false);
                }
                ).catch(error => {
                    setModalLoad(false);
                    Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
                });
            }
        } else if (index === 1) {
            store.pedido.estatus = 'PENDENTE';
            if (userLogado?.role === 'MASTER') {
                pedidoService.findPedidoByEstatus(store.pedido).then(data => {
                    setPedidos(data);
                    setModalLoad(false);
                }).catch(error => {
                    setModalLoad(false);
                    Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
                });
            } else if (userLogado?.role === 'CLIENTE') {
                store.pedido.cliente = Utils.getClienteLocal();
                store.pedido.dataDeCriacao = UtilsDate.formatByYYYYMMDD(dateInicail);
                store.pedido.dataFechamento = UtilsDate.formatByYYYYMMDD(dateFinal);
                pedidoService.getPedidosByClienteStatus(store.pedido).then(data => {
                    setPedidos(data);
                    setModalLoad(false);
                }
                ).catch(error => {
                    setModalLoad(false);
                    Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
                });
            }
        } else if (index === 2) {
            store.pedido.estatus = 'ENVIADO';
            if (userLogado?.role === 'MASTER') {
                pedidoService.findPedidoByEstatus(store.pedido).then(data => {
                    setPedidos(data);
                    setModalLoad(false);
                }).catch(error => {
                    setModalLoad(false);
                    Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
                });
            } else if (userLogado?.role === 'CLIENTE') {
                store.pedido.cliente = Utils.getClienteLocal();
                store.pedido.dataDeCriacao = UtilsDate.formatByYYYYMMDD(dateInicail);
                store.pedido.dataFechamento = UtilsDate.formatByYYYYMMDD(dateFinal);
                pedidoService.getPedidosByClienteStatus(store.pedido).then(data => {
                    setPedidos(data);
                    setModalLoad(false);
                }
                ).catch(error => {
                    setModalLoad(false);
                    Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
                });
            }
        } else if (index === 3) {
            store.pedido.estatus = 'FINALIZADO';
            if (userLogado?.role === 'MASTER') {
                pedidoService.findPedidoByEstatus(store.pedido).then(data => {
                    setPedidos(data);
                    setModalLoad(false);
                }).catch(error => {
                    setModalLoad(false);
                    Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
                });
            } else if (userLogado?.role === 'CLIENTE') {
                store.pedido.cliente = Utils.getClienteLocal();
                store.pedido.dataDeCriacao = UtilsDate.formatByYYYYMMDD(dateInicail);
                store.pedido.dataFechamento = UtilsDate.formatByYYYYMMDD(dateFinal);
                pedidoService.getPedidosByClienteStatus(store.pedido).then(data => {
                    setPedidos(data);
                    setModalLoad(false);
                }
                ).catch(error => {
                    setModalLoad(false);
                    Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
                });
            }
        } else {
            store.pedido.estatus = 'DEVOLUCAO';
            if (userLogado?.role === 'MASTER') {
                pedidoService.findPedidoByEstatus(store.pedido).then(data => {
                    setPedidos(data);
                    setModalLoad(false);
                }).catch(error => {
                    setModalLoad(false);
                    Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
                });
            } else if (userLogado?.role === 'CLIENTE') {
                store.pedido.cliente = Utils.getClienteLocal();
                store.pedido.dataDeCriacao = UtilsDate.formatByYYYYMMDD(dateInicail);
                store.pedido.dataFechamento = UtilsDate.formatByYYYYMMDD(dateFinal);
                pedidoService.getPedidosByClienteStatus(store.pedido).then(data => {
                    setPedidos(data);
                    setModalLoad(false);
                }
                ).catch(error => {
                    setModalLoad(false);
                    Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
                });
            }
        }
    }

    /**
     * @author carlos.avelino2.0@gmail.com
     * @returns JSX referente ao render do filtro de pedidos
     */
    const bodyTabMenuPedidoFiltroEstado = () => {

        const items = [
            { label: 'Todos', icon: 'pi pi-fw pi-check-square' },
            { label: 'Não Pagos', icon: 'pi pi-fw pi-ban' },
            { label: 'Enviado', icon: 'pi pi-fw pi-send' },
            { label: 'Pagos', icon: 'pi pi-fw pi-dollar' },
            { label: 'Devoluções', icon: 'pi pi-fw pi-exclamation-circle' }
        ];
        const filterPedido = (e: TabMenuTabChangeParams) => {
            setActiveIndex(e.index);
            filterPedidoStatus(e.index);
        };
        return (
            <div>
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={filterPedido} />
            </div>
        );


    }


    let te = "21.8rem";
    const tamanhoTela = window.screen.availHeight;
    if (tamanhoTela > 768) {
        te = "40rem";
    }



    const detalhesPedido = (pedido: any) => {
        setModalDialog(true);
        store.pedido = pedido;
    }

    const filterByDate = () => {
        store.pedido.estatus = 'FINALIZADO';
        store.pedido.dataDeCriacao = UtilsDate.formatByYYYYMMDD(dateInicail);
        store.pedido.dataFechamento = UtilsDate.formatByYYYYMMDD(dateFinal);

        pedidoService.findPedidoByData(store.pedido).then(data => {
            setPedidos(data);
        }).catch(error => {
            Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
        });
    }



    return (
        <Container>
            <HeaderAdmin />
            <div className="card">
                <div className="p-grid p-mt-1" >
                    <div id='titulo-pedido' className="p-grid  p-sm-12 p-col-3 p-md-12 p-lg-3 p-xl-3 p-ml-2">
                        <img src={iconCarrinho} alt="img" className="p-ml-2 p-mb-2" />
                        <label className="p-ml-2 p-mt-2">Gerenciamento de Pedidos</label>
                    </div>

                    <div className="p-col-9 p-grid p-p-2">
                        {bodyTabMenuPedidoFiltroEstado()}
                    </div>
                </div>

                <Divider className="diveder p-mb-4" />



                <div className="p-fluid p-grid p-formgrid p-col-12">
                    <div className="p-p-2  p-sm-12 p-md-12 p-lg-5 p-xl-5 p-ml-2 p-mr-6 pesquisar">
                        <InputSearch placeholder="Pesquise..." type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} />
                    </div>
                    <div className="p-mr-2 p-field p-sm-12 p-md-12 p-lg-2 p-xl-2 button-calendario">
                        <label>Data inicial</label>
                        <Calendar id="icon" value={dateInicail} dateFormat="dd/mm/yy" onChange={(e) => setDateInicail(e.value)} showIcon />
                    </div>

                    <div className="p-field p-sm-12 p-md-12 p-lg-2 p-xl-2 button-calendario">
                        <label  >Data final</label>
                        <Calendar id="icon" value={dateFinal} dateFormat="dd/mm/yy" onChange={(e) => setDateFinal(e.value)} showIcon />
                    </div>

                    <div className="p-field p-sm-12 p-md-12 p-lg-2 p-xl-2 button-calendario" >
                        <label></label>
                        <ButtonBase style={{ width: '100%' }} label="Filtrar" icon="pi pi-filter" className="p-button-success p-mt-2 p-mb-2 p-pr-3 p-ml-1" onClick={filterByDate} />
                    </div>

                </div>

            </div>

            <div className="datatable-crud-demo datatable-responsive-demo table">
                <div className="">
                    <DataTable
                        value={pedidos} selection={selectedPedidos}
                        onSelectionChange={(e) => setSelectedPedidos(e.value)}
                        dataKey="id" paginator rows={10}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando  {first} - {last} total de {totalRecords} pedidos"
                        globalFilter={globalFilter}
                        scrollable
                        scrollHeight={te}
                        className="p-datatable-responsive-demo"

                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="id" header="Código" body={bodyTemplateColumnA} sortable></Column>
                        <Column field="cliente.ususario.nome" header="Cliente" body={bodyTemplateColumnB} headerStyle={{ width: '20%' }} sortable></Column>
                        <Column field="dataCriacao" header="Data" body={bodyTemplateColumnC} headerStyle={{ width: '13%' }} sortable></Column>
                        <Column field="valorDesconto" header="V. Desconto" body={bodyTemplateColumnD} headerStyle={{ width: '12%' }} sortable></Column>
                        <Column field="valorFrete" header="V. Frete" body={bodyTemplateColumnE} sortable></Column>
                        <Column field="valorTotal" header="V. Total" body={bodyTemplateColumnF} sortable></Column>
                        <Column field="status" header="Status" body={bodyTemplateColumnG} sortable filterFunction={filterPedidoStatus} ></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>

            {/**======================modal editar status do pedido============================================*/}
            <Dialog
                className="p-col-12"
                open={modalStatus}
                onClose={() => setModalStatus(false)}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            // fullScreen
            >
                <DialogTitle id="dialog-title" style={{ padding: '0px' }}>
                    <div className="p-grid  p-col-12">
                        <div className="p-col-5 p-lg-6 p-xl-6">
                            <div className="p-col-12">
                                <button type="button" onClick={() => setModalStatus(false)} className="p-grid "
                                    style={{ background: 'white', border: '0' }}    >
                                    <img src={icon} alt="img" />
                                    <label htmlFor="" className="p-mt-2 p-text-bold" style={{ color: 'var(--text-title)', fontSize: '18px' }}>VOLTAR</label>
                                </button>
                            </div>
                        </div>
                        <div className="p-col-7 p-lg-6 p-xl-6">
                            <h5 className="p-text-bold p-text-uppercase p-mt-2 titulo-modal"
                                style={{ color: 'var(--secondary)' }}>
                                CÓDIGO DO PEDIDO:{store.pedido.id}
                            </h5>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'} style={{ background: 'var(--background)' }}>
                    <FormControl>
                        <div className='card p-p-3'>
                            <label htmlFor="" style={{ color: 'var(--text-title)' }} className='p-text-bold'>Mudança do pedido para envio</label>
                            <div className="p-col-12 p-mt-3">
                                <label htmlFor="binary">Marque para enviar</label>
                                <div className="field-checkbox p-mt-2">
                                    <Checkbox inputId="binary" checked={checkStatus} onChange={e => onCheckStatus(e.checked)} />
                                    <span className='p-text-bold p-ml-2'>{checkStatus ? statusPedido.ENVIADO : store.pedido.estatus}</span>
                                </div>
                                <div className='p-mt-4'>
                                    <InputBase label='Código de rastreio' type='text' placeholder='Digite aqui o código de rastreio' onChange={(e) => store.pedido.codigoRastreio = e.target.value} />
                                </div>
                            </div>
                        </div>
                    </FormControl>
                    <div className="p-text-right">
                        <ButtonBase label="SALVAR" icon="" className="p-button-success p-mt-3 p-pl-6 p-pr-6" onClick={onEditStatus} />
                    </div>
                </DialogContent>
            </Dialog>

            {/* =============================================inicio do modal==========================================================================*/}

            <DetalhePedido modalDialog={modalDialog} closeFuncion={hideDialog} store={store} />
            <ModalLoad visible={modalLoad} />
            <Toast ref={msg} />
        </Container>
    );
}

export default observer(Pedido);