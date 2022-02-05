import { Dialog, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog';
import { Tag } from 'primereact/tag';
import { Timeline } from 'primereact/timeline';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import icon from "../../assets/icon-voltar.png";
import { ModalLoad } from '../../components/ModalLoad';
import { Utils } from "../../utils/utils";
import { UtilsDate } from '../../utils/utilsDate';
import { FormControl } from "./styles";



// import { Container } from './styles';
interface DetalhesProps {
    store: any;
    closeFuncion: Function;
    modalDialog: boolean;
}

export const Detalhes: React.FC<DetalhesProps> = (props) => {
    const store = props.store;
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [modalLoad, setModalLoad] = useState(false);
    const msg = useRef<Toast>(null);

    const hideDialog = () => {
        props.closeFuncion();
    }

    let listItems = [];
    if (store !== undefined) {
        listItems = store.order_items.map((element: any, id: number) =>
            <div className='center p-grid p-col-12' style={{ background: 'var(--white)' }}>
                <div className='p-grid p-col-6'>{element.item.title}</div>
                <div className='p-grid p-col-3'>{element.quantity} </div>
                <div className='p-grid p-col-3'>{Utils.formatCurrency(element.unit_price * element.quantity)}</div>
            </div>
        );
    }

    return (
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
                    <div className="p-col-5 p-lg-10 p-xl-10">
                        <div className="p-col-12">
                            <button type="button" onClick={hideDialog} className="p-grid "
                                style={{ background: 'white', border: '0' }}    >
                                <img src={icon} alt="img" />
                                <label htmlFor="" className="p-mt-2 p-text-bold" style={{ color: 'var(--text-title)', fontSize: '18px' }}>VOLTAR</label>
                            </button>
                        </div>
                    </div>
                    <div className="p-col-7 p-lg-2 p-xl-2">
                        <h5 className="p-text-bold p-text-uppercase p-mt-2 titulo-modal"
                            style={{ color: 'var(--secondary)' }}>
                            CÓDIGO: {store !== undefined ? store.id : 0}
                        </h5>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent dividers={scroll === 'paper'} style={{ background: 'var(--background)' }}>
                <FormControl>
                    <div className="card p-p-2">
                        <div className='p-p-3 p-grid'>
                            <div className="p-col-12">
                                <h5 className='label-text'>Informações do pedido</h5>
                            </div>
                            <div className="p-col-12 p-lg-9 p-xl-9">
                                <label className='p-text-bold' htmlFor="">Cliente:</label>
                                <h4>{store !== undefined ? store.buyer.nickname : ''}</h4>
                            </div>
                            <div className='p-col-8 p-lg-2 p-xl-2'>
                                <label className='p-text-bold' htmlFor="">Valor:</label>
                                <h4>{Utils.formatCurrency(store !== undefined ? store.total_amount : '')}</h4>
                            </div>
                            <div className="p-col-4 p-lg-1 p-xl-1 p-grid">
                                <Tag className='p-shadow-2' severity={store !== undefined ? store.status === 'active' ? 'success' : 'danger' : ''} value={store !== undefined ? store.status === 'active' ? 'ATIVO' : 'CANCELADO' : ''} rounded></Tag>
                            </div>
                        </div>
                        <Divider />
                        <div className='p-p-3 p-grid'>
                            <div className='p-col-12 p-lg-4 p-xl-4'>
                                <label className='p-text-bold' htmlFor="">Data de criação:</label>
                                <h4>{UtilsDate.formatByDDMMYYYY(store !== undefined ? store.date_created : '')}</h4>
                            </div>
                            <div className='p-col-12 p-lg-4 p-xl-4'>
                                <label className='p-text-bold' htmlFor="">Data da ultima atualização:</label>
                                <h4>{UtilsDate.formatByDDMMYYYY(store !== undefined ? store.expiration_date : '')}</h4>
                            </div>
                        </div>

                        <div className='p-col-12'>
                            <div className='p-grid'>
                                <div className='p-col-12 p-lg-5 p-xl-5'>
                                    <h5 className='label-text'>Lista de produtos</h5>
                                    <Divider />
                                    <div className='p-col-12' style={{ background: '#d3d3d3', marginTop: '0.5rem' }}>
                                        <div className='card center p-grid p-col-12'>
                                            <div className='p-col-6'><label htmlFor="resumo" className='label-title'>Produto</label></div>
                                            <div className='p-col-3'><label htmlFor="resumo" className='label-title'>Qtde</label></div>
                                            <div className='p-col-3'><label htmlFor="resumo" className='label-title'>Preço</label></div>
                                        </div>
                                        <ul className='p-mb-2'>{listItems}</ul>
                                    </div>
                                </div>
                                <div className='p-col-12 p-lg-4 p-xl-4'>
                                    <h5 className='label-text'>Detalhes do pagamento</h5>
                                    <Divider />
                                    <div className='p-col-12 card-pagamento'>
                                        <div className='p-grid'>
                                            <div className='p-col-12 p-text-center'>
                                                <h6>COMPROVANTE DE PAGAMENTO</h6>
                                                <Divider />
                                            </div>
                                            <div className='p-col-12  p-text-justify'>
                                                <h6 className='p-field'>{`Data de pagamento: ${store !== undefined ? UtilsDate.formatByDDMMYYYY(store.payments[0].date_approved) : ''}`}</h6>
                                                <Divider />
                                            </div>
                                        </div>
                                        <table className="printer-ticket">

                                            <div className="sup ttu p--0">
                                                <b>Detalhes</b>
                                            </div>
                                            <tr className="ttu">
                                                <td >Sub-total</td>
                                                <td align="right">{Utils.formatCurrency(store !== undefined ? store.payments[0].transaction_amount_refunded : 0)}</td>
                                            </tr>
                                            <tr className="ttu">
                                                <td >Taxa de serviço</td>
                                                <td align="right">{Utils.formatCurrency(store !== undefined ? store.payments[0].taxes_amount : 0)}</td>
                                            </tr>
                                            <tr className="ttu">
                                                <td >Desconto</td>
                                                <td align="right">{Utils.formatCurrency(store !== undefined ? store.payments[0].coupon_amount : 0)}</td>
                                            </tr>
                                            <tr className="ttu">
                                                <td >Total</td>
                                                <td align="right">{Utils.formatCurrency(store !== undefined ? store.payments[0].total_paid_amount : 0)}</td>
                                            </tr>
                                            <Divider />
                                            <div className="sup ttu p-mt-2">
                                                <b>Pagamento</b>
                                            </div>
                                            <tr className="ttu">
                                                <td >{store !== undefined ? store.payments[0].payment_type.includes('money') ? 'Dinheiro' : 'Cartão de crédito' : ''}</td>
                                                <td align="right">{Utils.formatCurrency(store !== undefined ? store.payments[0].total_paid_amount : 0)}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div className='p-col-12 p-lg-3 p-xl-3'>
                                    <h5 className='label-text'>histórico de status</h5>
                                    <Divider />
                                    <div className='p-mt-3'>
                                        <Timeline value={store !== undefined ? store.tags : []} content={(item) => item === 'pack_order' ?
                                            'Pedido confirmado' : item === 'not_delivered' ? 'Não entregue' : 'Não pago'
                                        } />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <Divider />
                    </div>
                </FormControl>
            </DialogContent>
            <Toast ref={msg} />
            <ModalLoad visible={modalLoad} />
        </Dialog>

    );
}