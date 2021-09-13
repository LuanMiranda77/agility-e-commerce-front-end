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
import categoriaIcone from "../../assets/produtoIcone.svg"
import { ButtonBase } from "../../components/ButtonBase"
import { InputSearch } from "../../components/InputSearch"
import { CategoriaService } from "../../services/CategoriaService/categoriaService"
import { ICategoria } from "../../domain/types/ICategoria"
import CategoriaStore  from "../../stores/CategoriaStore"
import { observer} from 'mobx-react-lite';
import { Slide } from "@material-ui/core"
import ComboBase from "../../components/ComboBase"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Categoria: React.FC = () => {
    const store = useContext(CategoriaStore);
    const [modalDialog, setModalDialog] = useState(false);
    const [modalDeleteDialog, setModalDeleteDialog] = useState(false);
    const [modalDeletesDialog, setModalDeletesDialog] = useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [selectedCategorias, setSelectedCategorias] = useState<ICategoria[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState("");
    const categoriaService = new CategoriaService();
    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & { children?: React.ReactElement<any, any> },
        ref: React.Ref<unknown>,
      ) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

    useEffect(() => {
        categoriaService.getCategorias().then(data => {
            store.load(data);
        });
        
    }, []);

    

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    const openDialog = () => {
        store.novo();
        setSubmitted(false);
        setModalDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setModalDialog(false);
    }

    const hideDeleteDialog = () => {
        categoriaService.delete(store.categoria.id);
        store.remove(store.categoria.id);
        setModalDeleteDialog(false);
        window.location.reload();
 
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
    const save = () => {
        setSubmitted(true);
        if (store.categoria.descricao.trim()) {
            setModalDialog(false);
            if (store.categoria.id) {
                const index = store.findIndexById(store.categoria.id);
                store.categorias[index] = store.categoria;
                handleOpen();
            }
            else {
                store.add(store.categoria);
                handleOpen();

            }
            categoriaService.save(store.categoria).then(res => { store.categorias.push(res) });
        }
    }
    const editar = (categoria: ICategoria) => {
        store.update(store.categoria);
        setModalDialog(true);
    }

    const openConfirmeDeleteDialog = (categoria: ICategoria) => {
        store.categoria = categoria;
        setModalDeleteDialog(true);
    }

    const exportCSV = () => {
        // dt.current.exportCSV();
    }
    

    const confirmDeleteSelected = () => {
        setModalDeletesDialog(true);
    }

    const deleteSelecteds = () => {
        store.load(store.categorias.filter(id => !selectedCategorias.includes(id)));
        let categoriasDelete = store.categorias.filter(id => selectedCategorias.includes(id));
        categoriaService.deleteAll(categoriasDelete);
        setModalDeletesDialog(false);
        setSelectedCategorias([]);
        window.location.reload();
        
    }
    const rightToolbarTemplate = () => {
        return (
            <div>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </div>
        )
    }

    const imageBodyTemplate = (rowData: ICategoria) => {
        
        //return <img src={rowData.imagens[0].url} onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className="store.categoria-image" />
       //return null;
    }

    const priceBodyTemplate = (rowData: ICategoria) => {
        return formatCurrency(rowData.id);
    }

    const actionBodyTemplate = (rowData: ICategoria) => {
        return (
            <div className="buttonAction">
                <ButtonBase label="" icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2 p-mb-2" onClick={() =>  editar(rowData)} />
                <ButtonBase label="" icon="pi pi-trash" className="p-button-rounded p-button-danger teste" onClick={() => openConfirmeDeleteDialog(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Listagem de categorias</h5> 
        </div>
    );

    const bodyTemplateColumnA = (rowData: ICategoria) => {
        return (
            <div>
                <span className="p-column-title">Nomde da coluna:</span>
                {rowData.id}
            </div>
        );
    }
    const bodyTemplateColumnB = (rowData: ICategoria) => {
        return (
            <div>
                <span className="p-column-title">Nomde da coluna:</span>
                {rowData.id}
            </div>
        );
    }
    const bodyTemplateColumnC = (rowData: ICategoria) => {
        const p = priceBodyTemplate(rowData);
        return (
            <div>
                <span className="p-column-title">Nome da Coluna de id real:</span>
                <span>{p}</span>
            </div>
        );
    }
    //Coluna Colorida==============================
    const bodyTemplateColumnE = (rowData: ICategoria) => {
        const stockClassName = classNames({
            'outofstock': rowData.id === 0,
            'lowstock': rowData.id > 0 && rowData.id < 10,
            'instock': rowData.id > 5
        });
        return (
            <div className={stockClassName}>
                <span className="p-column-title">Quatidade:</span>
                {rowData.id}
            </div>
        );
    }
    let te = "21.8rem";
    const tamanhoTela = window.screen.availHeight;
    if(tamanhoTela>768){
        te="40rem";
    }
  return(
    <Container>
       <HeaderAdmin />
            <div className="card">
                <div className="p-grid p-mt-3" >
                    <div className="p-grid  p-col-12 p-md-6 p-lg-9 p-ml-2">
                        <img src={ categoriaIcone } alt="img" className="p-ml-2 p-mb-2" />
                        <label className="p-ml-2 p-mt-2">Cadastro de Categoria</label>
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
                         value={store.categorias} selection={selectedCategorias} 
                         onSelectionChange={(e) => setSelectedCategorias(e.value)}
                        dataKey="id" paginator rows={10}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando  {first} - {last} total de {totalRecords} store.categorias"
                        globalFilter={globalFilter}
                        header={header}
                        scrollable
                        scrollHeight={te}
                        className="p-datatable-responsive-demo"
                        
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column header="" body={imageBodyTemplate}></Column>
                        <Column field="codigoBarras" header="Codigo" body={bodyTemplateColumnA} sortable></Column>
                        <Column field="descricao" header="Nome"  body={bodyTemplateColumnB}  sortable></Column>
                        <Column field="id" header="Preco Varejo" body={bodyTemplateColumnC} sortable></Column>
                        <Column field="id" header="id" body={bodyTemplateColumnE} sortable></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
{/* =============================================inicio do modal==========================================================================*/}
                <Dialog 
                    className="teste"
                    open={modalDialog}
                    onClose={hideDialog}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    maxWidth="lg"
                    >
                    <DialogTitle id="scroll-dialog-title" style={{ background: 'var(--primary)'}}>
                        <div className="p-grid  p-col-12 p-md-6 p-lg-12">
                            <img src={ categoriaIcone} alt="img" />
                            <h3 className="p-text-bold p-text-uppercase p-mt-1 p-ml-1" style={{ color: 'var(--white)'}}>Cadastro de categoria</h3>
                            <button type="button" onClick={hideDialog} className="react-modal-close" style={{ background: 'var(--primary)'}}>
                                <i className="pi pi-times p-mt-2" style={{ 'fontSize': '1.5rem','color': 'white'}} />
                            </button>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'} style={{ background: 'var(--background)'}}>
                    <FormControl>
                        <div className="card p-p-4">
                            <div className="p-grid">
                                <div className="p-felx p-col-12 p-ms-3 p-md-6 p-lg-2 p-field" >
                                    <label htmlFor="codigo" className="p-mb-2">Código</label>
                                    <InputText id="barras" 
                                    value={store.categoria.id} onChange={(e) => store.categoria.descricao = e.target.value} 
                                    required autoFocus 
                                    className={classNames({ 'p-invalid': submitted && !store.categoria.descricao })} 
                                    />
                                    {submitted && !store.categoria.descricao && <small className="p-error">Código é obtigatorio.</small>}
                                </div>
                                <div className="p-felx p-col-12 p-ms-3 p-md-6 p-lg-12 p-field">
                                    <label htmlFor="name">Nome</label>
                                    <InputText id="name" 
                                    value={store.categoria.descricao} 
                                    onChange={(e) => store.categoria.descricao = e.target.value} 
                                    required 
                                    className={classNames({ 'p-invalid': submitted && !store.categoria.descricao })}
                                    style={{ width: '100%'}} 
                                    />
                                    {submitted && !store.categoria.descricao && <small className="p-error">Nome é obtigatorio.</small>}
                                </div>
                            </div>
                            <div className="p-formgrid p-grid">
                                <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-field" >
                                    <label htmlFor="id">Quantidade</label>
                                    <InputNumber 
                                        id="id" 
                                        value={store.categoria.id} 
                                        onValueChange={(e) => store.categoria.id = e.target.value} 
                                    />
                                </div>
                                <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-field">
                                    <label htmlFor="pricovarejo">Preço de Varejo</label>
                                    <InputNumber 
                                        id="pricevarejo" 
                                        value={store.categoria.id}
                                        onValueChange={(e) => store.categoria.id = e.target.value} 
                                        mode="currency" 
                                        currency="BRL" 
                                        locale="pt-br" 
                                     />
                                </div>
                                <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-field">
                                    <label htmlFor="priceatacado">Preço de Atacado</label>
                                    <InputNumber 
                                        id="priceatacado" 
                                        value={store.categoria.id} 
                                        onValueChange={(e) => store.categoria.id= e.target.value} 
                                        mode="currency" 
                                        currency="BRL" 
                                        locale="pt-br" 
                                    />
                                </div>

                                <div className="p-col-12 p-felx p-ms-12 p-md-6 p-lg-3 p-field">
                                    <label htmlFor="categoria">Categoria</label>
                                    <ComboBase dados={store.categorias} size='11rem'/>
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
                </Dialog>

            </div>
    <Dialog
        open={modalDeleteDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={hideDeleteDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">{"Tem certeza que deseja excluir o ítem?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           O ítem {store.categoria.descricao}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>{setModalDeleteDialog(false); window.location.reload()}} color="primary">
            Não 
          </Button>
          <Button onClick={hideDeleteDialog} color="primary">
            Sim
          </Button>
        </DialogActions>
    </Dialog>

    <Dialog
        open={modalDeletesDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={hideDeleteDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Tem certeza que deseja excluir os  ítens selecionados?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() =>{setModalDeletesDialog(false); window.location.reload()}} color="primary">
            Não 
          </Button>
          <Button onClick={deleteSelecteds} color="primary">
            Sim
          </Button>
        </DialogActions>
    </Dialog>
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
            Item Cadastrado com Sucesso!
        </Alert>
    </Snackbar>
    </Container>
  );
}

export default observer(Categoria);