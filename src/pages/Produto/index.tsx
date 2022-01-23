import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { observer } from 'mobx-react-lite'
import { Button } from "primereact/button"
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Divider } from "primereact/divider"
import { FileUpload, FileUploadFilesParam } from 'primereact/fileupload'
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
import { DialogConfirme } from '../../components/DialogConfirme'
import FooterAdmin from '../../components/FooterAdmin'
import { HeaderAdmin } from "../../components/HeaderAdmin"
import { InputSearch } from "../../components/InputSearch"
import { ICategoria } from '../../domain/types/ICategoria'
import { IProduto } from "../../domain/types/IProduto"
import { CategoriaService } from '../../services/CategoriaService/categoriaService'
import { ProdutoService } from "../../services/ProdutoService/produtoServices"
import ProdutoStore from "../../stores/ProdutoStore"
import { Utils } from "../../utils/utils"
import { Container, FormControl } from "./styles"
import { Checkbox } from 'primereact/checkbox';
import iconLivre from '../../assets/icon-livre.jpg'
import { Dropdown } from 'primereact/dropdown'



const Produto: React.FC = () => {

    const store = useContext(ProdutoStore);
    const [produtoDialog, setProdutoDialog] = useState(false);
    const [deleteProdutoDialog, setDeleteprodutoDialog] = useState(false);
    const [deleteProdutosDialog, setDeleteprodutosDialog] = useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [categorias, setCategorias] = useState<ICategoria[]>([]);
    const [selectedProdutos, setSelectedprodutos] = useState<IProduto[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState("");
    const toast = useRef<Toast>(null);
    const produtoService = new ProdutoService();
    const categoriaService = new CategoriaService();
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        produtoService.getProdutos().then(data => {
            store.load(data)
        }).catch(error => {
            Utils.messagemShow(toast, 'info', `AVISO`, error.mensagemUsuario, 3000);
        });;
    }, []);

    useEffect(() => {
        categoriaService.getCategorias().then(data => {
            setCategorias(data);
        });
    }, []);

    const openDialog = () => {
        store.novo();
        setSubmitted(false);
        setProdutoDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProdutoDialog(false);
        store.novo();
        setTotalSize(0);
    }

    const hideDialogConfirme = () => {
        setDeleteprodutosDialog(false);
    }

    const hideDeleteProdutoDialog = () => {
        produtoService.delete(store.produto.id);
        store.remove(store.produto.id);
        //produtos.splice(produtos.indexOf(produto), 1);
        setDeleteprodutoDialog(false);

    }

    const enviarProdutosMercadoLivre = () => {
        let produto = store.produtos.filter(valor => selectedProdutos.includes(valor));
        produtoService.enviarProdutoMercLivre(produto[0])
            .then(result => {
                Utils.messagemShow(toast, 'success', 'Produto enviado com sucesso', `Item: ${result.titulo}`, 5000);
            })
            .catch(error => {
                Utils.messagemShow(toast, 'error', 'Error na validação do produto', error, 5000);
            }
            );

    }

    const saveProduto = () => {
        setSubmitted(true);
        if (store.produto.descricao.trim()) {
            const produtoValidado = Utils.validarProduto(store.produto);

            if (produtoValidado !== '') {
                Utils.messagemShow(toast, 'error', 'Error na validação do produto', produtoValidado, 5000);
                return false;
            }

            if (store.produto.id !== 0) {
                produtoService.update(store.produto).then((res) => {
                    const index = store.findIndexById(store.produto.id);
                    store.produtos[index] = store.produto;
                    Utils.messagemShow(toast, 'success', 'Alterado com sucesso!', `Item: ${store.produto.titulo}`, 3000);
                    hideDialog();

                }).catch((error) => {
                    Utils.messagemShow(toast, 'error', 'Error na atualização', error.mensagemUsuario, 3000);
                    return false;
                });
            } else {
                produtoService.save(store.produto, checked).then(res => {
                    store.add(res);
                    Utils.messagemShow(toast, 'success', 'Cadastro com sucesso!', `Item: ${store.produto.titulo}`, 3000);
                    hideDialog();

                }).catch(error => {
                    Utils.messagemShow(toast, 'error', 'Error no cadastro', error.mensagemUsuario, 3000);
                    return false;
                });
            }
        } else {
            Utils.messagemShow(toast, 'error', 'Error no cadastro', 'Descrição inválida', 3000);
            return false;
        }
    }
    const editar = (produto: IProduto) => {
        store.update(produto);
        let soma = 0;
        store.produto.imagens.forEach(e => {
            soma += e.size;
        });
        setTotalSize(soma);
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

    const setCategoria = (categoria: {value: any}) => {
        store.produto.categoria = categoria.value;
    }

    const deleteSelectedAll = () => {
        let produtosDelete = store.produtos.filter(valor => selectedProdutos.includes(valor));
        produtoService.deleteAll(produtosDelete);
        store.load(store.produtos.filter(valor => !produtosDelete.includes(valor)));
        setSelectedprodutos([]);
        setDeleteprodutosDialog(false);
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
        let imgURL = ''
        if (rowData.imagens[0]) {
            imgURL = rowData.imagens[0].objectURL;
        }
        // eslint-disable-next-line jsx-a11y/alt-text
        return <img
            id='link'
            src={imgURL}
            onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
            className="product-image"
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

    //=====================template imgages==========================//
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);

    const [selectDelImges, setSelectDelImges] = useState<File[]>([]);

    const onTemplateSelect = (file: FileUploadFilesParam) => {
        if (store.produto.imagens.length < 4) {
            let v = file.files[0];
            store.produto.imagens.push(v);
            setTotalSize(totalSize + v.size);
        } else {
            Utils.messagemShow(toast, 'error', 'Erro ao adicionar imagens', 'Só é permitido 4 imagens', 5000);
            return false;
        }

    }

    const deleteSelectedAllImges = () => {
        store.produto.imagens = [];
        setTotalSize(0);
        // history.push("/produto");
    }

    const actionBody = (rowData: File) => {
        return (
            <div className="buttonAction">
                <ButtonBase label="" icon="pi pi-trash" className="p-button-rounded p-button-danger teste" onClick={() => onTemplateRemove(rowData)} />
            </div>
        );
    }

    const onTemplateRemove = (file: any) => {
        let _array = store.produto.imagens.filter(f => f.objectURL !== file.objectURL);
        store.produto.imagens = _array;
        setTotalSize(totalSize - file.size);
        // callback();
    }

    const itemTemplate = (file: any, props: any) => {
        return (
            <div className="p-ai-center p-col-12">
                <div className="p-ai-center p-sm-12 p-md-12 p-lg-12 p-xl-12 p-flex">
                    <img alt={file.name} role="presentation" src={file.objectURL} width={'80%'} height={200} />
                    <Tag value={Utils.fileConvertSizeByte(file.size)} severity="warning" className="p-px-1 p-mt-2 p-mb-2 p-py-1 p-sm-8 p-md-9 p-lg-8 p-xl-8 p-mr-6" />
                    <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto p-mt-2" onClick={() => onTemplateRemove(file)} />
                    <Divider />
                </div>
            </div>
        )
    }

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };

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
                    <div className="p-grid  p-col-12 p-md-6 p-lg-7 p-ml-2">
                        <img src={produtoIcone} alt="img" className="p-ml-2 p-mb-2" />
                        <label className="p-ml-2 p-mt-2">Cadastro de Produto</label>
                    </div>
                    <div className="p-grid  p-sm-6 p-md-6 p-lg-5 p-mb-2" >
                        {/* <ButtonBase label="Enviar" icon="pi pi-plus" className="p-mr-5 p-button-success" onClick={enviarProdutosMercadoLivre} /> */}
                        <div className='p-col-4'>
                            <ButtonBase label="Enviar Livre" icon="pi pi-send" className="p-button-success" onClick={enviarProdutosMercadoLivre} style={{background:'#EFDD3E'}}/>
                        </div >
                        <div className='p-col-4'>
                            <ButtonBase label="Adicionar" icon="pi pi-plus" className="p-button-success" onClick={openDialog} />
                        </div>
                        <div className='p-col-4'>
                            <ButtonBase label="Remover" icon="pi pi-times" className=" p-button-danger" onClick={confirmDeleteSelected} />
                        </div>
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
                        value={store.produtos} selection={selectedProdutos}
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
                    style={{ zIndex: 999 }}
                >
                    <DialogTitle id="dialog-title" style={{ background: 'var(--primary)', padding: '0px' }}>
                        <div className="p-grid  p-col-12 p-md-6 p-lg-12">
                            <img src={produtoIcone} alt="img" className='p-ml-5 p-mt-1' />
                            <h5 className="p-text-bold p-text-uppercase p-mt-2 p-ml-2 titulo-modal" style={{ color: 'var(--white)' }}>Cadastro de produto</h5>
                            <button type="button" onClick={hideDialog} className="react-modal-close" style={{ background: 'var(--primary)', marginTop: '-10px' }}>
                                <i className="pi pi-times p-mt-2" style={{ 'fontSize': '1.0rem', 'color': 'white' }} />
                            </button>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'} style={{ background: 'var(--background)' }}>
                        <FormControl>
                            <div className="card p-p-3">
                                <div className="p-grid">
                                    <div className="p-felx p-col-12 p-ms-3 p-md-6 p-lg-6 p-xl-6 p-field" >
                                        <label htmlFor="codigo" className="p-col-12">Código</label>
                                        <InputText id="barras"
                                            value={store.produto.codigoBarras} onChange={(e) => store.produto.codigoBarras = e.target.value}
                                            required autoFocus
                                            className={classNames({ 'p-invalid': submitted && !store.produto.titulo }, 'p-col-8')}
                                        />
                                        {submitted && !store.produto.titulo && <small className="p-error">Código é obtigatorio.</small>}
                                    </div>
                                    <div className='p-xl-6 p-p-3 p-mt-2' style={{ background: '#D3D3D3', borderRadius: '0.25em' }}>
                                        <h5><i className="pi pi-share-alt p-mr-2"></i>Compartilhar com:</h5>
                                        <div className='p-grid p-mt-3'>
                                            <div className="p-field-checkbox">
                                                <Checkbox inputId="check-livre" checked={checked} onChange={e => setChecked(e.checked)} />
                                                <label htmlFor="mc_livre" className='p-text-bold'>Mercado Livre</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-felx p-col-12 p-ms-3 p-md-6 p-lg-12 p-field">
                                        <label htmlFor="name">Titulo</label>
                                        <InputText id="name"
                                            value={store.produto.titulo}
                                            onChange={(e) => store.produto.titulo = e.target.value}
                                            required
                                            className={classNames({ 'p-invalid': submitted && !store.produto.titulo })}
                                            style={{ width: '100%' }}
                                        />
                                        {submitted && !store.produto.titulo && <small className="p-error">Titulo é obtigatorio.</small>}
                                    </div>
                                </div>
                                <div className="p-formgrid p-grid">
                                    <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-field" >
                                        <label htmlFor="quantidade" className='p-col-12'>Quantidade</label>
                                        <InputNumber
                                            id="quantidade"
                                            value={store.produto.quantidade}
                                            onValueChange={(e) => store.produto.quantidade = e.target.value}
                                            className='p-col-12'
                                        />
                                    </div>
                                    <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-field">
                                        <label htmlFor="pricovarejo" className='p-col-12' >Preço de Varejo</label>
                                        <InputNumber
                                            id="pricevarejo"
                                            value={store.produto.precoVarejo}
                                            onValueChange={(e) => store.produto.precoVarejo = e.target.value}
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
                                            value={store.produto.precoAtacado}
                                            onValueChange={(e) => store.produto.precoAtacado = e.target.value}
                                            mode="currency"
                                            currency="BRL"
                                            locale="pt-br"
                                            className='p-col-12'
                                        />
                                    </div>

                                    <div className="p-col-12 p-felx p-ms-12 p-md-6 p-lg-3 p-field">
                                    <label htmlFor="peso" className="p-col-12" >Categoria</label>
                                        <Dropdown value={store.produto.categoria} options={categorias} onChange={setCategoria} 
                                        optionLabel="nome" 
                                        placeholder="Selecione categoria"
                                        style={{width: '100%'}}
                                        />
                                        {/* filter showClear filterBy="nome"  */}
                                    </div>
                                </div>
                                <div className="p-formgrid p-grid">
                                    <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-field">
                                        <label htmlFor="peso" className="p-col-12" >Peso kg</label>
                                        <InputNumber
                                            id="peso"
                                            value={store.produto.peso}
                                            onValueChange={(e) => store.produto.peso = e.target.value}
                                            mode="decimal" minFractionDigits={1}
                                            className="p-col-12"

                                        />
                                    </div>
                                    <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-xl-3 p-field">
                                        <label htmlFor="comprimento" className="p-col-12">Comprimento cm</label>
                                        <InputNumber
                                            id="comprimento"
                                            value={store.produto.comprimento}
                                            onValueChange={(e) => store.produto.comprimento = e.target.value}
                                            mode="decimal" minFractionDigits={2}
                                            className="p-col-12"

                                        />
                                    </div>
                                    <div className="p-col-12 p-felx p-ms-3 p-md-6 p-lg-3 p-xl-3 p-field">
                                        <label htmlFor="altura" className="p-col-12" >Altura cm</label>
                                        <InputNumber
                                            id="altura"
                                            value={store.produto.altura}
                                            onValueChange={(e) => store.produto.altura = e.target.value}
                                            mode="decimal" minFractionDigits={2}
                                            className="p-col-12"

                                        />
                                    </div>
                                    <div className="p-col-12 p-ms-3 p-md-6 p-lg-3 p-xl-3 p-field">
                                        <label htmlFor="largura" className="p-col-12">Lagura cm</label>
                                        <InputNumber
                                            id="peso"
                                            min={0} max={100}
                                            value={store.produto.largura}
                                            onValueChange={(e) => store.produto.largura = e.target.value}
                                            mode="decimal" minFractionDigits={2}
                                            className="p-col-12"


                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-grid p-col-12">
                                <div className="p-card p-field p-mt-4  p-p-2 p-sm-12 p-md-12 p-lg-5 p-xl-6 descri-campo">
                                    <label htmlFor="description">Descrição</label>
                                    <InputTextarea
                                        id="description"
                                        style={{ height: '50vh', width: '100%' }}
                                        value={store.produto.descricao}
                                        onChange={(e) => store.produto.descricao = e.target.value}
                                        required
                                        rows={3}
                                        cols={20} />
                                </div>

                                <div className="p-card p-p-3 p-sm-12 p-md-12 p-lg-6 p-mt-4  mama">
                                    <label htmlFor="imagens">Imagens</label>
                                    <div className="p-grid p-field p-mt-2 p-pl-3 p-col-12 ">
                                        <div className="p-sm-12 p-md-12 p-lg-12">
                                            <div className="table-images">
                                                <div className="p-grid p-flex p-mr-4 p-p-2">
                                                    <FileUpload mode="basic"
                                                        chooseOptions={chooseOptions}
                                                        name="button-upload"
                                                        accept="image/*"
                                                        maxFileSize={1000000}
                                                        onSelect={onTemplateSelect}
                                                        auto chooseLabel=""
                                                    />
                                                    <ButtonBase label="" icon="pi pi-times" className="p-ml-4 p-button-rounded p-button-danger p-button-outlined" onClick={deleteSelectedAllImges} />
                                                    <ProgressBar className='p-mt-2' value={(totalSize / 10000)} displayValueTemplate={() => `${Utils.fileConvertSizeByte(totalSize)} | 1MB`} style={{ width: '70%', height: '20px', marginLeft: 'auto' }}></ProgressBar>
                                                </div>
                                                <DataTable
                                                    value={store.produto.imagens} selection={selectDelImges}
                                                    onSelectionChange={(e) => setSelectDelImges(e.value)}
                                                    dataKey="id"
                                                    scrollable
                                                    scrollHeight={'20rem'}
                                                    className="p-datatable-responsive-demo"
                                                >
                                                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                                                    <Column header="" body={itemTemplate}></Column>
                                                    {/* <Column body={actionBody}></Column> */}
                                                </DataTable>
                                            </div>
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

            <DialogConfirme show={deleteProdutoDialog} text={"item: " + store.produto.titulo} titulo='Realmente deseja deletar o item?'
                setFunctionButtonSim={hideDeleteProdutoDialog}
                setFunctionButtonNao={() => setDeleteprodutoDialog(false)} />

            <DialogConfirme show={deleteProdutosDialog} text='' titulo='Realmente deseja deletar os  ítens selecionados?'
                setFunctionButtonSim={deleteSelectedAll}
                setFunctionButtonNao={hideDialogConfirme} />

            <Toast ref={toast} />
            {/* <FooterAdmin /> */}
        </Container>
    )
}
export default observer(Produto);