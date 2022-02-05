import React, { useEffect, useRef, useState } from 'react';

import { Dialog, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { Timeline } from 'primereact/timeline';
import { Toast } from 'primereact/toast';
import { ModalLoad } from '../../components/ModalLoad';
import { PedidoService } from '../../services/PedidoService/pedidoService';
import { Utils } from "../../utils/utils";
import { Container, FormControl } from "./styles";
import icon from "../../assets/icon-voltar.png";
import { Tag } from 'primereact/tag';
import { UtilsDate } from '../../utils/utilsDate';
import { Carousel } from 'primereact/carousel';

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
    const [submitted, setSubmitted] = useState(false);
    const msg = useRef<Toast>(null);

    const hideDialog = () => {
        props.closeFuncion();
    }

    //templante de itens
    const responsiveOptionsProduts = [
        { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
        { breakpoint: '600px', numVisible: 2, numScroll: 2 },
        { breakpoint: '480px', numVisible: 1, numScroll: 1 }
    ];

    const productTemplate = (rowData: any) => {
        let img = '';
        if (rowData.url) {
            img = rowData.url;
        }

        return (
            <div className="product-item">
                <div id='market-1' className="cursor-pointer product-item-content p-shadow-2">
                    <div className="p-mt-1 p-text-center">
                        <img style={{ width: "100%" }} src={img} onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                            alt={rowData.id}
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
                            CÓDIGO: {store.produto.id}
                        </h5>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent dividers={scroll === 'paper'} style={{ background: 'var(--background)' }}>
                <FormControl>
                    <div className="card p-p-2">
                        <div className='p-p-3 p-grid'>
                            <h5 className='label-text'>Informações do anúncio</h5>
                            <div className="p-col-8 p-lg-11 p-xl-11">
                                <label className='p-text-bold' htmlFor="">Título:</label>
                                <h4>{store.produto.titulo}</h4>
                            </div>
                            <div className="p-col-4 p-lg-1 p-xl-1 p-grid">
                                <Tag severity={store.produto.status === 'active' ? 'success' : 'danger'} value={store.produto.status === 'active' ? 'ATIVO' : 'PAUSADO'} rounded></Tag>
                            </div>
                        </div>
                        <Divider />
                        <div className='p-p-3'>
                            <label className='p-text-bold' htmlFor="">Preço:</label>
                            <h4>{Utils.formatCurrency(store.produto.precoVarejo)}</h4>
                        </div>
                        <div className='p-p-3 p-grid'>
                            <div className='p-col-12 p-lg-4 p-xl-4'>
                                <label className='p-text-bold' htmlFor="">Quant. Ininical:</label>
                                <h4>{store.produto.quantidade}</h4>
                            </div>
                            <div className='p-col-12 p-lg-4 p-xl-4'>
                                <label className='p-text-bold' htmlFor="">Quant. Disponivel:</label>
                                <h4>{store.produto.qtn_inicial}</h4>
                            </div>
                            <div className='p-col-12 p-lg-4 p-xl-4'>
                                <label className='p-text-bold' htmlFor="">Quant. Vendida:</label>
                                <h4>{store.produto.qtn_vendida}</h4>
                            </div>
                        </div>
                        <div className='p-p-3 p-grid'>
                            <div className='p-col-12 p-lg-4 p-xl-4'>
                                <label className='p-text-bold' htmlFor="">Data de criação:</label>
                                <h4>{UtilsDate.formatByDDMMYYYY(store.produto.dt_create)}</h4>
                            </div>
                            <div className='p-col-12 p-lg-4 p-xl-4'>
                                <label className='p-text-bold' htmlFor="">Data da ultima atualização:</label>
                                <h4>{UtilsDate.formatByDDMMYYYY(store.produto.dt_update)}</h4>
                            </div>
                        </div>
                        <div className='p-col-12'>
                        <h5 className='label-text'>Imagens do anúncio</h5>
                        </div>
                        <Divider />
                        <div className='p-col-12 p-lg-12 p-xl-12'>
                            <Carousel value={store.produto.imagens} numVisible={4} numScroll={4}
                                responsiveOptions={responsiveOptionsProduts}
                                className="custom-carousel p-mt-4"
                                circular
                                autoplayInterval={5000}
                                itemTemplate={productTemplate}
                            />
                        </div>
                    </div>
                </FormControl>
            </DialogContent>
            <Toast ref={msg} />
            <ModalLoad visible={modalLoad} />
        </Dialog>

    );
}