import React, { useContext, useEffect, useRef, useState } from 'react';

import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Toast } from 'primereact/toast';
import icon from "../../assets/icon-voltar.png";
import { ButtonBase } from '../../components/ButtonBase';
import { InputBase } from '../../components/InputBase';
import { ModalLoad } from '../../components/ModalLoad';
import { ClienteService } from '../../services/ClienteService/clienteService';
import { Utils } from "../../utils/utils";
import Ufs from './listaUF.json';
import { Container, FormControl } from "./styles";
import EnderecoStore  from '../../stores/EnderecoStore'
import { IEndereco } from '../../domain/types/IEndereco';



interface DetalhesProps {
    store: any;
    closeFuncion: Function;
    visible: boolean;
}

export const FormEndereco: React.FC<DetalhesProps> = (props) => {
    const store = useContext(EnderecoStore);
    const novo = {id: null,logradouro:'',numero:'',complemento:'',bairro:'',cidade:'',cep:'',uf :'',padrao: ''}
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const msg = useRef<Toast>(null);
    const [selectedUF, setSelectedUF] = useState<any>(null);
    const clienteService = new ClienteService();
    const [modalLoad, setModalLoad] = useState(false);
    const [endereco,setEndereco] = useState<IEndereco>(novo);

    // useEffect(() => {
    //     if (props.store === "") {
    //         console.log('3');
    //         store.new();
    //     } else {
    //         console.log('2');
    //         store.load(props.store);
    //         let uf = Ufs.estados.filter((e: any) => e.code === store.objPage.uf);
    //         setSelectedUF(uf[0]);
    //     }
    // }, [props.store]);


    const hideDialog = () => {
        props.closeFuncion();
    }


    const enviaMsgZap = (tipo: String) => {

    }

    const onSave = () => {
        let cliente = Utils.getClienteLocal();
        cliente.enderecos.push(store.objPage);
        clienteService.post(cliente).then(data => {
            setModalLoad(true);
            Utils.setClienteLocal(data);
            hideDialog();
            setModalLoad(false);
            Utils.messagemShow(msg, 'success', 'Salvo', '😃 Alterado com sucesso!', 5000);
        }).catch(error => {
            setModalLoad(false);
            Utils.messagemShow(msg, 'error', 'Erro no salvar', error.mensagemUsuario, 5000);
        });
    }

    const onCityChange = (e: { value: any }) => {
        setSelectedUF(e.value);
        store.objPage.uf = e.value;
    }

    const onSetValues = (e: any, id: number) =>{
       let _endereco = endereco;
       _endereco.logradouro = e.target.value;
       setEndereco(_endereco);
       console.log(endereco);
    //    if(id===1){
    //     _endereco.logradouro = e.target.value;
    //     setEndereco(_endereco);
    //    }
    }


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
                style={{ zIndex: 999 }}
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
                        {/* <div className="card p-p-3 p-shadow-2">
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
                        </div> */}
                        <div className="card p-p-3 p-mt-3 p-shadow-2">
                            <div>
                                <span className='lable-lista'>Dados do endereço</span>
                            </div>
                            <div className='p-mt-2'>
                                <div className='p-field p-col-12 p-lg-2 p-xl-2 p-mt-1'>
                                    <label htmlFor="">CEP<span className="p-ml-1" style={{ color: 'red' }}>*</span></label>
                                    <InputMask mask="99999-999" placeholder='99999-999' type='text' value={store.objPage.cep} onChange={(e) => (store.objPage.cep = e.target.value)} style={{ width: '100%' }} />
                                </div>
                                <div className='p-p-2 p-grid'>
                                    <div className='p-col-12 p-lg-9 p-xl-9'>
                                        <InputBase type='text' label='Logradouro' placeholder='Digite seu endereço' value={endereco.logradouro} onChange={(e) => onSetValues(e,1)}/>
                                    </div>
                                    <div className='p-col-12 p-lg-3 p-xl-3'>
                                        <InputBase type='text' label='Número' placeholder='Digite o número da residência' value={store.objPage.numero} onChange={(e) => {store.objPage.numero = e.currentTarget.value}}/>
                                    </div>
                                    <div className='p-col-12 p-lg-5 p-xl-5'>
                                        <InputBase type='number' label='Bairro' placeholder='Digite o nome do bairro' value={store.objPage.bairro} onChange={(e) => (store.objPage.bairro = e.target.value)}/>
                                    </div>
                                    <div className='p-col-12 p-lg-5 p-xl-5'>
                                        <InputBase type='text' label='Complemento (opcional)' placeholder='Apartamento, sala, conjunto, edifício, andar, ect.' value={store.objPage.complemento} onChange={(e) => {store.objPage.complemento = e.target.value}}/>
                                    </div>
                                    <div className='p-field p-col-12 p-lg-2 p-xl-2 p-mt-1'>
                                        <label htmlFor="" style={{ width: '100%' }}>UF</label>
                                        <Dropdown className='test' value={selectedUF} options={Ufs.estados} onChange={onCityChange} optionLabel="name" placeholder="Escolha o estado" style={{ zIndex: '9999' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormControl>
                    <div className="p-text-right p-mt-3">
                        <ButtonBase icon='pi pi-check' label='Salvar' className="p-button-success p-pr-6 p-pl-6" onClick={onSave}/>
                    </div>
                </DialogContent>
            </Dialog>
            <ModalLoad visible={modalLoad} />
            <Toast ref={msg} />
        </Container>
    );
}

