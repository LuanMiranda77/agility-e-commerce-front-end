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
import { set } from 'mobx';
import { ICategoria } from '../../domain/types/ICategoria';

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
    const [isUserLivre, setIsUserLivre] = useState(false);
    const msg = useRef<Toast>(null);
    const marketplaceService = new MarketplaceService();
    let arrayCateg: any[] = [];

    useEffect(() => {
        marketplaceService.get().then(result => {
            if (result !== "erro") {
                setIsUserLivre(true);
                marketplaceService.getCategoriasMercadoLivre().then(data => {
                    // Utils.messagemShow(msg, 'success', 'Salvo', '😃 Dados salvo com sucesso', 5000);
                    setOptionPai(data);
                }).catch(error => {
                    Utils.messagemShow(msg, 'error', 'Erro no salvar', "😱 " + error.mensagemUsuario, 5000);
                });
            } else {
                setIsUserLivre(false);
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilho, selectedPai]);

    if (props.modalDialog) {
        if (selectedPai === null && store.categoria.id > 0) {
            let Paicateg = optionPai.find((item: ICategoria) => item.id === store.categoria.idCategoriaPai);
            setSelectedPai(Paicateg);
            marketplaceService.findByCategoriaByIdMercadoLivre(store.categoria.idCategoriaPai).then(data => {
                data.children_categories.forEach((item: any) => {
                    let obj = { key: "", label: "", children: [] };
                    obj.key = item.id;
                    obj.label = item.name;
                    arrayCateg.push(obj);
                });
                setOptionFilho(arrayCateg);
                onLoadFilho();
                let filhocateg = optionFilho.find((item: any) => item.key === store.categoria.idCategoriaFilha);
                if (filhocateg) {
                    setSelectedFilho(filhocateg.key);
                } else {
                    optionFilho.forEach((item: any) => {
                        let filhocateg = item.children.find((item: any) => item.key === store.categoria.idCategoriaFilha);
                        if (filhocateg) {
                            setSelectedFilho(filhocateg.key);
                        }
                    });
                }
            }).catch(error => {
                Utils.messagemShow(msg, 'error', 'Erro no carregamento', "😱 " + error.mensagemUsuario, 5000);
            });

        }
    }

    const hideDialog = () => {
        store.novo();
        setSubmitted(false);
        setSelectedPai(null);
        setSelectedFilho(null);
        props.closeFuncion();

    }

    const save = () => {
        setSubmitted(true);
        if (store.categoria.nome.trim() && store.categoria.idCategoriaPai.trim() && store.categoria.idCategoriaFilha.trim()) {
            if (store.categoria.id !== 0) {
                categoriaService.update(store.categoria).then((res) => {
                    const index = store.findIndexById(store.categoria.id);
                    store.categorias[index] = store.categoria;
                    props.closeFuncion();
                    setSubmitted(false);
                    Utils.messagemShow(msg, 'success', 'Alterado com sucesso!', `Item: ${store.categoria.nome}`, 3000);
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
                    setSubmitted(false);
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
        marketplaceService.findByCategoriaByIdMercadoLivre(e.value.id).then(data => {
            // Utils.messagemShow(msg, 'success', 'Salvo', '😃 Dados salvo com sucesso', 5000);
            // setOptionFilho(data);
            data.children_categories.forEach((item: any) => {
                store.novoCateg();
                store.categoriasLivre.key = item.id;
                store.categoriasLivre.label = item.name;
                arrayCateg.push(store.categoriasLivre);
            });
            // store.categoriasLivre.children = itemCateg ;
            setOptionFilho(arrayCateg);
            console.log(arrayCateg);
            onLoadFilho();
        }).catch(error => {
            Utils.messagemShow(msg, 'error', 'Erro no carregamento', "😱 " + error.mensagemUsuario, 5000);
        });
    }

    const onLoadFilho = () => {
        let itemCateg: any[] = [];
        arrayCateg.forEach((categFilha) => {
            marketplaceService.findByCategoriaByIdMercadoLivre(categFilha.key)
                .then(data => {
                    itemCateg = data.children_categories.map((item: any) => {
                        let categ = { key: "", label: "", children: [] };
                        categ.key = item.id;
                        categ.label = item.name;
                        categ.children = item.children_categories
                        return categ;
                    });
                    categFilha.children = itemCateg;
                });
        });
    }

    const onChangeFilho = (e: { value: any }) => {
        setSelectedFilho(e.value);
        store.categoria.idCategoriaFilha = e.value;
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
                                placeholder='Digite o nome da categoria'
                                className={classNames({ 'p-invalid': submitted && !store.categoria.nome })}
                                style={{ width: '100%' }}
                            />
                            {submitted && !store.categoria.nome && <small className="p-error">Nome é obtigatorio.</small>}
                        </div>
                        {isUserLivre ?
                            <div className='p-field p-col-12 p-lg-6 p-xl-6 p-mt-1'>
                                <label htmlFor="" style={{ width: '100%' }}>Categoria inicial para o mercado livre</label>
                                <Dropdown className={classNames({ 'p-invalid': submitted && !store.categoria.idCategoriaPai })} value={selectedPai} options={optionPai} onChange={onChangePai} optionLabel="name" placeholder="Selecione a categoria inicial" style={{ zIndex: '99', width: '100%' }} />
                                {submitted && !store.categoria.idCategoriaPai && <small className="p-error">Campo é obtigatorio.</small>}
                            </div> : ""}
                        {isUserLivre ?
                            <div className='p-field p-col-12 p-lg-6 p-xl-6 p-mt-1'>
                                <label htmlFor="" style={{ width: '100%' }}>Categoria final para o mercado livre</label>
                                {/* <Dropdown className='' value={selectedFilho} options={optionFilho} onChange={onChangeFilho} optionLabel="name" placeholder="Escolha o estado" style={{ zIndex: '99', width: '100%'  }} /> */}
                                <TreeSelect className={classNames({ 'p-invalid': submitted && !store.categoria.idCategoriaFilho })} value={selectedFilho} options={optionFilho} onChange={onChangeFilho} placeholder="Selecione a categoria final" style={{ zIndex: '99', width: '100%' }}></TreeSelect>
                                {submitted && !store.categoria.idCategoriaFilha && <small className="p-error">Campo é obtigatorio.</small>}
                            </div>
                            : ''}
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
