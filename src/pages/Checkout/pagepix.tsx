import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { Logo } from '../../components/logo';
import { Container } from './styles';
import icon from "../../assets/icon-voltar.png";
import iconPix from "../../assets/logo-pix.png";
import iconCel from "../../assets/icon-cel.png";
import { Utils } from '../../utils/utils';
import { ButtonBase } from '../../components/ButtonBase';
import { UtilsDate } from '../../utils/utilsDate';

// import { Container } from './styles';
interface Pixprops {
    qr_code_base64: string;
    qr_code: string;
    data_expired: string;
    closeFuncion: Function;
    modalDialog: boolean;
    valor: number;
}

const PagePix: React.FC<Pixprops> = (props) => {

    const hideDialog = () => {
        props.closeFuncion();
    }

    const copiarCode = () => {
        let code = document.getElementById('codigo-pix');
        document.execCommand('copy');
    }

    return (
        <Dialog
            className="p-col-12"
            open={props.modalDialog}
            onClose={hideDialog}
            // scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullScreen
        >
            <DialogTitle id="dialog-title" style={{ padding: '0px' }}>
                <div className="p-grid  p-col-12">
                    <div className="p-col-5 p-lg-9 p-xl-9">
                        <div className="p-col-12">
                            <button type="button" onClick={hideDialog} className="p-grid"
                                style={{ background: 'white', border: '0' }}    >
                                <img src={icon} alt="img" />
                                <label htmlFor="" className="p-mt-2 p-text-bold" style={{ color: 'var(--text-title)', fontSize: '18px' }}>VOLTAR</label>
                            </button>
                        </div>
                    </div>
                    <div className="p-col-7 p-lg-3 p-xl-3">
                        <h5 className="p-text-bold p-text-uppercase p-mt-2 titulo-modal"
                            style={{ color: 'var(--secondary)' }}>
                            {/* CÓDIGO DO PEDIDO:{store.checkout} */}
                        </h5>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent style={{ background: 'var(--background)' }}>
                <Container>
                    <div className='card center p-md-12 p-lg-6 p-xl-6'>
                        <div className='p-text-center p-col-12'>
                            <img src={iconPix} alt="img" style={{ width: '200px', height: '80px' }} />
                        </div>
                        <div className='p-col-12 p-p-3'>
                            <div className="p-grid p-col-12 ">
                                <label htmlFor="valor" className="p-text-bold p-mr-3">Valor do pagamento:</label>
                                <h5>{Utils.formatCurrency(props.valor)}</h5>
                            </div>
                            <div className="p-grid p-col-12">
                                <label htmlFor="valor" className="p-text-bold p-mr-3">Código PIX válido até:</label>
                                <h5>{UtilsDate.formatByDDMMYYYY(new Date(props.data_expired))}</h5>
                            </div>
                        </div>
                        <div className='p-col-12 p-grid'>
                            <div className='p-text-right p-col-6 p-mt-6'>
                                <img src={iconCel} alt="img" style={{ width: '150px', height: '150px' }} />
                            </div>
                            <div className=' p-col-6'>
                                <img src={`data:image/jpeg;base64,${props.qr_code_base64}`} style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                        <div className='p-text-center p-col-12 p-p-5'>
                            <div className=' p-col-12 p-field card  p-p-2' style={{ background: '#D3D3D3' }}>
                                <label className='p-text-bold p-col-12' htmlFor="copy" >Ou pague copiando o código</label>
                                <input id='codigo-pix' className='p-col-12 p-mb-3 p-text-bold label-codigo p-text-center' value={props.qr_code}></input>
                                <ButtonBase icon='' label='COPIAR' className='p-button-success'/>
                            </div>
                        </div>
                        <div className='p-text-center p-col-12 p-text-bold'>
                            <label htmlFor="">Em caso de análise, a transação pode demorar até 60 minutos para ser confrimada.</label>
                        </div>
                    </div>
                </Container>
            </DialogContent>
        </Dialog>

    );
}

export default PagePix;