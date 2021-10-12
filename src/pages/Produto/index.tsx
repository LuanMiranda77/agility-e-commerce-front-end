import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { observer } from 'mobx-react-lite'
import { Button } from "primereact/button"
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Divider } from "primereact/divider"
import { FileUpload, FileUploadFilesParam, FileUploadHeaderTemplateOptions } from 'primereact/fileupload'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from "primereact/inputtext"
import { InputTextarea } from 'primereact/inputtextarea'
import { ProgressBar } from 'primereact/progressbar'
import { Rating } from 'primereact/rating'
import { Tag } from 'primereact/tag'
import { Toast } from "primereact/toast"
import { classNames } from 'primereact/utils'
import React, { useContext, useEffect, useRef, useState } from "react"
import produtoIcone from "../../assets/produtoIcone.svg"
import { ButtonBase } from "../../components/ButtonBase"
import { ComboMultSelect } from "../../components/ComboMultSelect"
import { HeaderAdmin } from "../../components/HeaderAdmin"
import { InputSearch } from "../../components/InputSearch"
import { FileImg } from "../../domain/types/FileImg"
import { ICategoria } from '../../domain/types/ICategoria'
import { IProduto } from "../../domain/types/IProduto"
import { CategoriaService } from '../../services/CategoriaService/categoriaService'
import { ProdutoService } from "../../services/ProdutoServices/produtoServices"
import ProdutoStore from "../../stores/ProdutoStore"
import { Utils } from "../../utils/utils"
import { Container, FormControl } from "./styles"

