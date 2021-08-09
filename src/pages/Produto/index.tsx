import React, { ChangeEvent } from "react"
import { HeaderAdmin } from "../../components/HeaderAdmin"
import { Container, FormControl } from "./styles"
import { Divider } from "primereact/divider"
import { useEffect, useRef, useState } from "react"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import Modal from 'react-modal';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber, InputNumberValueChangeParams } from 'primereact/inputnumber';

import produtoIcone from "../../assets/produtoIcone.svg"
import { ButtonBase } from "../../components/ButtonBase"
import { InputSearch } from "../../components/InputSearch"
import { ProdutoService } from "../../services/ProdutoServices/produtoServices"
import { IProduto } from "../../services/ProdutoServices/produtoInterface"
import iconImport from "../../assets/iconImport.svg";


export function Produto() {




    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [produtoDialog, setProdutoDialog] = useState(false);
    const [deleteProdutoDialog, setDeleteprodutoDialog] = useState(false);
    const [deleteProdutosDialog, setDeleteprodutosDialog] = useState(false);
    const [produto, setProduto] = useState<IProduto>({
        id: 0,
        codigoBarras: '',
        nome: '',
        precoVarejo: 0,
        precoAtacado: 0,
        quantidade: 0,
        descricao: '',
        estrelas: 0,
        imagens: []
    });
    const categorias = [
        { label: 'Relogio', value: 'NY' },
        { label: 'Trilha', value: 'RM' },
        { label: 'Chap', value: 'LDN' },
        { label: 'Tribater', value: 'IST' },
        { label: 'Floresta', value: 'PRS' }
    ];
    const [categoria, setCategoria] = useState<any>(null);
    const [selectedProdutos, setSelectedprodutos] = useState<IProduto[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState("");
    const toast = useRef<Messages>();
    const dt = useRef();
    const produtoService = new ProdutoService();

    useEffect(() => {
        produtoService.getProdutos().then(data => setProdutos(data));
    }, []);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    const openNew = () => {
        setProduto(produto);
        setSubmitted(false);
        setProdutoDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProdutoDialog(false);
    }

    const hideDeleteProdutoDialog = () => {
        setDeleteprodutoDialog(false);
    }

    const hideDeleteProdutosDialog = () => {
        setDeleteprodutosDialog(false);
    }
    const onChangeCategoria = (e: { value: any }) => {
        setCategoria(e.value);
    }

    const saveProduto = () => {
        setSubmitted(true);

        if (produto.descricao.trim()) {
            let _produtos = [...produtos];
            let _produto = { ...produto };
            if (produto.id) {
                const index = findIndexById(produto.id);

                _produtos[index] = _produto;
                <Message severity="success" text="Record Saved"></Message>
                // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'produto Updated', life: 3000 });
            }
            else {
                _produtos.push(_produto);
                // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'produto Created', life: 3000 });
            }

            setProdutos(_produtos);
            setProdutoDialog(false);
            setProduto(produto);
            produtoService.save(_produto).then(res => { produtos.push(res) });
        }
    }

    const editproduto = (produto: IProduto) => {
        setProduto({ ...produto });
        setProdutoDialog(true);
    }

    const confirmDeleteproduto = (produto: IProduto) => {
        setProduto(produto);
        setDeleteprodutoDialog(true);
    }

    const deleteproduto = () => {
        let _produtos = produtos.filter(val => val.id !== produto.id);
        setProdutos(_produtos);
        setDeleteprodutoDialog(false);
        setProduto({
            id: 0,
            codigoBarras: '',
            nome: '',
            precoVarejo: 0,
            precoAtacado: 0,
            quantidade: 0,
            descricao: '',
            estrelas: 0,
            imagens: []
        });
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'produto Deleted', life: 3000 });
    }

    const findIndexById = (id: number) => {
        let index = -1;
        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }



    const exportCSV = () => {
        // dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteprodutosDialog(true);
    }

    const deleteSelectedprodutos = () => {
        let _produtos = produtos.filter(valor => !selectedProdutos.includes(valor));
        setProdutos(_produtos);
        setDeleteprodutosDialog(false);
        setSelectedprodutos([]);
        //     consttoast.current.show({ severity: 'success', summary: 'Successful', detail: 'produtos Deleted', life: 3000 });
    }


    const onInputChange = (e: HTMLInputElement, name: string) => {
        let _produto = { ...produto };
        if (name === 'codigo') {
            _produto.codigoBarras = e.value;
            setProduto(_produto);
        }else{
            _produto.nome = e.value;
            setProduto(_produto);

        }
        // setProduto({
        //     ...produto,
        //     [e.name]: e.value
        // });
    }
    const onInputTextAreaChange = (e: HTMLTextAreaElement) => {
        let _produto = { ...produto };
        _produto.descricao = e.value;
        setProduto(_produto);
    }
    const onInputNumber = (e: InputNumberValueChangeParams, name: String) => {
        let _produto = { ...produto };

        if (name === 'atacado') {
            _produto.precoAtacado = e.target.value;
            setProduto(_produto);
        } else if (name === 'varejo') {
            _produto.precoVarejo = e.target.value;
            setProduto(_produto);
        } else {
            _produto.quantidade = e.target.value;
            setProduto(_produto);
        };
    }


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProdutos || !selectedProdutos.length} />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const imageBodyTemplate = (rowData: IProduto) => {
        return <img src={`showcase/demo/images/produto/${rowData.imagens[0]}`} onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.imagens[0]} className="produto-image" />
    }

    const priceBodyTemplate = (rowData: IProduto) => {
        return formatCurrency(rowData.precoAtacado);
    }

    const ratingBodyTemplate = (rowData: IProduto) => {
        return <Rating value={rowData.estrelas} readOnly cancel={false} />;
    }


    const actionBodyTemplate = (rowData: IProduto) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editproduto(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteproduto(rowData)} />
            </React.Fragment>
        );
    }

    // const header = (
    //     <div className="table-header">
    //         <h5 className="p-m-0">Manage produtos</h5>
    //         <span className="p-input-icon-left">
    //             <i className="pi pi-search" />
    //             <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
    //         </span>
    //     </div>
    // );
    const produtoDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduto} />
        </React.Fragment>
    );
    const deleteProdutoDialogFooter = (
        <React.Fragment>
            <Button label="NÃO" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProdutoDialog} />
            <Button label="SIM" icon="pi pi-check" className="p-button-text" onClick={deleteproduto} />
        </React.Fragment>
    );
    const deleteProdutosDialogFooter = (
        <React.Fragment>
            <Button label="NÃO" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProdutosDialog} />
            <Button label="SIM" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedprodutos} />
        </React.Fragment>
    );
    return (
        <Container>
            <HeaderAdmin />
            <div className="card p-mt-3 p-pt-4">
                <div className="p-grid" >
                    <div className="p-grid  p-col-12 p-md-6 p-lg-8">
                        <img src={produtoIcone} alt="img" className="p-ml-2 p-p-2" />
                        <label className="p-ml-2 p-pt-3">Cadastro de Produto</label>
                    </div>
                    <div className="p-grid  p-col-12 p-md-6 p-lg-4" >
                        <ButtonBase label="Adicionar" icon="pi pi-plus" className="p-mr-5 p-button-success" onClick={openNew} />
                        <ButtonBase label="Remover" icon="pi pi-times" className=" p-button-danger" />
                    </div>
                    
                </div>
                <Divider />
                <div className="p-grid p-p-2">
                    <div className="p-col-12 p-md-6 p-lg-7" >
                        <ButtonBase label="Estoque mínimo" icon="" className=" p-button-warning" />
                    </div>
                    <div className="p-p-2 p-col-12 p-md-6 p-lg-5">
                        <InputSearch placeholder="Pesquise..." type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} />
                    </div>
                </div>




            </div>
            <div className="datatable-crud-demo">
                <Toast />

                <div className="card">
                    {/* <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}

                    <DataTable value={produtos} selection={selectedProdutos} onSelectionChange={(e) => setSelectedprodutos(e.value)}
                        dataKey="id" paginator rows={10}
                        //rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando  {first} - {last} total de {totalRecords} produtos"
                        globalFilter={globalFilter}
                    // header={header}
                    >

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column header="" body={imageBodyTemplate}></Column>
                        <Column field="codigoBarras" header="Codigo" sortable></Column>
                        <Column field="nome" header="Nome" sortable></Column>
                        <Column field="precoVarejo" header="Preco Varejo" body={priceBodyTemplate} sortable></Column>
                        <Column field="precoAtacado" header="Preco Varejo" body={priceBodyTemplate} sortable></Column>
                        <Column field="estrelas" header="Reviews" body={ratingBodyTemplate} sortable></Column>
                        <Column field="quantidade" header="quantidade" sortable></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>

                <Modal
                    isOpen={produtoDialog}
                    onRequestClose={hideDialog}
                    overlayClassName="react-modal-overlay"
                    className="react-modal-content"
                >
                    <button type="button" onClick={hideDialog} className="react-modal-close">
                        <i className="pi pi-times" style={{ 'fontSize': '1.5em' }} />
                    </button>
                    <FormControl>
                        <div className="card p-p-4">
                            <div className="p-grid  p-col-12 p-md-6 p-lg-12">
                                <img src={produtoIcone} alt="img" className="p-p-2" />
                                <h3 className="p-text-bold p-text-uppercase p-mt-3">Cadastro de produto</h3>
                            </div>
                            <Divider className="divider" />
                            <div className="p-grid">
                                <div className="p-col p-field" >
                                    <label htmlFor="codigo" className="p-mb-2">Codigo</label>
                                    <InputText id="barras" style={{ width: '12rem' }} value={produto.codigoBarras} onChange={(e) => onInputChange(e.target,"codigo")} required autoFocus className={classNames({ 'p-invalid': submitted && !produto.nome })} />
                                    {submitted && !produto.nome && <small className="p-error">Codigo é obtigatorio.</small>}
                                </div>
                                <div className="p-col p-field">
                                    <label htmlFor="name">Nome</label>
                                    <InputText id="name" value={produto.nome} onChange={(e) => onInputChange(e.target, "")} style={{ width: '50rem' }} required autoFocus className={classNames({ 'p-invalid': submitted && !produto.nome })} />
                                    {submitted && !produto.nome && <small className="p-error">Nome é obtigatorio.</small>}
                                </div>
                            </div>
                            <div className="p-formgrid p-grid">
                                <div className="p-field p-col">
                                    <label htmlFor="quantidade">Quantidade</label>
                                    <InputNumber id="quantidade" value={produto.quantidade} onValueChange={(e) => onInputNumber(e, 'quantidade')} />
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="pricovarejo">Preço de Varejo</label>
                                    <InputNumber id="pricevarejo" value={produto.precoVarejo} onValueChange={(e) => onInputNumber(e, 'varejo')} mode="currency" currency="BRL" locale="pt-br" />
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="priceatacado">Preço de Atacado</label>
                                    <InputNumber id="priceatacado" value={produto.precoAtacado} onValueChange={(e) => onInputNumber(e, 'atacado')} mode="currency" currency="BRL" locale="pt-br" />
                                </div>

                                <div className="p-field p-col">
                                    <label htmlFor="categoria">Categoria</label>
                                    {/* <Dropdown value={categoria} options={categorias} optionLabel="name" placeholder="Escolha a categoria" /> */}
                                </div>




                            </div>

                        </div>

                        <div className="p-card p-field p-mt-3 p-p-3">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" style={{ width: '100%', height: '8rem' }} value={produto.descricao} onChange={(e) => onInputTextAreaChange(e.target)} required rows={3} cols={20} />
                        </div>

                        <div className="p-card p-p-3">
                            <label htmlFor="imagens">Imagens</label>
                            <div className="p-grid p-field p-mt-2 p-pl-4 p-col-12 p-md-6 p-lg-12">
                                <FileUpload
                                    mode="basic"
                                    accept="image/*"
                                    maxFileSize={1000000}
                                    chooseOptions={{ label: 'Importe a imagem', icon: 'pi pi-image', className: 'p-col p-button-primary p-button-raised p-mr-4' }}

                                >
                                </FileUpload>
                                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseOptions={{ label: 'Importe a imagem', icon: 'pi pi-image', className: 'p-col p-button-primary p-button-raised p-mr-6' }} />
                                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseOptions={{ label: 'Importe a imagem', icon: 'pi pi-image', className: 'p-col p-button-primary p-button-raised p-mr-6' }} />
                                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseOptions={{ label: 'Importe a imagem', icon: 'pi pi-image', className: 'p-col p-button-primary p-button-raised p-mr-6' }} />
                                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseOptions={{ label: 'Importe a imagem', icon: 'pi pi-image', className: 'p-col p-button-primary p-button-raised p-mr-6' }} />
                            </div>
                        </div>


                        <div className="but-save">
                            <ButtonBase label="SALVAR" icon="" className="p-button-success p-mt-3 " onClick={saveProduto} />
                        </div>


                    </FormControl>

                </Modal>

            </div>
            <Dialog visible={false} style={{ width: '450px' }} modal footer={produtoDialogFooter} onHide={hideDialog}>
                {/* {produto.imagens && <img src={`showcase/demo/images/product/${produto.imagens[0]}`} onError={(e) => e.currentTarget.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={produto.imagens[0]} className="product-image" />} */}
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={produto.nome} onChange={(e) => onInputChange(e.target,"")} required autoFocus className={classNames({ 'p-invalid': submitted && !produto.nome })} />
                    {submitted && !produto.nome && <small className="p-error">Nome é obtigatorio.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={produto.descricao} onChange={(e) => onInputTextAreaChange(e.target)} required rows={3} cols={20} />
                </div>


                <div className="p-formgrid p-grid">
                    <div className="p-field p-col">
                        <label htmlFor="pricovarejo">Preço de Varejo</label>
                        <InputNumber id="pricevarejo" value={produto.precoVarejo} onValueChange={(e) => onInputNumber(e, 'varejo')} mode="currency" currency="BRL" locale="pt-br" />
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="priceatacado">Preço de Atacado</label>
                        <InputNumber id="priceatacado" value={produto.precoAtacado} onValueChange={(e) => onInputNumber(e, 'atacado')} mode="currency" currency="BRL" locale="pt-br" />
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="quantidade">Quantidade</label>
                        <InputNumber id="quantidade" value={produto.quantidade} onValueChange={(e) => onInputNumber(e, 'quantidade')} mode="currency" currency="BRL" locale="pt-br" />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProdutoDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProdutoDialogFooter} onHide={hideDeleteProdutoDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {produto && <span>Tem Certeza que vai deletar o <b>{produto.nome}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteProdutosDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProdutosDialogFooter} onHide={hideDeleteProdutosDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {produto && <span>Tem certeza que quer deletar os produtos selecionados?</span>}
                </div>
            </Dialog>
        </Container>
    )
}