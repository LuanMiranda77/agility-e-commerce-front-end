import React, { useContext, useEffect,  useState, useRef  } from "react"
import { HeaderAdmin } from "../../components/HeaderAdmin"
import { Container, FormControl } from "./styles"
import { Divider } from "primereact/divider"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { FileUpload, FileUploadFilesParam, FileUploadHeaderTemplateOptions, FileUploadRemoveParams } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { InputNumber} from 'primereact/inputnumber';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TransitionProps } from '@material-ui/core/transitions';
import produtoIcone from "../../assets/produtoIcone.svg"
import { ButtonBase } from "../../components/ButtonBase"
import { InputSearch } from "../../components/InputSearch"
import { ProdutoService } from "../../services/ProdutoServices/produtoServices"
import { IProduto } from "../../domain/types/IProduto"
import ProdutoStore  from "../../stores/ProdutoStore"
import { observer} from 'mobx-react-lite';
import { Slide } from "@material-ui/core"
import ComboBase from "../../components/ComboBase"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';
import { FileArquivo } from "../../domain/types/FileUpload";
import { Utils } from "../../utils/utils"

const Produto: React.FC = () =>  {
    
    const store = useContext(ProdutoStore);
    const {produto, produtos} = store;
    const [produtoDialog, setProdutoDialog] = useState(false);
    const [deleteProdutoDialog, setDeleteprodutoDialog] = useState(false);
    const [deleteProdutosDialog, setDeleteprodutosDialog] = useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const categorias = [
        { id:1, label: 'Relogio', value: 'NY' },
        { id:2,label: 'Trilha', value: 'RM' },
        { id:3,label: 'Chap', value: 'LDN' },
        { id:4,label: 'Tribater', value: 'IST' },
        { id:5,label: 'Floresta', value: 'PRS' }
    ];
    const [categoria, setCategoria] = useState<any>(null);
    const [selectedProdutos, setSelectedprodutos] = useState<IProduto[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState("");
    const produtoService = new ProdutoService();
    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & { children?: React.ReactElement<any, any> },
        ref: React.Ref<unknown>,
      ) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

    useEffect(() => {
        produtoService.getProdutos().then(data => {
            store.load(data);
        });
        
    }, []);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    const openDialog = () => {
        store.novo();
        setSubmitted(false);
        setProdutoDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProdutoDialog(false);
    }

    const hideDeleteProdutoDialog = () => {
        produtoService.delete(produto.id);
        store.remove(produto.id);
        //produtos.splice(produtos.indexOf(produto), 1);
        setDeleteprodutoDialog(false);
        window.location.reload();
 
    }

    const onChangeCategoria = (e: { value: any }) => {
        setCategoria(e.value);
    }

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

    const saveProduto = () => {
        setSubmitted(true);
        if (produto.descricao.trim()) {
            setProdutoDialog(false);
            if (produto.id) {
                const index = store.findIndexById(produto.id);
                produtos[index] = produto;
                handleOpen();
            }
            else {
                store.add(produto);
                handleOpen();
            }
            produtoService.save(produto).then(res => { produtos.push(res) });
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

    const deleteSelectedprodutos = () => {
        store.load(produtos.filter(valor => !selectedProdutos.includes(valor)));
        let produtosDelete = produtos.filter(valor => selectedProdutos.includes(valor));
        produtoService.deleteAll(produtosDelete);
        setDeleteprodutosDialog(false);
        setSelectedprodutos([]);
       // history.push("/produto");
        window.location.reload();
        //     consttoast.current.show({ severity: 'success', summary: 'Successful', detail: 'produtos Deleted', life: 3000 });
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

        return <img src={rowData.imagens[0].objectURL} 
                    onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} 
                    className="produto-image"
                     />
    }

    const priceBodyTemplate = (rowData: IProduto) => {
        return formatCurrency(rowData.precoAtacado);
    }

    const ratingBodyTemplate = (rowData: IProduto) => {
        return <Rating value={rowData.estrelas} readOnly cancel={false} />;
    }


    const actionBodyTemplate = (rowData: IProduto) => {
        return (
            <div className="buttonAction">
                <ButtonBase label="" icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2 p-mb-2" onClick={() =>  editar(rowData)} />
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
                {rowData.nome}
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

    // ====================template imgages==========================//
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const fileUploadRef = useRef<FileUpload>(null);

    const onTemplateSelect = (arrayFile: FileUploadFilesParam) => {
        let v = arrayFile.files[0];
        let _totalSize = totalSize + v.size;
        setTotalSize(_totalSize);
    }

    const onTemplateUpload = (arrayFile: FileUploadFilesParam) => {
        let _totalSize = 0;
        console.log(arrayFile);
        arrayFile.files.forEach(file => {
            _totalSize += (file.size || 0);
        });

        setTotalSize(_totalSize);
        // toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }


    const onTemplateRemove = (file: File, callback: any) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize/5000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? Utils.fileConvertSizeByte(totalSize) : '0 B';

        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {/* {uploadButton} */}
                {/* {cancelButton} */}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} | 500KB`} style={{width: '200px', height: '20px', marginLeft: 'auto'}}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file: FileArquivo, props: any) => {
        return (
            <div className="p-ai-center p-col-8 p-sm-6 p-md-8 p-lg-3">
                <div className="p-ai-center" style={{width: '100%', marginLeft:'-5px'}}>
                    {/* <span className="p-d-flex p-dir-col p-text-left p-ml-3">
                        <small>{file.name}</small>
                    </span> */}
                    <img alt={file.name} role="presentation" src={file.objectURL} width={'100%'} height={180} />
                </div>
                <Tag value={props.formatSize} severity="warning" className="p-px-1 p-mt-2 p-py-1" style={{width: '100%', marginLeft:'-30px'}} />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto p-mt-2" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }
    

    const emptyTemplate = () => {
        return (
            <div className="p-d-flex p-ai-center p-dir-col">
                <i className="pi pi-image p-mt-3 p-p-5" style={{'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}}></i>
                <span style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="p-my-5">Arraste e solte a imagem aqui</span>
            </div>
        )
    }
    const chooseOptions = {icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
    const uploadOptions = {icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
    const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};

    let te = "21.8rem";
    const tamanhoTela = window.screen.availHeight;
    if(tamanhoTela>768){
        te="40rem";
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

                <Divider  className="diveder"/>

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
                <Toast />

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
                        <Column field="nome" header="Nome"  body={bodyTemplateColumnB}  sortable></Column>
                        <Column field="precoVarejo" header="Preco Varejo" body={bodyTemplateColumnC} sortable></Column>
                        <Column field="precoAtacado" header="Preco Atacado" body={bodyTemplateColumnD} sortable></Column>
                        <Column field="estrelas" header="Reviews" body={ratingBodyTemplate} sortable></Column>
                        <Column field="quantidade" header="quantidade" body={bodyTemplateColumnE} sortable></Column>
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
                    >
                    <DialogTitle id="dialog-title" style={{background: 'var(--primary)', padding:'0px'}}>
                        <div className="p-grid  p-col-12 p-md-6 p-lg-12">
                            <img src={produtoIcone} alt="img" className='p-ml-5 p-mt-1'/>
                            <h3 className="p-text-bold p-text-uppercase p-mt-2 p-ml-2 titulo-modal" style={{color: 'var(--white)'}}>Cadastro de produto</h3>
                            <button type="button" onClick={hideDialog} className="react-modal-close" style={{background: 'var(--primary)', marginTop:'-10px'}}>
                                <i className="pi pi-times p-mt-2" style={{ 'fontSize': '1.0rem','color': 'white'}} />
                            </button>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'} style={{background: 'var(--background)'}}>
                    <FormControl>
                        <div className="card p-p-4">
                            <div className="p-grid">
                                <div className="p-felx p-col-12 p-ms-3 p-md-6 p-lg-2 p-field" >
                                    <label htmlFor="codigo" className="p-mb-2">Código</label>
                                    <InputText id="barras" 
                                    value={produto.codigoBarras} onChange={(e) => produto.codigoBarras = e.target.value} 
                                    required autoFocus 
                                    className={classNames({ 'p-invalid': submitted && !produto.nome })} 
                                    />
                                    {submitted && !produto.nome && <small className="p-error">Código é obtigatorio.</small>}
                                </div>
                                <div className="p-felx p-col-12 p-ms-3 p-md-6 p-lg-12 p-field">
                                    <label htmlFor="name">Nome</label>
                                    <InputText id="name" 
                                    value={produto.nome} 
                                    onChange={(e) => produto.nome = e.target.value} 
                                    required 
                                    className={classNames({ 'p-invalid': submitted && !produto.nome })}
                                    style={{width: '100%'}} 
                                    />
                                    {submitted && !produto.nome && <small className="p-error">Nome é obtigatorio.</small>}
                                </div>
                            </div>
                            <div className="p-formgrid p-grid">
                                <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-field" >
                                    <label htmlFor="quantidade">Quantidade</label>
                                    <InputNumber 
                                        id="quantidade" 
                                        value={produto.quantidade} 
                                        onValueChange={(e) => produto.quantidade = e.target.value} 
                                    />
                                </div>
                                <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-field">
                                    <label htmlFor="pricovarejo">Preço de Varejo</label>
                                    <InputNumber 
                                        id="pricevarejo" 
                                        value={produto.precoVarejo}
                                        onValueChange={(e) => produto.precoVarejo = e.target.value} 
                                        mode="currency" 
                                        currency="BRL" 
                                        locale="pt-br" 
                                     />
                                </div>
                                <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-field">
                                    <label htmlFor="priceatacado">Preço de Atacado</label>
                                    <InputNumber 
                                        id="priceatacado" 
                                        value={produto.precoAtacado} 
                                        onValueChange={(e) => produto.precoAtacado= e.target.value} 
                                        mode="currency" 
                                        currency="BRL" 
                                        locale="pt-br" 
                                    />
                                </div>

                                <div className="p-col-12 p-felx p-ms-12 p-md-6 p-lg-3 p-field">
                                    <label htmlFor="categoria">Categoria</label>
                                    <ComboBase dados={categorias} size='11rem'/>
                                </div>
                            </div>
                        </div>
                        <div className="p-card p-field p-mt-3 p-p-3">
                            <label htmlFor="description">Description</label>
                            <InputTextarea 
                            id="description" 
                            style={{ width: '100%', height: '8rem' }} 
                            value={produto.descricao} 
                            onChange={(e) => produto.descricao = e.target.value} 
                            required 
                            rows={3} 
                            cols={20} />
                        </div>

                        <div className="p-card p-p-3">
                            <label htmlFor="imagens">Imagens</label>
                            <div className="p-grid p-field p-mt-2 p-pl-3 p-col-12 p-sm-12 p-md-8 p-lg-12">
                                <div className="p-mt-2 p-col-12 p-sm-3 p-md-6 p-lg-3">
                                <script async src="https://imgbb.com/upload.js"></script>
                                <FileUpload ref={fileUploadRef} name="foto-1" url="./upload" 
                                            accept="image/*" maxFileSize={500000} className="p-mr-1 teste"
                                            onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                            headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                            chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} 
                                            />
                                </div> 
                                <div className="p-mt-2 p-col-12 p-sm-3 p-md-6 p-lg-3">           
                                    <FileUpload ref={fileUploadRef} name="foto-1" url="https://api.imgur.com/3/image"
                                                accept="image/*" maxFileSize={500000}
                                                onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                                chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}
                                                />
                                </div> 
                                <div className="p-mt-2 p-col-12 p-sm-3 p-md-6 p-lg-3">
                                    <FileUpload ref={fileUploadRef} name="foto-1" url="https://primefaces.org/primereact/showcase/upload.php" 
                                                accept="image/*" maxFileSize={500000} className="p-mr-1"
                                                onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                                chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}
                                                />
                                </div>
                                <div className="p-mt-2 p-col-12 p-sm-3 p-md-6 p-lg-3">
                                    <FileUpload ref={fileUploadRef} name="foto-1" url="https://primefaces.org/primereact/showcase/upload.php" 
                                                accept="image/*" maxFileSize={500000}
                                                onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                                chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}
                                                />
                                </div>
                                {/* <FileUpload ref={fileUploadRef} name="foto-1" url="https://primefaces.org/primereact/showcase/upload.php" 
                                            accept="image/*" maxFileSize={500000} className="p-mr-2 p-mt-2"
                                            onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                            headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                            chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} 
                                            />                                                                    */}
                            </div>
                        </div>
                    </FormControl>
                    </DialogContent>
                    <DialogActions style={{padding:'0px'}} >
                    <div className="but-save">
                            <ButtonBase label="SALVAR" icon="" className="p-button-success p-mt-2 p-mb-2 p-mr-5" onClick={saveProduto} />
                        </div>
                    </DialogActions>
                </Dialog>

            </div>
    <Dialog
        open={deleteProdutoDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={hideDeleteProdutoDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">{"Tem certeza que deseja excluir o ítem?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           O ítem {produto.nome}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>{setDeleteprodutoDialog(false); window.location.reload()}} color="primary">
            Não 
          </Button>
          <Button onClick={hideDeleteProdutoDialog} color="primary">
            Sim
          </Button>
        </DialogActions>
    </Dialog>

    <Dialog
        open={deleteProdutosDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={hideDeleteProdutoDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Tem certeza que deseja excluir os  ítens selecionados?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() =>{setDeleteprodutosDialog(false); window.location.reload()}} color="primary">
            Não 
          </Button>
          <Button onClick={deleteSelectedprodutos} color="primary">
            Sim
          </Button>
        </DialogActions>
    </Dialog>
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
            Produto Cadastrado com Sucesso!
        </Alert>
    </Snackbar>

</Container>
    )
}
export default observer(Produto);