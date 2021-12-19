import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useRef, useState, useEffect } from 'react';
import icon from "../../assets/icon-voltar.png";
import { ButtonBase } from '../../components/ButtonBase';
import { CategoriaService } from "../../services/CategoriaService/categoriaService";
import { Utils } from "../../utils/utils";
import { Container, FormControl } from "./styles";
import { IPedido } from "../../domain/types/IPedido"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InsertEmoticon, TripOriginRounded } from '@material-ui/icons';
import { Divider } from 'primereact/divider';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { PedidoService } from '../../services/PedidoService/pedidoService';

interface DetalhesProps {
    store: any;
    closeFuncion: Function;
    modalDialog: boolean;
}

export const DetalhePedido: React.FC<DetalhesProps> = (props) => {
    const store = props.store;
    store.pedido.produtos = [{ objectURL: 'https://25753.cdn.simplo7.net/static/25753/sku/relogios-digitais-relogio-digital-de-led-1617029341220.png', titulo: 'Relógio Digital De Luxo Com Tela De Toque De Silicone Com Pulseira De Silicone', quantidadeVendida: 15, valor: 500 },
    { objectURL: 'https://images-americanas.b2w.io/produtos/1336330097/imagens/relogio-digital-led-luxo-touch-screen-silicone-strap-relogio-de-pulso-azul-escuro/1336330097_1_large.jpg', titulo: 'Relógio Digital De Luxo Com Tela De Toque De Silicone Com Pulseira De Silicone', quantidadeVendida: 15, valor: 500 }];
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [submitted, setSubmitted] = useState(false);
    const [events, setEvents] = useState([]);
    const msg = useRef<Toast>(null);
    const pedidoService = new PedidoService();

    const codigo = 'LB230826957HK';

    const iconInicio = 'pi pi-check', iconProgresso = 'pi pi-shopping-cart';
    const corInicio = '#607D8B', corProgresso = '#FF9800';



    useEffect(() => {
        pedidoService.getRastreio(codigo).then(data => {
            console.log(data);
            let cont = 0;
            data.forEach(function (item: { icon: string; color: string; }) {

                if (cont === 0) {
                    item.icon = iconInicio;
                    item.color = corInicio;
                }
                else if (data.length === cont + 1) {
                    item.icon = iconInicio;
                    item.color = '#008000';
                } else {
                    item.icon = iconProgresso;
                    item.color = corProgresso;
                }
                cont++;
            })
            setEvents(data);



        }
        ).catch(error => {
            Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
        });

    }, []);


    const hideDialog = () => {
        props.closeFuncion();
    }

    const bodyTemplateColumnA = (rowData: any) => {
        let imgURL = ''
        if (rowData.objectURL) {
            imgURL = rowData.objectURL;
        }
        // eslint-disable-next-line jsx-a11y/alt-text
        return <img
            id='link'
            src={imgURL}
            onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
            className="product-image"
        />
    }
    const bodyTemplateColumnB = (rowData: any) => {
        return (
            <div>
                <span className="p-column-title">Titulo:</span>
                <h5>{rowData.titulo}</h5>
            </div>
        );
    }
    const bodyTemplateColumnC = (rowData: any) => {
        return (
            <div>
                <span className="p-column-title">Quantidade:</span>
                <h3>{rowData.quantidadeVendida + 'x'}</h3>
            </div>
        );
    }
    const bodyTemplateColumnD = (rowData: any) => {
        return (
            <div>
                <span className="p-column-title">Valor:</span>
                <h3 style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>{Utils.formatCurrency(rowData.valor)}</h3>
            </div>
        );
    }
    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className="button-action">
                <Button label="TROCA" className="p-button-primary button-action p-text-center" style={{ background: 'var(--primary)' }} tooltip="Ver detalhes" onClick={() => enviaMsgZap('troca')} />
                <Button label="DEVOLUÇÃO" className="p-button-primary button-action p-text-center" style={{ background: 'var(--secondary)' }} tooltip="Ver detalhes" onClick={() => enviaMsgZap('troca')} />
            </div>
        );
    }

    const enviaMsgZap = (tipo: String) => {

    }



    const customizedContent = (item: any) => {
        return (
            <Card title={item.status} subTitle={item.data + ' ' + item.hora}>
                {item.origem ?
                    <>
                    <p><span className='p-text-bold p-mr-1'>Saida:</span> {item.origem}</p> 
                    <p><span className='p-text-bold p-mr-1'>Para:</span>{item.destino}</p>
                    </>:
                    <p>{item.local}</p>
                }
                {/* <Button label="Read more" className="p-button-text"></Button> */}
            </Card>
        );
    };

    const customizedMarker = (item: any) => {
        return (
            <span className="custom-marker p-shadow-2 " style={{ backgroundColor: item.color }}>
                <i className={item.icon}></i>
            </span>
        );
    };



    return (
        <Container>
            <Dialog
                className="p-col-12"
                open={props.modalDialog}
                onClose={hideDialog}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullScreen
            >
                <DialogTitle id="dialog-title" style={{ padding: '0px' }}>
                    <div className="p-grid  p-col-12">
                        <div className="p-col-5 p-lg-9 p-xl-9">
                            <div className="p-col-12">
                                <button type="button" onClick={hideDialog} className="p-grid "
                                    style={{ background: 'white', border: '0' }}    >
                                    <img src={icon} alt="img" />
                                    <label htmlFor="" className="p-mt-2 p-text-bold" style={{ color: 'var(--text-title)', fontSize: '18px' }}>VOLTAR</label>
                                </button>
                            </div>
                        </div>
                        <div className="p-col-7 p-lg-3 p-xl-3">
                            <h5 className="p-text-bold p-text-uppercase p-mt-2 titulo-modal"
                                style={{ color: 'var(--secondary)' }}>
                                CÓDIGO DO PEDIDO:{store.pedido.id}
                            </h5>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'} style={{ background: 'var(--background)' }}>
                    <FormControl>
                        <div className="card p-p-2">
                            <div className="p-grid p-col-12 p-text-center">
                                <div className="p-col-12 p-lg-2 p-xl-2 p-ml-1">
                                    <div className='p-field p-p-2 button-status'>
                                        <i className='pi pi-file p-pb-3'></i>
                                        <br />
                                        <h4>Pedidos Realizados</h4>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-2 p-xl-3">
                                    <div className='p-field  p-p-2 button-status'>
                                        <i className='pi pi-money-bill p-pb-3'></i>
                                        <br />
                                        <h4>Pedido Pago</h4>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-2 p-xl-2 p-mr-3">
                                    <div className='p-field p-p-2 button-status'>
                                        <i className='pi pi-send p-pb-3'></i>
                                        <br />
                                        <h4>Pedido Enviado</h4>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-2 p-xl-2 p-mr-3">
                                    <div className='p-field p-p-2 button-status'>
                                        <i className='pi pi-map-marker p-pb-3'></i>
                                        <br />
                                        <h4>Pedido Recebido</h4>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-2 p-xl-2">
                                    <div className='p-field p-p-2 button-status'>
                                        <i className='pi pi-star-o p-pb-3'></i>
                                        <br />
                                        <h4>Pedido Avaliado</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="datatable-crud-demo datatable-responsive-demo">
                                <div className="table">
                                    <DataTable
                                        value={store.pedido.produtos}
                                        dataKey="id"
                                        scrollable
                                        scrollHeight={'30rem'}
                                        className="p-datatable-responsive-demo"
                                    >
                                        <Column field="" body={bodyTemplateColumnA} headerStyle={{ background: '#fff' }}></Column>
                                        <Column field="titulo" body={bodyTemplateColumnB} headerStyle={{ width: '45%', background: '#fff' }}></Column>
                                        <Column field="quantidadeVendida" body={bodyTemplateColumnC} headerStyle={{ width: '15%', background: '#fff' }}></Column>
                                        <Column field="valor" body={bodyTemplateColumnD} headerStyle={{ width: '15%', background: '#fff' }}></Column>
                                        <Column body={actionBodyTemplate} headerStyle={{ background: '#fff' }}></Column>
                                    </DataTable>
                                </div>
                            </div>
                            <Divider />
                            <div className="p-grid p-col-12">
                                <div className='p-col-12 p-lg-10 p-xl-10'>
                                    <h3 style={{ color: 'var(--text-title)' }}>Endereço de entrega</h3>
                                </div>
                                <div className='p-col-12 p-lg-2 p-xl-2 p-text-right'>
                                    <h4 style={{ color: 'var(--text-title)' }}>Código dos correios</h4>
                                    <h5>{codigo}</h5>
                                </div>

                            </div>
                            <div className="p-grid p-col-12">
                                <div className='p-col-12 p-lg-4 p-xl-4'>
                                    <label htmlFor="">{store.pedido.cliente.nome}</label>
                                    <label htmlFor="">{store.pedido.cliente.telefone}</label>
                                    <label htmlFor="">{store.pedido.cliente.endereço}</label>
                                    <Divider className="divider" layout="vertical" />
                                </div>
                                <div className='timeline-demo p-col-12 p-lg-8 p-xl-8'>
                                    <div className="card">
                                        <Timeline value={events} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
                                    </div>

                                </div>
                            </div>
                            <Divider />
                            <div className="p-grid p-col-12">
                                <div className='p-col-12 p-lg-8 p-xl-8'>
                                    <h2 style={{ color: 'var(--text-title)' }}>Detalhes de pagamento</h2>
                                </div>
                                <div className='p-col-12 p-lg-4 p-xl-4 p-text-right'>
                                    <h4 className='p-pb-3' style={{ color: 'var(--text-title)' }}>
                                        Valor do Frete: {Utils.formatCurrency(store.pedido.valorFrete)}
                                    </h4>
                                    <h4 className='p-pb-3' style={{ color: 'var(--text-title)' }}>
                                        Cupom de desconto: {Utils.formatCurrency(store.pedido.valorDesconto)}
                                    </h4>
                                    <h4 style={{ color: 'var(--text-title)' }}>
                                        Valor total dos produtos: {Utils.formatCurrency(store.pedido.valorTotal)}
                                    </h4>
                                </div>
                            </div>
                            <Divider />
                            <div className="p-col-12 p-text-right">
                                <h1 style={{ color: 'var(--text-title)' }}>
                                    TOTAL PAGO <span style={{ color: 'var(--secondary)' }}>{(Utils.formatCurrency(store.pedido.valorTotal + store.pedido.valorFrete - store.pedido.valorDesconto))}</span>
                                </h1>
                            </div>
                            <Divider />
                            <div className="p-col-12 p-text-right">
                                <h2 style={{ color: 'var(--text-title)' }}>
                                    Método de pagamento <span style={{ color: 'var(--primary)' }}>{' Boleto avista x 1 ' + Utils.formatCurrency(store.pedido.valorTotal + store.pedido.valorFrete - store.pedido.valorDesconto)}</span>
                                </h2>
                            </div>
                        </div>
                    </FormControl>
                </DialogContent>
                {/* <DialogActions >
            <div className="but-save">
                <ButtonBase label="SALVAR" icon="" className="p-button-success p-mt-3 " onClick={save} />
            </div>
        </DialogActions> */}
                <Toast ref={msg} />
            </Dialog>
        </Container>
    );
}