const Produto: React.FC = () => {

    const store = useContext(ProdutoStore);
    const { produto, produtos } = store;
    const [produtoDialog, setProdutoDialog] = useState(false);
    const [deleteProdutoDialog, setDeleteprodutoDialog] = useState(false);
    const [deleteProdutosDialog, setDeleteprodutosDialog] = useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [categorias,setCategorias] = useState<ICategoria[]>([]);
    const [selectedProdutos, setSelectedprodutos] = useState<IProduto[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState("");
    const toast = useRef<Toast>(null);
    const [selectCategorias, setSelectedCategorias] = useState([]);
    const produtoService = new ProdutoService();
    const categoriaService = new CategoriaService();

    useEffect(() => {
        produtoService.getProdutos().then(data => {store.load(data)});
    }, []);

    // useEffect(() => {
    //     categoriaService.getCategorias().then(data => {setCategorias(data)});
    // }, []);

    const openDialog = () => {
        store.novo();
        setSubmitted(false);
        setProdutoDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProdutoDialog(false);
    }

    const hideDialogConfirme = () => {
        setDeleteprodutosDialog(false);
    }

    const hideDeleteProdutoDialog = () => {
        produtoService.delete(produto.id);
        store.remove(produto.id);
        //produtos.splice(produtos.indexOf(produto), 1);
        setDeleteprodutoDialog(false);
        
    }

    const saveProduto = () => {
        setSubmitted(true);
        if (produto.descricao.trim()) {
            produtoService.save(produto).then(res => { 
                setProdutoDialog(false);
                if (produto.id===0) {
                    const index = store.findIndexById(produto.id);
                    produtos[index] = produto;
                    Utils.messagemShow(toast,'success',`Item: ${produto.titulo}`, 'Alterado com sucesso!', 3000);
                }
                else {
                    store.add(res);
                    Utils.messagemShow(toast,'success', `Item: ${produto.titulo}`, 'Cadastro com sucesso!', 3000);
                }
                
             });
        }
    }
    const editar = (produto: IProduto) => {
        store.update(produto);
        setProdutoDialog(true);
    }

    const openConfirmeDeleteDialog = (produto: IProduto) => {
        store.produto = produto;
        setDeleteprodutoDialog(true);

    }

    const exportCSV = () => {
        // dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteprodutosDialog(true);
    }

    const deleteSelectedAll = () => {
        store.load(produtos.filter(valor => !selectedProdutos.includes(valor)));
        let produtosDelete = produtos.filter(valor => selectedProdutos.includes(valor));
        produtoService.deleteAll(produtosDelete);
        setDeleteprodutosDialog(false);
        setSelectedprodutos([]);
        // history.push("/produto");
    }
    
    const rightToolbarTemplate = () => {
        return (
            <div>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </div>
        )
    }

    const imageBodyTemplate = (rowData: IProduto) => {

        return <img 
            src={rowData.imagens[0].objectURL}
            onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
            className="produto-image"
        />
    }

    const priceBodyTemplate = (rowData: IProduto) => {
        return Utils.formatCurrency(rowData.precoAtacado);
    }

    const ratingBodyTemplate = (rowData: IProduto) => {
        return <Rating value={rowData.estrelas} readOnly cancel={false} />;
    }


    const actionBodyTemplate = (rowData: IProduto) => {
        return (
            <div className="buttonAction">
                <ButtonBase label="" icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2 p-mb-2" onClick={() => editar(rowData)} />
                <ButtonBase label="" icon="pi pi-trash" className="p-button-rounded p-button-danger teste" onClick={() => openConfirmeDeleteDialog(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Listagem de produtos</h5>
        </div>
    );

    const bodyTemplateColumnA = (rowData: IProduto) => {
        return (
            <div>
                <span className="p-column-title">Cod.Barras:</span>
                {rowData.codigoBarras}
            </div>
        );
    }
    const bodyTemplateColumnB = (rowData: IProduto) => {
        return (
            <div>
                <span className="p-column-title">Nome:</span>
                {rowData.titulo}
            </div>
        );
    }
    const bodyTemplateColumnC = (rowData: IProduto) => {
        const p = priceBodyTemplate(rowData);
        return (
            <div>
                <span className="p-column-title">Preço Varejo:</span>
                <span>{p}</span>
            </div>
        );
    }
    const bodyTemplateColumnD = (rowData: IProduto) => {
        const p = priceBodyTemplate(rowData);
        return (
            <div>
                <span className="p-column-title">Preço Atacado:</span>
                <span>{p}</span>
            </div>
        );
    }
    const bodyTemplateColumnE = (rowData: IProduto) => {
        const stockClassName = classNames({
            'outofstock': rowData.quantidade === 0,
            'lowstock': rowData.quantidade > 0 && rowData.quantidade < 10,
            'instock': rowData.quantidade > 5
        });
        return (
            <div className={stockClassName}>
                <span className="p-column-title">Quatidade:</span>
                {rowData.quantidade}
            </div>
        );
    }

    //====================template imgages==========================//
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);
    const [arrayFile, setArrayFile] = useState<File[]>([]);

    const onTemplateSelect = (file: FileUploadFilesParam) => {
        if(arrayFile.length<4){
            let v = file.files[0];
            let _array = arrayFile;
            _array.push(v);
            setArrayFile(_array);
            let _totalSize = totalSize + v.size;
            setTotalSize(_totalSize);
        }else{
            Utils.messagemShow(toast,'error','Erro ao adicionar imagens', 'Só é permitido 4 imagens', 5000);
        }
        
    }

    const onTemplateUpload = (arrayFile: FileUploadFilesParam) => {
        let _totalSize = 0;
        console.log(arrayFile);
        arrayFile.files.forEach(file => {
            _totalSize += (file.size || 0);
        });
        setTotalSize(_totalSize);
        
    }

    const onTemplateRemove = (file: File, callback: any) => {
        let _array = arrayFile.filter(f => f.name!==file.name);
        setArrayFile(_array);
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setArrayFile([]);
        setTotalSize(0);
    }

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 5000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? Utils.fileConvertSizeByte(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {/* {uploadButton} */}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} | 1MB`} style={{ width: '50%', height: '20px', marginLeft: 'auto' }}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file: FileImg, props: any) => {
        return (
            <div className="p-ai-center p-col-12">
                <div className="p-ai-center p-sm-12 p-md-12 p-lg-12 p-xl-12 p-flex">
                    <img alt={file.name} role="presentation" src={file.objectURL} width={'100%'} height={200} />
                    <Tag value={props.formatSize} severity="warning" className="p-px-1 p-mt-2 p-mb-2 p-py-1 p-sm-12 p-md-12 p-lg-8 p-xl-8 p-mr-6" />
                    <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto p-mt-2" onClick={() => onTemplateRemove(file, props.onRemove)} />
                    <Divider/>
                </div>
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="p-d-flex p-ai-center p-dir-col">
                <i className="pi pi-image p-mt-3 p-p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="p-my-5">Arraste e solte a imagem aqui</span>
            </div>
        )
    }
    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    let te = "21.8rem";
    const tamanhoTela = window.screen.availHeight;
    if (tamanhoTela > 768) {
        te = "40rem";
    }

    return (
        <Container>
            <HeaderAdmin />
            <div className="card">
                <div className="p-grid p-mt-3" >
                    <div className="p-grid  p-col-12 p-md-6 p-lg-9 p-ml-2">
                        <img src={produtoIcone} alt="img" className="p-ml-2 p-mb-2" />
                        <label className="p-ml-2 p-mt-2">Cadastro de Produto</label>
                    </div>
                    <div className="p-grid  p-sm-6 p-md-6 p-lg-3 buttonAdd" >
                        <ButtonBase label="Adicionar" icon="pi pi-plus" className="p-mr-5 p-button-success" onClick={openDialog} />
                        <ButtonBase label="Remover" icon="pi pi-times" className=" p-button-danger" onClick={confirmDeleteSelected} />
                    </div>
                </div>

                <Divider className="diveder" />

                <div className="p-grid p-p-2">
                    <div className="p-col-12 p-md-6 p-lg-5 p-ml-3 p-mr-5" >
                        <ButtonBase label="Estoque mínimo" icon="" className="p-button-warning" />
                    </div>
                    <div className="p-p-2 p-col-12 p-sm-5 p-md-6 p-lg-6 p-ml-2 pesquisar">
                        <InputSearch placeholder="Pesquise..." type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} />
                    </div>
                </div>
            </div>

            <div className="datatable-crud-demo datatable-responsive-demo">
                <div className="table">
                    <DataTable
                        value={produtos} selection={selectedProdutos}
                        onSelectionChange={(e) => setSelectedprodutos(e.value)}
                        dataKey="id" paginator rows={10}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando  {first} - {last} total de {totalRecords} produtos"
                        globalFilter={globalFilter}
                        header={header}
                        scrollable
                        scrollHeight={te}
                        className="p-datatable-responsive-demo"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column header="" body={imageBodyTemplate}></Column>
                        <Column field="codigoBarras" header="Codigo" body={bodyTemplateColumnA} sortable></Column>
                        <Column field="titulo" header="Titulo" body={bodyTemplateColumnB} sortable></Column>
                        <Column field="precoVarejo" header="Pr. Varejo" body={bodyTemplateColumnC} sortable></Column>
                        <Column field="precoAtacado" header="Pr. Atacado" body={bodyTemplateColumnD} sortable></Column>
                        <Column field="estrelas" header="Reviews" body={ratingBodyTemplate} sortable></Column>
                        <Column field="quantidade" header="Quantidade" body={bodyTemplateColumnE} sortable></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
                
                {/* =============================================inicio do modal==========================================================================*/}
                <Dialog
                    className="teste"
                    open={produtoDialog}
                    onClose={hideDialog}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    maxWidth="lg"
                    style={{zIndex:999}}
                >
                    <DialogTitle id="dialog-title" style={{ background: 'var(--primary)', padding: '0px' }}>
                        <div className="p-grid  p-col-12 p-md-6 p-lg-12">
                            <img src={produtoIcone} alt="img" className='p-ml-5 p-mt-1' />
                            <h3 className="p-text-bold p-text-uppercase p-mt-2 p-ml-2 titulo-modal" style={{ color: 'var(--white)' }}>Cadastro de produto</h3>
                            <button type="button" onClick={hideDialog} className="react-modal-close" style={{ background: 'var(--primary)', marginTop: '-10px' }}>
                                <i className="pi pi-times p-mt-2" style={{ 'fontSize': '1.0rem', 'color': 'white' }} />
                            </button>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'} style={{ background: 'var(--background)' }}>
                        <FormControl>
                            <div className="card p-p-3">
                                <div className="p-grid">
                                    <div className="p-felx p-col-12 p-ms-3 p-md-6 p-lg-12 p-field" >
                                        <label htmlFor="codigo" className="p-col-12 p-mb-2">Código</label>
                                        <InputText id="barras"
                                            value={produto.codigoBarras} onChange={(e) => produto.codigoBarras = e.target.value}
                                            required autoFocus
                                            className={classNames({ 'p-invalid': submitted && !produto.titulo },'p-col-2' )}
                                        />
                                        {submitted && !produto.titulo && <small className="p-error">Código é obtigatorio.</small>}
                                    </div>
                                    <div className="p-felx p-col-12 p-ms-3 p-md-6 p-lg-12 p-field">
                                        <label htmlFor="name">Titulo</label>
                                        <InputText id="name"
                                            value={produto.titulo}
                                            onChange={(e) => produto.titulo = e.target.value}
                                            required
                                            className={classNames({ 'p-invalid': submitted && !produto.titulo })}
                                            style={{ width: '100%' }}
                                        />
                                        {submitted && !produto.titulo && <small className="p-error">Titulo é obtigatorio.</small>}
                                    </div>
                                </div>
                                <div className="p-formgrid p-grid">
                                    <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-field" >
                                        <label htmlFor="quantidade" className='p-col-12'>Quantidade</label>
                                        <InputNumber
                                            id="quantidade"
                                            value={produto.quantidade}
                                            onValueChange={(e) => produto.quantidade = e.target.value}
                                            className='p-col-12'
                                        />
                                    </div>
                                    <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-field">
                                        <label htmlFor="pricovarejo"className='p-col-12' >Preço de Varejo</label>
                                        <InputNumber
                                            id="pricevarejo"
                                            value={produto.precoVarejo}
                                            onValueChange={(e) => produto.precoVarejo = e.target.value}
                                            mode="currency"
                                            currency="BRL"
                                            locale="pt-br"
                                            className='p-col-12'
                                        />
                                    </div>
                                    <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-field">
                                        <label htmlFor="priceatacado" className='p-col-12'>Preço de Atacado</label>
                                        <InputNumber
                                            id="priceatacado"
                                            value={produto.precoAtacado}
                                            onValueChange={(e) => produto.precoAtacado = e.target.value}
                                            mode="currency"
                                            currency="BRL"
                                            locale="pt-br"
                                            className='p-col-12'
                                        />
                                    </div>

                                    <div className="p-col-12 p-felx p-ms-12 p-md-6 p-lg-3 p-field">
                                        <ComboMultSelect options={categorias} label='Categoria' selectOptions={selectCategorias} setFunction={setSelectedCategorias}/>
                                    </div>
                                </div>
                                <div className="p-formgrid p-grid">
                                    <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-field">
                                        <label htmlFor="peso" className="p-col-12" >Peso kg</label>
                                        <InputNumber
                                            id="peso"
                                            value={produto.peso}
                                            onValueChange={(e) => produto.peso = e.target.value}
                                            mode="decimal" minFractionDigits={2}
                                            className="p-col-12"
                                            
                                        />
                                    </div>
                                    <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-xl-3 p-field">
                                        <label htmlFor="comprimento"  className="p-col-12">Comprimento cm</label>
                                        <InputNumber
                                            id="comprimento"
                                            value={produto.comprimento}
                                            onValueChange={(e) => produto.comprimento = e.target.value}
                                            mode="decimal" minFractionDigits={2}
                                            className="p-col-12"
                                            
                                        />
                                    </div>
                                    <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-xl-3 p-field">
                                        <label htmlFor="altura" className="p-col-12" >Altura cm</label>
                                        <InputNumber
                                            id="altura"
                                            value={produto.altura}
                                            onValueChange={(e) => produto.altura = e.target.value}
                                            mode="decimal" minFractionDigits={2}
                                            className="p-col-12"
                                            
                                        />
                                    </div>
                                    <div className="p-col-12 p-ms-3 p-md-6 p-lg-3 p-xl-3 p-field">
                                        <label htmlFor="largura"  className="p-col-12">Lagura cm</label>
                                        <InputNumber
                                            id="peso"
                                            min={0} max={100}
                                            value={produto.largura}
                                            onValueChange={(e) => produto.largura = e.target.value}
                                            mode="decimal" minFractionDigits={2}
                                            className="p-col-12"
                                            
                                            
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-grid p-col-12">
                            <div className="p-card p-field p-mt-4  p-p-3 p-sm-12 p-md-12 p-lg-5 p-xl-6">
                                <label htmlFor="description">Descrição</label>
                                <InputTextarea
                                    id="description"
                                    style={{height: '60vh', width: '90vh'}}
                                    value={produto.descricao}
                                    onChange={(e) => produto.descricao = e.target.value}
                                    required
                                    rows={3}
                                    cols={20} />
                            </div>

                            <div className="p-card p-p-3 p-sm-12 p-md-12 p-lg-6 p-mt-4 text-area">
                                <label htmlFor="imagens">Imagens</label>
                                <div className="p-grid p-field p-mt-2 p-pl-3 p-col-12 ">
                                    <div className="p-sm-3 p-md-6 p-lg-12">
                                        <FileUpload ref={fileUploadRef} 
                                            name="foto-1"
                                            className="p-mr-1 teste"
                                            accept="image/*" 
                                            maxFileSize={1000000} 
                                            onUpload={onTemplateUpload} 
                                            onSelect={onTemplateSelect} 
                                            onError={onTemplateClear} 
                                            onClear={onTemplateClear} 
                                            headerTemplate={headerTemplate} 
                                            itemTemplate={itemTemplate}
                                            emptyTemplate={emptyTemplate}
                                            chooseOptions={chooseOptions} 
                                            uploadOptions={uploadOptions} 
                                            cancelOptions={cancelOptions}
                                        />
                                    </div>
                                </div>
                            </div>
                            </div>
                        </FormControl>
                    </DialogContent>
                    <DialogActions style={{ padding: '0px' }} >
                        <div className="but-save">
                            <ButtonBase label="SALVAR" icon="" className="p-button-success p-mt-2 p-mb-2 p-mr-5" onClick={saveProduto} />
                        </div>
                    </DialogActions>
                </Dialog>

            </div>
            <Dialog
                open={deleteProdutoDialog}
                onClose={hideDeleteProdutoDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent style={{background: '#fffaf3bd', border: '5px solid #FFA726', borderRight: '0', borderTop: '0', borderBottom: '0'}}>
                    <div className="p-text-center p-pt-4">
                        <i className="pi pi-exclamation-triangle" style={{ fontSize: '3rem', color: 'var(--red)' }} />
                    </div>
                    <DialogTitle id="alert-dialog-slide-title">{"Tem certeza que deseja excluir o ítem?"}</DialogTitle>
                    <DialogContentText id="alert-dialog-slide-description">
                        O ítem {produto.titulo}
                    </DialogContentText>
                    <DialogActions>
                        <ButtonBase label="Sim" icon="" className="p-button-success p-pl-6 p-pr-6 p-mr-3" onClick={hideDeleteProdutoDialog} />
                        <ButtonBase onClick={() => { setDeleteprodutoDialog(false)}} label="Não" icon="" className="p-button-danger  p-pl-6 p-pr-6 p-mr-3" />
                    </DialogActions>
                </DialogContent>
            </Dialog>

            <Dialog
                open={deleteProdutosDialog}
                onClose={hideDialogConfirme}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent style={{background: '#fffaf3bd', border: '5px solid #FFA726', borderRight: '0', borderTop: '0', borderBottom: '0'}}>
                    <div className="p-text-center p-pt-4">
                        <i className="pi pi-exclamation-triangle" style={{ fontSize: '3rem', color: 'var(--red)' }} />
                    </div>
                    <DialogTitle id="alert-dialog-slide-title">Tem certeza que deseja excluir os  ítens selecionados?</DialogTitle>
                    <DialogActions>
                        <ButtonBase label="Sim" icon="" className="p-button-success p-pl-6 p-pr-6 p-mr-3" onClick={deleteSelectedAll} />
                        <ButtonBase onClick={hideDialogConfirme} label="Não" icon="" className="p-button-danger  p-pl-6 p-pr-6 p-mr-3" />
                    </DialogActions>
                </DialogContent>
            </Dialog>
           
            <Toast ref={toast} />
        </Container>
    )
}
export default observer(Produto);