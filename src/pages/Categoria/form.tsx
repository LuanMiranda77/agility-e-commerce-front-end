import React, { useRef, useState, useEffect } from 'react';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import categoriaIcone from "../../assets/produtoIcone.svg";
import { ButtonBase } from '../../components/ButtonBase';
import { ModalLoad } from '../../components/ModalLoad';
import { CategoriaService } from "../../services/CategoriaService/categoriaService";
import { Utils } from "../../utils/utils";
import { FormControl } from "./styles";
import { MarketplaceService } from '../../services/MarketplaceService/MarketplaceService';
import { TreeSelect } from 'primereact/treeselect';

// import { Container } from './styles';
interface CategoriaProps {
    store: any;
    closeFuncion: Function;
    modalDialog: boolean;

}

export const CategoriaForm: React.FC<CategoriaProps> = (props) => {
    const store = props.store;
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [submitted, setSubmitted] = useState(false);
    const categoriaService = new CategoriaService();
    const [selectedPai, setSelectedPai] = useState<any>(null);
    const [selectedFilho, setSelectedFilho] = useState<any>(null);
    const [optionPai, setOptionPai] = useState<any>([]);
    const [optionFilho, setOptionFilho] = useState<any>(null);
    const [modalLoad, setModalLoad] = useState(false);
    const msg = useRef<Toast>(null);
    const marketplaceService = new MarketplaceService();

    useEffect(() => {
        marketplaceService.getCategoriasMercadoLivre().then(data =>{
            // Utils.messagemShow(msg, 'success', 'Salvo', '😃 Dados salvo com sucesso', 5000);
            setOptionPai(data);
        }).catch(error => {
            Utils.messagemShow(msg, 'error', 'Erro no salvar', "😱 "+error.mensagemUsuario, 5000);
        });
    }, []);

    const hideDialog = () => {
        store.novo();
        setSubmitted(false);
        props.closeFuncion();

    }

    const save = () => {
        setSubmitted(true);
        if (store.categoria.nome.trim()) {
            if (store.categoria.id !== 0) {
                categoriaService.update(store.categoria).then((res) => {
                    const index = store.findIndexById(store.categoria.id);
                    store.categorias[index] = store.categoria;
                    Utils.messagemShow(msg, 'success', 'Alterado com sucesso!', `Item: ${store.categoria.nome}`, 3000);
                    props.closeFuncion();

                })
                    .catch((error) => {
                        Utils.messagemShow(msg, 'error', 'Error na atualização', 'error.mensagemUsuario', 3000);
                        return false;
                    });
            }
            else {
                categoriaService.save(store.categoria).then(res => {
                    store.add(res);
                    Utils.messagemShow(msg, 'success', 'Cadastro com sucesso!', `Item: ${store.categoria.nome}`, 3000);
                    props.closeFuncion();

                }).catch(error => {
                    Utils.messagemShow(msg, 'error', 'Error no cadastro', error.mensagemUsuario, 3000);
                    return false;
                });

            }
        }
    }

    const onChangePai = (e: { value: any }) => {
        setSelectedPai(e.value);
        store.categoria.idCategoriaPai = e.value.id;
        console.log(e.value.id);
        marketplaceService.findByCategoriaByIdMercadoLivre(e.value.id).then(data =>{
            // Utils.messagemShow(msg, 'success', 'Salvo', '😃 Dados salvo com sucesso', 5000);
            // setOptionFilho(data);
            let arrayCateg: any[] = [];
            let itemCateg: any[] = [];
            data.children_categories.map((item: any) => {
                store.novoCateg();
                store.categoriasLivre.key = item.id;
                store.categoriasLivre.label = item.name;
                marketplaceService.findByCategoriaByIdMercadoLivre(item.id)
                .then(data => {
                    itemCateg = data.children_categories.map((item: any) => {
                        let categ = {key: "", label: "", children: []};
                        categ.key = item.id;
                        categ.label = item.name;
                        categ.children =  item.children_categories
                        return categ;
                    });
                    store.categoriasLivre.children = [...itemCateg];
                });
                console.log(store.categoriasLivre);
                arrayCateg.push(store.categoriasLivre);
                itemCateg = [];
            });
            // store.categoriasLivre.children = itemCateg ;
            
            setOptionFilho(arrayCateg);

        }).catch(error => {
            Utils.messagemShow(msg, 'error', 'Erro no carregamento', "😱 "+error.mensagemUsuario, 5000);
        });
    }

    const onChangeFilho = (e: { value: any }) => {
        setSelectedFilho(e.value);
        console.log(e.value);
        // store.categoria.idCategoriaFilho = e.value.key;

    }


    return <Dialog
        className="teste"
        open={props.modalDialog}
        onClose={hideDialog}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
        style={{ zIndex: 15 }}
    >
        <DialogTitle id="dialog-title" style={{ background: 'var(--primary)', padding: '0px' }}>
            <div className="p-grid  p-col-12 p-md-6 p-lg-12">
                <img src={categoriaIcone} alt="img" className='p-ml-5 p-mt-1' />
                <h5 className="p-text-bold p-text-uppercase p-mt-2 p-ml-2 p-pt-1 titulo-modal" style={{ color: 'var(--white)' }}>Cadastro de categoria</h5>
                <button type="button" onClick={hideDialog} className="react-modal-close" style={{ background: 'var(--primary)' }}>
                    <i className="pi pi-times" style={{ 'fontSize': '1.0rem', 'color': 'white' }} />
                </button>
            </div>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'} style={{ background: 'var(--background)' }}>
            <FormControl>
                <div className="card p-p-4">
                    <div className="p-grid">
                        <div className="p-felx p-col-12 p-ms-3 p-md-6 p-lg-12 p-field">
                            <label htmlFor="name">Nome</label>
                            <InputText id="name"
                                value={store.categoria.nome}
                                onChange={(e) => store.categoria.nome = e.target.value}
                                required
                                className={classNames({ 'p-invalid': submitted && !store.categoria.nome })}
                                style={{ width: '100%' }}
                            />
                            {submitted && !store.categoria.nome && <small className="p-error">Nome é obtigatorio.</small>}
                        </div>
                        <div className='p-field p-col-12 p-lg-6 p-xl-6 p-mt-1'>
                            <label htmlFor="" style={{ width: '100%' }}>Categoria inicial para o mercado livre</label>
                            <Dropdown className='' value={selectedPai} options={optionPai} onChange={onChangePai} optionLabel="name" placeholder="Escolha o estado" style={{ zIndex: '99', width: '100%'  }} />
                        </div>
                        <div className='p-field p-col-12 p-lg-6 p-xl-6 p-mt-1'>
                            <label htmlFor="" style={{ width: '100%' }}>Categoria final para o mercado livre</label>
                            <Dropdown className='' value={selectedFilho} options={optionFilho} onChange={onChangeFilho} optionLabel="name" placeholder="Escolha o estado" style={{ zIndex: '99', width: '100%'  }} />
                            <TreeSelect value={selectedFilho} options={optionFilho} onChange={onChangeFilho} placeholder="Select Item" style={{ zIndex: '99', width: '100%'  }}></TreeSelect>
                        </div>
                    </div>
                </div>
            </FormControl>
        </DialogContent>
        <DialogActions >
            <div className="but-save">
                <ButtonBase label="SALVAR" icon="" className="p-button-success p-mt-3 " onClick={save} />
            </div>
        </DialogActions>
        <ModalLoad visible={modalLoad} />
        <Toast ref={msg} />
    </Dialog>
}
