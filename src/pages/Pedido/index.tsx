import React, { useContext, useEffect, useState } from "react"
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
import { InputNumber } from 'primereact/inputnumber';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TransitionProps } from '@material-ui/core/transitions';
import { ButtonBase } from "../../components/ButtonBase"
import { InputSearch } from "../../components/InputSearch"
import { PedidoService } from "../../services/PedidoService/pedidoService"
import { IPedido } from "../../domain/types/IPedido"
import PedidoStore from "../../stores/PedidoStore"
import { observer } from 'mobx-react-lite';
import { Slide } from "@material-ui/core"
import ComboBase from "../../components/ComboBase"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { red } from "@material-ui/core/colors"
import { Tag } from 'primereact/tag'
import iconCarrinho from '../../assets/iconCarrinho.svg';
import InputDateBase from "../../components/InputDateBase"
import { Calendar } from 'primereact/calendar';
import { Utils } from "../../utils/utils"
import { DetalhePedido } from "./detalhe"
import { IEndereco } from "../../domain/types/IEndereco"
import { TabMenu, TabMenuTabChangeParams } from 'primereact/tabmenu';


const Pedido: React.FC = () => {
    const store = useContext(PedidoStore);
    const [modalDialog, setModalDialog] = useState(false);
    const [modalDeleteDialog, setModalDeleteDialog] = useState(false);
    const [modalDeletesDialog, setModalDeletesDialog] = useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [selectedPedidos, setSelectedPedidos] = useState<IPedido[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState("");
    const pedidoService = new PedidoService();
    const [activeIndex, setActiveIndex] = useState(0); // usado pelo  filtro de pedido

    useEffect(() => {
        pedidoService.getPedidos().then(data => {
            store.load(data);
        });

    }, []);

    const openDialog = () => {
        store.novo();
        setSubmitted(false);
        setModalDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setModalDialog(false);
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

    const editar = (pedido: IPedido) => {
        store.update(store.pedido);
        setModalDialog(true);
    }

    const openConfirmeDeleteDialog = (pedido: IPedido) => {
        store.pedido = pedido;
        setModalDeleteDialog(true);
    }

    const exportCSV = () => {
        // dt.current.exportCSV();
    }


    const confirmDeleteSelected = () => {
        setModalDeletesDialog(true);
    }

    const rightToolbarTemplate = () => {
        return (
            <div>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </div>
        )
    }

    const priceBodyTemplate = (rowData: IPedido) => {
        return Utils.formatCurrency(rowData.valorTotal);
    }

    const actionBodyTemplate = (rowData: IPedido) => {
        return (
            <div className="buttonAction">
                <Button label="" icon="pi pi-chart-bar" className="p-button-primary p-mr-2 p-mb-2" tooltip="Ver detalhes" onClick={() => detalhesPedido(rowData)} />
            </div>
        );
    }


    const bodyTemplateColumnA = (rowData: IPedido) => {
        return (
            <div>
                <span className="p-column-title">Id:</span>
                {rowData.id}
            </div>
        );
    }
    const bodyTemplateColumnB = (rowData: IPedido) => {
        return (
            <div>
                <span className="p-column-title">Cliente:</span>
                {rowData.cliente}
            </div>
        );
    }

    const bodyTemplateColumnC = (rowData: IPedido) => {
        return (
            <div>
                <span className="p-column-title">Data da compra:</span>
                {/* {rowData.dataCriacao} */}
            </div>
        );
    }

    const bodyTemplateColumnD = (rowData: IPedido) => {
        const p = Utils.formatCurrency(rowData.valorDesconto);
        return (
            <div>
                <span className="p-column-title">V. Desconto:</span>
                <span style={{ color: 'var(--red)' }}>{p}</span>
            </div>
        );
    }

    const bodyTemplateColumnE = (rowData: IPedido) => {
        const p = Utils.formatCurrency(rowData.valorFrete);
        return (
            <div>
                <span className="p-column-title">V. Frete:</span>
                <span style={{ color: 'var(--blue)' }}>{p}</span>
            </div>
        );
    }

    const bodyTemplateColumnF = (rowData: IPedido) => {
        const p = Utils.formatCurrency(rowData.valorTotal);
        return (
            <div>
                <span className="p-column-title">V. Total:</span>
                <span style={{ color: 'var(--green)' }}>{p}</span>
            </div>
        );
    }


    const bodyTemplateColumnG = (rowData: IPedido) => {
        let status = rowData.status;
        if (status === 'PENDENTE') {
            status = "warning";
        } else if (status === 'CONCLUIDO') {
            status = "success";
        } else {
            status = "danger";
        }
        return (
            <div>
                <span className="p-column-title">V. Total:</span>
                <Tag severity={status} value={rowData.status} rounded></Tag>
            </div>
        );
    }
    const filterPedidoStatus = (value: IPedido, filter: any) => {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

    }

    /**
     * @author carlos.avelino2.0@gmail.com
     * @returns JSX referente ao render do filtro de pedidos
     */
    const bodyTabMenuPedidoFiltroEstado = () => {

        const items = [
            { label: 'Todos', icon: 'pi pi-fw pi-check-square' },
            { label: 'Não Pagos', icon: 'pi pi-fw pi-ban' },
            { label: 'A Enviar', icon: 'pi pi-fw pi-send' },
            { label: 'Concluíndo', icon: 'pi pi-fw pi-dollar' },
            { label: 'Devolução/Reembolso', icon: 'pi pi-fw pi-exclamation-circle' }
        ];
        const filterPedido = (e: TabMenuTabChangeParams) => {
            console.log(e.index);
            setActiveIndex(e.index);

        };
        return (
            <div>
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={filterPedido} />
            </div>
        );


    }


    let te = "21.8rem";
    const tamanhoTela = window.screen.availHeight;
    if (tamanhoTela > 768) {
        te = "40rem";
    }

    // Data calendário
    const [data, setData] = useState(new Date());

    const [dateInicail, setDateInicail] = useState<Date | Date[] | undefined>(new Date());
    const [dateFinal, setDateFinal] = useState<Date | Date[] | undefined>(new Date());

    const detalhesPedido = (pedido: any) => {
        setModalDialog(true);
        store.pedido = pedido;
    }



    return (
        <Container>
            <HeaderAdmin />
            <div className="card">
                <div className="p-grid p-mt-1" >
                    <div id='titulo-pedido' className="p-grid  p-sm-12 p-col-3 p-md-12 p-lg-3 p-xl-3 p-ml-2">
                        <img src={iconCarrinho} alt="img" className="p-ml-2 p-mb-2" />
                        <label className="p-ml-2 p-mt-2">Gerenciamento de Pedidos</label>
                    </div>

                    <div className="p-col-9 p-grid p-p-2">
                        {bodyTabMenuPedidoFiltroEstado()}
                    </div>
                </div>

                <Divider className="diveder p-mb-4" />



                <div className="p-fluid p-grid p-formgrid p-col-12">
                    <div className="p-p-2  p-sm-12 p-md-12 p-lg-5 p-xl-6 p-ml-2 p-mr-6 pesquisar">
                        <InputSearch placeholder="Pesquise..." type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} />
                    </div>
                    <div className="p-mr-2 p-field p-sm-12 p-md-12 p-lg-2 p-xl-2 button-calendario">
                        <label>Data inicial</label>
                        <Calendar id="icon" value={dateInicail} onChange={(e) => setDateInicail(e.value)} showIcon />
                    </div>

                    <div className="p-field p-sm-12 p-md-12 p-lg-2 p-xl-2 button-calendario">
                        <label  >Data final</label>
                        <Calendar id="icon" value={dateFinal} onChange={(e) => setDateFinal(e.value)} showIcon />
                    </div>

                </div>

            </div>

            <div className="datatable-crud-demo datatable-responsive-demo table">
                <div className="">
                    <DataTable
                        value={store.pedidos} selection={selectedPedidos}
                        onSelectionChange={(e) => setSelectedPedidos(e.value)}
                        dataKey="id" paginator rows={10}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando  {first} - {last} total de {totalRecords} produtos"
                        globalFilter={globalFilter}
                        scrollable
                        scrollHeight={te}
                        className="p-datatable-responsive-demo"

                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="id" header="Código" body={bodyTemplateColumnA} sortable></Column>
                        <Column field="cliente" header="Cliente" body={bodyTemplateColumnB} headerStyle={{ width: '25%' }}sortable></Column>
                        <Column field="dataCriacao" header="Data da compra" body={bodyTemplateColumnC} headerStyle={{ width: '13%' }}sortable></Column>
                        <Column field="valorDesconto" header="V. Desconto" body={bodyTemplateColumnD} headerStyle={{ width: '12%' }}sortable></Column>
                        <Column field="valorFrete" header="V. Frete" body={bodyTemplateColumnE} sortable></Column>
                        <Column field="valorTotal" header="V. Total" body={bodyTemplateColumnF} sortable></Column>
                        <Column field="status" header="Status" body={bodyTemplateColumnG} sortable filterFunction={filterPedidoStatus} ></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
            {/* =============================================inicio do modal==========================================================================*/}
            <DetalhePedido modalDialog={modalDialog} closeFuncion={hideDialog} store={store} />

        </Container>
    );
}

export default observer(Pedido);