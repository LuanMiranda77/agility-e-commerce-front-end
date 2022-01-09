import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputMask } from 'primereact/inputmask';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import icon from "../../assets/icon-voltar.png";
import { ButtonBase } from '../../components/ButtonBase';
import { InputBase } from '../../components/InputBase';
import { PedidoService } from '../../services/PedidoService/pedidoService';
import { Utils } from "../../utils/utils";
import { Container, FormControl } from "./styles";


interface DetalhesProps {
    store: any;
    closeFuncion: Function;
    visible: boolean;
}

export const FormEndereco: React.FC<DetalhesProps> = (props) => {
    const store = props.store;

    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [submitted, setSubmitted] = useState(false);
    const [events, setEvents] = useState([]);
    const msg = useRef<Toast>(null);
    const pedidoService = new PedidoService();




    useEffect(() => {
        // pedidoService.getRastreio(codigo).then(data => {


        // }
        // ).catch(error => {
        //     Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
        // });

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
                    </> :
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
                open={props.visible}
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
                                    <label htmlFor="" className="p-mt-2 p-ml-2 p-text-bold" style={{ color: 'var(--text-title)', fontSize: '1.7rem' }}>Adicionar um novo endereço</label>
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'} style={{ background: 'var(--background)' }}>
                    <FormControl>
                        <div className="card p-p-3 p-shadow-2">
                            <div>
                                <span className='lable-lista'>Dados do recebedor</span>
                            </div>
                            <div className='p-grid p-p-2 p-mt-2'>
                                <div className='p-col-12 p-lg-9 p-xl-9'>
                                    <InputBase type='text' label='Nome completo (Nome e Sobrenome)' placeholder='Digite seu nome completo'></InputBase>
                                </div>
                                <div className='p-field p-col-12 p-lg-3 p-xl-3 p-mt-1'>
                                    <label htmlFor="">Celular<span className="p-ml-1" style={{ color: 'red' }}>*</span></label>
                                    <InputMask mask="(99) 9.9999-9999" placeholder='(99) 9.9999-9999' type='text' className={classNames({ 'p-invalid': '' })} style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                        <div className="card p-p-3 p-mt-3 p-shadow-2">
                            <div>
                                <span className='lable-lista'>Dados do endereço</span>
                            </div>
                            <div className='p-mt-2'>
                                <div className='p-field p-col-12 p-lg-2 p-xl-2 p-mt-1'>
                                    <label htmlFor="">CEP<span className="p-ml-1" style={{ color: 'red' }}>*</span></label>
                                    <InputMask mask="99999-999" placeholder='99999-999' type='text' className={classNames({ 'p-invalid': '' })} style={{ width: '100%' }} />
                                </div>
                                <div className='p-p-2 p-grid'>
                                    <div className='p-col-12 p-lg-9 p-xl-9'>
                                        <InputBase type='text' label='Endereço' placeholder='Digite seu endereço'></InputBase>
                                    </div>
                                    <div className='p-col-12 p-lg-3 p-xl-3'>
                                        <InputBase type='text' label='Número' placeholder='Digite o número da residência'></InputBase>
                                    </div>
                                    <div className='p-col-12 p-lg-5 p-xl-5'>
                                        <InputBase type='text' label='Bairro' placeholder='Digite o nome do bairro'></InputBase>
                                    </div>
                                    <div className='p-col-12 p-lg-5 p-xl-5'>
                                        <InputBase type='text' label='Complemento (opcional)' placeholder='Apartamento, sala, conjunto, edifício, andar, ect.'></InputBase>
                                    </div>
                                    <div className='p-col-12 p-lg-2 p-xl-2'>
                                        <InputBase type='text' label='UF' placeholder='Digite o número da residência'></InputBase>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormControl>
                    <div className="p-text-right p-mt-3">
                        <ButtonBase icon='pi pi-check' label='Salvar' className="p-button-success p-pr-6 p-pl-6"  />
                    </div>
                </DialogContent>
                <Toast ref={msg} />
            </Dialog>
        </Container>
    );
}

