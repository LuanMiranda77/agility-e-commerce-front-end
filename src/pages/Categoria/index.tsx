import { observer } from 'mobx-react-lite'
import { Button } from "primereact/button"
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Divider } from "primereact/divider"
import { FileUpload } from 'primereact/fileupload'
import { Toast } from 'primereact/toast'
import React, { useContext, useEffect, useRef, useState } from "react"
import categoriaIcone from "../../assets/categ-icon.png"
import { ButtonBase } from "../../components/ButtonBase"
import { DialogConfirme } from "../../components/DialogConfirme"
import { HeaderAdmin } from "../../components/HeaderAdmin"
import { InputSearch } from "../../components/InputSearch"
import { ICategoria } from "../../domain/types/ICategoria"
import { CategoriaService } from "../../services/CategoriaService/categoriaService"
import CategoriaStore from "../../stores/CategoriaStore"
import { Utils } from '../../utils/utils'
import { CategoriaForm } from './form'
import { Container } from "./styles"

const Categoria: React.FC = () => {
    const store = useContext(CategoriaStore);
    const [modalDialog, setModalDialog] = useState(false);
    const [modalDeleteDialog, setModalDeleteDialog] = useState(false);
    const [modalDeletesDialog, setModalDeletesDialog] = useState(false);
    const [selectedCategorias, setSelectedCategorias] = useState<ICategoria[]>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const categoriaService = new CategoriaService();
    const msg = useRef<Toast>(null);

    useEffect(() => {
        categoriaService.getCategorias().then(data => {
            store.load(data);
        });
        
    }, []);

    const openDialog = () => {
        store.novo();
        setModalDialog(true);
    }

    const hideDialog = () => {
        setModalDialog(false);

    }


    const deleteItem = () => {
        categoriaService.delete(store.categoria.id).then(response => {
            store.remove(store.categoria.id);
          }).catch(error => {
            Utils.messagemShow(msg,'error', 'Error na atualização', error.mensagemUsuario,5000);
            return false;
          });
        setModalDeleteDialog(false);
    }
    const hideConfirmeDialog = () =>{
        setModalDeleteDialog(false);
    }   

    const editar = (categoria: ICategoria) => {
        store.update(categoria);
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

    const deleteAll = () => {
        let categoriasDelete = store.categorias.filter(id => selectedCategorias.includes(id));
        categoriaService.deleteAll(categoriasDelete).then(response => {
            store.load(store.categorias.filter(id => !selectedCategorias.includes(id)));   
          }).catch(error => {
            Utils.messagemShow(msg,'error', 'Error na atualização', error.mensagemUsuario,5000);
            
          });;
        setModalDeletesDialog(false);
        setSelectedCategorias([]);
        
    }
    const rightToolbarTemplate = () => {
        return (
            <div>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </div>
        )
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
            {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="" className="p-mr-2 p-d-inline-block" />
            <Button label="" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} /> */}
        </div>
    );

    const bodyTemplateColumnA = (rowData: ICategoria) => {
        return (
            <div>
                <span className="p-column-title">Código:</span>
                {rowData.id}
            </div>
        );
    }
    const bodyTemplateColumnB = (rowData: ICategoria) => {
        return (
            <div>
                <span className="p-column-title">Nome:</span>
                {rowData.nome}
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

                <div className="p-grid p-p-2 p-col-12">
                    <div className="p-p-2 p-sm-12 p-md-6 p-lg-6 p-ml-2 pesquisar">
                        <InputSearch placeholder="Pesquise..." type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} />
                    </div>
                </div>
            </div>
            
            <div className="datatable-crud-demo datatable-responsive-demo">
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
                        <Column field="id" header="Codigo" body={bodyTemplateColumnA} headerStyle={{ width: '10rem' }} sortable></Column>
                        <Column field="nome" header="Nome"  body={bodyTemplateColumnB} headerStyle={{ width: '75%' }} sortable></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
{/* =============================================inicio do modal==========================================================================*/}
    <CategoriaForm store={store} closeFuncion={hideDialog} modalDialog={modalDialog} />

    <DialogConfirme show={modalDeleteDialog} text={"item: "+store.categoria.nome} titulo='Realmente deseja deletar o item?' setFunctionButtonSim={deleteItem}  setFunctionButtonNao={()=>setModalDeleteDialog(false)}/>

    <DialogConfirme show={modalDeletesDialog} text='' titulo='Realmente deseja deletar os  ítens selecionados?' setFunctionButtonSim={deleteAll}  setFunctionButtonNao={hideConfirmeDialog}/>
    
    <Toast ref={msg}/>

    </Container>
  );
}

export default observer(Categoria);