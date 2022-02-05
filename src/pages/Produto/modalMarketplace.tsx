import React, { useEffect, useRef, useState } from 'react';

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
import { Container, FormControl } from "./styles";
import { Carousel } from 'primereact/carousel';
import markets from './markets.json'

// import { Container } from './styles';
interface DetalhesProps {
    store: any;
    closeFuncion: Function;
    modalDialog: boolean;
}

export const ModalMarketplace: React.FC<DetalhesProps> = (props) => {
    const store = props.store;
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [modalLoad, setModalLoad] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const msg = useRef<Toast>(null);

    const hideDialog = () => {
        props.closeFuncion();
    }

    const responsiveOptionsProduts = [
        { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
        { breakpoint: '600px', numVisible: 2, numScroll: 2 },
        { breakpoint: '480px', numVisible: 1, numScroll: 1 }
    ];

    const onEventDetalhes = () => {

    }

    //templante de itens
    const productTemplate = (market: any) => {
        let img = '';
        if (market.logo) {
            img = market.logo;
        }

        return (
            <div className="product-item">
                <div id='market-1' className="cursor-pointer product-item-content p-shadow-2" onClick={() => onEventDetalhes()}>
                    <div className="p-mb-3 p-text-center">
                        <img style={{ width: "100%" }} src={img} onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                            alt={market.nome}
                            className="product-image" />
                    </div>
                    <div className='p-p-2'>
                        <h5 className="p-mb-1">{market.nome}</h5>
                        <label className='preco p-text-bold' htmlFor="preco">{Utils.formatCurrency(market.descricao)}</label>
                    </div>
                    <div className='p-p-2 p-text-right'>
                        {/* <Rating value={product.estrelas} readOnly stars={5} cancel={false} /> */}
                        <small className='p-ml-3'>266 vendidos</small>
                    </div>
                </div>
            </div>
        );
    }

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
                        <div className="p-col-5 p-lg-6 p-xl-6">
                            <div className="p-col-12">
                                <button type="button" onClick={hideDialog} className="p-grid "
                                    style={{ background: 'white', border: '0' }}    >
                                    <img src={icon} alt="img" />
                                    <label htmlFor="" className="p-mt-2 p-text-bold" style={{ color: 'var(--text-title)', fontSize: '18px' }}>VOLTAR</label>
                                </button>
                            </div>
                        </div>
                        <div className="p-col-7 p-lg-6 p-xl-6 p-text-right">
                            <h5 className="p-text-bold p-text-uppercase p-mt-2 titulo-modal"
                                style={{ color: 'var(--secondary)' }}>
                                Gerencimaneto de anúncios
                            </h5>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'} style={{ background: 'var(--background)' }}>
                    <FormControl>
                        <div>
                            <Carousel value={markets.dados} numVisible={4} numScroll={4}
                                responsiveOptions={responsiveOptionsProduts}
                                className="custom-carousel p-mt-4"
                                circular
                                autoplayInterval={5000}
                                itemTemplate={productTemplate}
                            />
                        </div>
                        <div className="card p-p-2">


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
