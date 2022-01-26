import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { Timeline } from 'primereact/timeline';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import icon from "../../assets/icon-voltar.png";
import { ModalLoad } from '../../components/ModalLoad';
import { PedidoService } from '../../services/PedidoService/pedidoService';
import { Utils } from "../../utils/utils";
import { Container, FormControl } from "./styles";
import {statusPedido} from './enumStatus';

interface DetalhesProps {
    store: any;
    closeFuncion: Function;
    modalDialog: boolean;
}

export const DetalhePedido: React.FC<DetalhesProps> = (props) => {

    const store = props.store;
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [modalLoad, setModalLoad] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const msg = useRef<Toast>(null);
    const [events, setEvents] = useState([]);
    const pedidoService = new PedidoService();
    const codigo = store.pedido.codigoRastreio;
    const [colorIcon1,setColor1]=useState('');
    const [colorIcon2,setColor2]=useState('');
    const [colorIcon3,setColor3]=useState('');
    const [colorIcon4,setColor4]=useState('');
    const [colorIcon5,setColor5]=useState('');
   

    const iconInicio = 'pi pi-inbox', iconProgresso = 'pi pi-send', iconFim='pi pi-user', iconSaio='pi pi-sign-out';
    const corInicio = '#607D8B', corProgresso = '#FF9800';
    
    useEffect(() => {
        
        if (props.modalDialog && props.store.pedido.estatus !== 'CANCELADO' && props.store.pedido.estatus !== 'NAO_ENVIADO' && props.store.pedido.estatus !== 'PENDENTE') {
           setModalLoad(true);
           testeStatusPedido();
            pedidoService.getRastreio(codigo).then(data => {
                console.log(data);
                let cont = 0;
                data.forEach(function (item: { icon: string; color: string; }) {

                    if (cont === 0) {
                        item.icon = iconInicio;
                        item.color = corInicio;
                    }
                    else if (data.length === cont + 1) {
                        item.icon = iconFim;
                        item.color = '#008000';
                    }  else if (data.length-1 === cont+1) {
                        item.icon = iconSaio;
                        item.color = '#008000';
                    }
                    else {
                        item.icon = iconProgresso;
                        item.color = corProgresso;
                    }
                    cont++;
                })
                setEvents(data.reverse());
                setModalLoad(false);
            }
            ).catch(error => {
                setModalLoad(false);
                Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
            });

            // pedidoService.getPedidosById(store.pedido.id).then(data => {
            //     store.pedido.produtos = data;
            // }).catch(error => {
            //     Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
            // });
        }else{
            setEvents([]); 
            setColor1('');
            setColor2('');
            setColor3('');
            setColor4('');
            setColor5('');
        }

    }, [props]);

    const testeStatusPedido = () =>{
        if(store.pedido.estatus === statusPedido.PENDENTE){
            setColor1('var(--primary)');
        }else if(store.pedido.estatus === statusPedido.FINALIZADO){
            setColor1('var(--primary)');
            setColor2('var(--primary)');
        }else if(store.pedido.estatus === statusPedido.ENVIADO){
            setColor1('var(--primary)');
            setColor2('var(--primary)');
            setColor3('var(--primary)');
        }else if(store.pedido.estatus === statusPedido.RECEBIDO){
            setColor1('var(--primary)');
            setColor2('var(--primary)');
            setColor3('var(--primary)');
            setColor4('var(--secondary)');
        }else if(store.pedido.estatus === statusPedido.RECEBIDO){
            setColor1('var(--primary)');
            setColor2('var(--primary)');
            setColor3('var(--primary)');
            setColor4('var(--secondary)');
            setColor5('#ffff00');
        }
    }


    const hideDialog = () => {
        props.closeFuncion();
    }

    const bodyTemplateColumnA = (rowData: any) => {
        let imgURL = ''
        if (rowData.produto.imagens[0].objectURL) {
            imgURL = rowData.produto.imagens[0].objectURL;
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
                <h5>{rowData.produto.titulo}</h5>
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
                <h3 style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>{Utils.formatCurrency(rowData.quantidadeVendida * rowData.produto.precoVarejo)}</h3>
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
            <div className='card p-shadow-2 p-p-3' style={{marginTop:'-1rem', marginBottom: '1.5rem', width:'100%'}}>
                <h4 className='p-mb-1'>{item.status}</h4>
                <h5 className='p-mb-2'>{item.data + ' ' + item.hora}</h5>
                {item.origem ?
                    <>
                        <p className='p-mr-1 p-mb-2'><span className='p-text-bold'>Saida:</span> {item.origem}</p>
                        <p className='p-mr-1'><span className='p-text-bold p-mr-1'>Para:</span>{item.destino}</p>
                    </> :
                    <p>{item.local}</p>
                }
            </div>
            // <Card title={item.status} subTitle={item.data + ' ' + item.hora}>
            //     {item.origem ?
            //         <>
            //             <p><span className='p-text-bold p-mr-1'>Saida:</span> {item.origem}</p>
            //             <p><span className='p-text-bold p-mr-1'>Para:</span>{item.destino}</p>
            //         </> :
            //         <p>{item.local}</p>
            //     }
            //     {/* <Button label="Read more" className="p-button-text"></Button> */}
            // </Card>
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
                                        <i style={{color: colorIcon1}} className='pi pi-file p-pb-3'></i>
                                        <br />
                                        <h4>Pedidos Realizados</h4>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-2 p-xl-3">
                                    <div className='p-field  p-p-2 button-status' >
                                        <i style={{color: colorIcon2}} className='pi pi-money-bill p-pb-3'></i>
                                        <br />
                                        <h4>Pedido Pago</h4>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-2 p-xl-2 p-mr-3">
                                    <div className='p-field p-p-2 button-status'>
                                        <i style={{color: colorIcon3}} className='pi pi-send p-pb-3'></i>
                                        <br />
                                        <h4>Pedido Enviado</h4>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-2 p-xl-2 p-mr-3">
                                    <div className='p-field p-p-2 button-status'>
                                        <i style={{color: colorIcon4}} className='pi pi-map-marker p-pb-3'></i>
                                        <br />
                                        <h4>Pedido Recebido</h4>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-2 p-xl-2">
                                    <div className='p-field p-p-2 button-status'>
                                        <i style={{color: colorIcon5}} className='pi pi-star-o p-pb-3'></i>
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
                                <div className='p-col-12 p-lg-3 p-xl-3'>
                                    <div className='label-text p-text-bold p-mb-2'>
                                        <label htmlFor="">{store.pedido.cliente.usuario.nome}</label>
                                    </div>
                                    <div className='label-text p-mb-2 p-text-bold'>
                                        <label className='label-text p-mb-2' htmlFor="">{store.pedido.cliente.celular}</label>
                                    </div>
                                    <div className='label-text p-mb-2'>
                                        <label className='label-text' htmlFor="">{store.pedido.enderecoEntrega.logradouro+", "+store.pedido.enderecoEntrega.numero+" - "+store.pedido.enderecoEntrega.bairro}</label>
                                    </div>
                                    <div className='label-text p-mb-2'>
                                        <label className='label-text' htmlFor="">{store.pedido.enderecoEntrega.complemento +"   "+ store.pedido.enderecoEntrega.cidade +" - "+ store.pedido.enderecoEntrega.uf +", "+ store.pedido.enderecoEntrega.cep }</label>
                                    </div>
                                </div>
                                <Divider className="divider" layout="vertical" />
                                <div className='timeline-demo p-col-12 p-lg-8 p-xl-8'>
                                    <div className="card">
                                        <Timeline value={events} className="timeline-demo" marker={customizedMarker} content={customizedContent} />
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
                                    Método de pagamento <span style={{ color: 'var(--primary)' }}>{store.pedido.pagamento.tipo+' - '+store.pedido.pagamento.numeroDeParcelas+"x de "+ Utils.formatCurrency((store.pedido.valorTotal + store.pedido.valorFrete - store.pedido.valorDesconto)/store.pedido.pagamento.numeroDeParcelas)}</span>
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
                <ModalLoad visible={modalLoad} />
            </Dialog>
        </Container>
    );
}

