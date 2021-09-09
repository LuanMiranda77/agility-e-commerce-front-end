import React, { useContext, useEffect,  useState  } from "react"
import { HeaderAdmin } from "../../components/HeaderAdmin"
import { Container, FormControl } from "./styles"
import { Divider } from "primereact/divider"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { Message } from 'primereact/message';
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
import iconImport from "../../assets/iconImport.svg";
import ProdutoStore  from "../../stores/ProdutoStore"
import { observer} from 'mobx-react-lite';
import { AppBar, IconButton, Slide, Toolbar } from "@material-ui/core"
import ComboBase from "../../components/ComboBase"

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

    const hideDeleteProdutosDialog = () => {
        setDeleteprodutosDialog(false);
        window.location.reload();
    }
    const onChangeCategoria = (e: { value: any }) => {
        setCategoria(e.value);
    }

    const saveProduto = () => {
        setSubmitted(true);
        if (produto.descricao.trim()) {
            setProdutoDialog(false);
            if (produto.id) {
                const index = store.findIndexById(produto.id);
                produtos[index] = produto;
                <Message severity="success" text="Record Saved"></Message>
                // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'produto Updated', life: 3000 });
            }
            else {
                store.add(produto);
                // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'produto Created', life: 3000 });
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
        
        return <img src={rowData.imagens[0].url} onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className="produto-image" />
       //return null;
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
            <React.Fragment>
                <span className="p-column-title">Cod.Barras:</span>
                {rowData.codigoBarras}
            </React.Fragment>
        );
    }
    const bodyTemplateColumnB = (rowData: IProduto) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Nome:</span>
                {rowData.nome}
            </React.Fragment>
        );
    }
    const bodyTemplateColumnC = (rowData: IProduto) => {
        const p = priceBodyTemplate(rowData);
        return (
            <React.Fragment>
                <span className="p-column-title">Preço Varejo:</span>
                <span>{p}</span>
            </React.Fragment>
        );
    }
    const bodyTemplateColumnD = (rowData: IProduto) => {
        const p = priceBodyTemplate(rowData);
        return (
            <React.Fragment>
                <span className="p-column-title">Preço Atacado:</span>
                <span>{p}</span>
            </React.Fragment>
        );
    }
    const bodyTemplateColumnE = (rowData: IProduto) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Quatidade:</span>
                {rowData.quantidade}
            </React.Fragment>
        );
    }
    
   
    return (
        <Container>
            <HeaderAdmin />
            <div className="card">
                <div className="p-grid p-mt-3" >
                    <div className="p-grid  p-col-12 p-md-6 p-lg-9 p-ml-2">
                        <img src={produtoIcone} alt="img" className="p-ml-2 p-p-2" />
                        <label className="p-ml-2 p-pt-3">Cadastro de Produto</label>
                    </div>
                    <div className="p-grid  p-sm-6 p-md-6 p-lg-3 buttonAdd" >
                        <ButtonBase label="Adicionar" icon="pi pi-plus" className="p-mr-5 p-button-success" onClick={openDialog} />
                        <ButtonBase label="Remover" icon="pi pi-times" className=" p-button-danger" onClick={confirmDeleteSelected} />
                    </div>
                </div>

                <Divider />

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
                    {/* <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}

                    <DataTable 
                        value={produtos} selection={selectedProdutos} 
                        onSelectionChange={(e) => setSelectedprodutos(e.value)}
                        dataKey="id" paginator rows={10}
                        //rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando  {first} - {last} total de {totalRecords} produtos"
                        globalFilter={globalFilter}
                        header={header}
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
                    <DialogTitle id="scroll-dialog-title" style={{background: 'var(--primary)'}}>
                        <div className="p-grid  p-col-12 p-md-6 p-lg-12">
                            <img src={produtoIcone} alt="img" />
                            <h3 className="p-text-bold p-text-uppercase p-mt-1 p-ml-1" style={{color: 'var(--white)'}}>Cadastro de produto</h3>
                            <button type="button" onClick={hideDialog} className="react-modal-close" style={{background: 'var(--primary)'}}>
                                <i className="pi pi-times p-mt-2" style={{ 'fontSize': '1.5rem','color': 'white'}} />
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
                                    <ComboBase dados={categorias} />
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
                            <div className="p-grid p-field p-mt-2 p-pl-4 p-col-12 p-md-6 p-lg-12">
                                <FileUpload
                                    mode="basic"
                                    accept="image/*"
                                    maxFileSize={1000000}
                                    chooseOptions={{ 
                                        label: 'Importe a imagem', 
                                        icon: 'pi pi-image', 
                                        className: 'p-col p-button-primary p-button-raised p-mr-4' }}
                                >
                                </FileUpload>
                                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseOptions={{ label: 'Importe a imagem', icon: 'pi pi-image', className: 'p-col p-button-primary p-button-raised p-mr-6' }} />
                                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseOptions={{ label: 'Importe a imagem', icon: 'pi pi-image', className: 'p-col p-button-primary p-button-raised p-mr-6' }} />
                                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseOptions={{ label: 'Importe a imagem', icon: 'pi pi-image', className: 'p-col p-button-primary p-button-raised p-mr-6' }} />
                                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseOptions={{ label: 'Importe a imagem', icon: 'pi pi-image', className: 'p-col p-button-primary p-button-raised p-mr-6' }} />
                            </div>
                        </div>
                    </FormControl>
                    </DialogContent>
                    <DialogActions >
                    <div className="but-save">
                            <ButtonBase label="SALVAR" icon="" className="p-button-success p-mt-3 " onClick={saveProduto} />
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
          <Button onClick={() =>{setDeleteprodutoDialog(false)}} color="primary">
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

</Container>
    )
}
export default observer(Produto);