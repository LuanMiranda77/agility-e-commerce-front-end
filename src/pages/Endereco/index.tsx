import { Dialog, DialogContent, DialogProps, DialogTitle, Divider } from "@material-ui/core";
import { observer } from 'mobx-react-lite';
import { Badge } from 'primereact/badge';
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ButtonBase } from "../../components/ButtonBase";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { InputBase } from "../../components/InputBase";
import { ModalLoad } from "../../components/ModalLoad";
import { IEndereco } from "../../domain/types/IEndereco";
import { ClienteService } from "../../services/ClienteService/clienteService";
import UsuarioStore from "../../stores/UsuarioStore";
import EnderecoStore from "../../stores/EnderecoStore";
import { Utils } from "../../utils/utils";
import { FormEndereco } from "./form";
import { Container, FormControl } from './styles';
import icon from "../../assets/icon-voltar.png";
import Ufs from './listaUF.json';


/**
*@Author
*@Issue
*/

const Endereco: React.FC = () => {
  const store = useContext(UsuarioStore);
  const storeEnd = useContext(EnderecoStore);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const msg = useRef<Toast>(null);
  const [modalLoad, setModalLoad] = useState(false);
  const [modalDialog, setModalDialog] = useState(false);
  const [selectEnd, setSelectEnd] = useState("");
  const [selectedUF, setSelectedUF] = useState<any>(null);
  const clienteService = new ClienteService();



  const hideDialog = () => {
    setModalDialog(false);
  }

  useEffect(() => {
    store.load(Utils.getClienteLocal());
  }, []);

  const onEdit = (endereco: any) => {
    storeEnd.load(endereco);
    let uf = Ufs.estados.filter((e: any) => e.code === storeEnd.objPage.uf);
    setSelectedUF(uf[0]);
    setModalDialog(true);
  }

  const onNew = () => {
    storeEnd.new();
    setModalDialog(true);
  }

  const onUFChange = (e: { value: any }) => {
    setSelectedUF(e.value);
    storeEnd.objPage.uf = e.value.code;
  }

  const onSave = (tipoSave: number) => {
    setModalLoad(true);
    if(tipoSave===2){
      let uf = store.cliente.enderecos.find((e: IEndereco) => e.id === storeEnd.objPage.id);
      if(uf){
        store.cliente.enderecos = store.cliente.enderecos.map((e: IEndereco) => {
          if(e.id === storeEnd.objPage.id){
             e = storeEnd.objPage
          }
          return e;
        });
      }else{
        store.cliente.enderecos.push(storeEnd.objPage);
      }
    }
    clienteService.post(store.cliente).then(data => {
      store.load(data);
      Utils.setClienteLocal(data);
      setModalLoad(false);
      if(tipoSave===2){
        hideDialog();
        Utils.messagemShow(msg, 'success', 'Endedreço', '🏡 Cadastrado com sucesso!', 5000);
      }else{
        Utils.messagemShow(msg, 'success', 'Salvo', '😃 Alterado com sucesso!', 5000);
      }
    }).catch(error => {
      setModalLoad(false);
      Utils.messagemShow(msg, 'error', 'Erro no salvar', error.mensagemUsuario, 5000);
    });
  }

  const onSetPadrao = (element: any) => {
    store.cliente.enderecos.map((item: IEndereco) => {
      return item.id === element.id ? item.padrao = "S" : item.padrao = null
    });
    Utils.setClienteLocal(store.cliente);
    store.load(Utils.getClienteLocal());
    onSave(1);
  }

  const onDelete = (element: any) => {
    let filter = store.cliente.enderecos.filter((item: IEndereco) => item.id !== element.id);
    store.cliente.enderecos = filter;
    onSave(1)
  }
  const lista = store.cliente.enderecos;

  const enderecos =
    lista.map((e: any) =>
      <div key={e.id} className="p-mt-4">
        <div className="p-grid">
          <div className="p-col-12 p-lg-9 p-xl-9">
            <div className="p-p-2">
              <label htmlFor="" className="p-mr-2 p-text-bold">
                <span className="lable-lista p-mr-2 p-text-bold">Nome completo:</span>
                {store.cliente.usuario.nome}
              </label>
              {e.padrao ? <Badge value="Padrão" severity="success"></Badge> : ''}
            </div>
            <div className="p-p-2">
              <label htmlFor="" className="p-mr-2 p-text-bold">
                <span className="lable-lista p-mr-2 p-text-bold">Telefone:</span>
                {store.cliente.celular}
              </label>
            </div>
            <div className="p-p-2">
              <label htmlFor="" className="p-mr-2 p-text-bold">
                <span className="lable-lista p-mr-2 p-text-bold">Endereço:</span>
                {e.logradouro + ", " + e.numero}
              </label>
              <label htmlFor="" className="p-mr-2 p-text-bold">
                <span className="lable-lista p-mr-2 p-text-bold">| Bairro:</span>
                {e.bairro}
              </label>
              <label htmlFor="" className="p-mr-2 p-text-bold">
                <span className="lable-lista p-mr-2 p-text-bold">| Cidade:</span>
                {e.cidade + "-" + e.uf + " - " + e.cep}
              </label>
            </div>
          </div>
          <div className="p-col-12 p-lg-3 p-xl-3 p-text-center">
            <ButtonBase icon='pi pi-pencil' label='Editar' className="p-button-success p-pr-6 p-pl-6 p-mb-3" onClick={() => onEdit(e)} />
            <ButtonBase icon='pi pi-trash' label='Remover' className="p-button-danger p-pr-5 p-pl-5 p-mb-3" onClick={() => onDelete(e)} />
            {e.padrao ? '' : <ButtonBase icon='pi pi-star' label='Definir padrão' className="p-button-warning p-pr-2 p-pl-2" onClick={() => onSetPadrao(e)} />}
          </div>
        </div>
        <Divider />
      </div>
    );

  return <Container>
    <HeaderAdmin />
    <div className="top p-col-12">
      <div className="card p-p-4 p-shadow-2">
        <div className="p-grid">
          <div className="p-col-6 p-lg-10 p-xl-10">
            <i className="title-label pi pi-map" style={{ 'fontSize': '1.5em' }}></i>
            <label htmlFor="" className="title-label p-ml-2  p-text-bold">Meus Endereços</label>
          </div>
          <div className="p-col-6 p-lg-2 p-xl-2 p-text-right">
            <ButtonBase icon='pi pi-plus' label='Adicionar' className="p-button-success p-pr-3 p-pl-3" onClick={() => onNew()} />
          </div>
        </div>
        <Divider />
        <div className=" p-col-12 p-lg-12 p-xl-12">
          <ul>
            {enderecos}
          </ul>
        </div>
      </div>
    </div>
    {/* ===================form */}
    <Dialog
      className="p-col-12"
      open={modalDialog}
      onClose={hideDialog}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullScreen
      style={{ zIndex: 999 }}
    >
      <DialogTitle id="dialog-title" style={{ padding: '0px' }}>
        <div className="p-grid  p-col-12">
          <div className="p-col-5 p-lg-9 p-xl-9">
            <div className="p-col-12">
              <button type="button" onClick={hideDialog} className="p-grid "
                style={{ background: 'white', border: '0' }}    >
                <img src={icon} alt="img" />
                <label htmlFor="" className="p-mt-2 p-ml-2 p-text-bold" style={{ color: 'var(--text-title)', fontSize: '1.7rem' }}>Adicionar um novo endereço</label>
              </button>
            </div>
          </div>
        </div>
      </DialogTitle>
      <DialogContent dividers={scroll === 'paper'} style={{ background: 'var(--background)' }}>
        <FormControl>
          {/* <div className="card p-p-3 p-shadow-2">
                            <div>
                                <span className='lable-lista'>Dados do recebedor</span>
                            </div>
                            <div className='p-grid p-p-2 p-mt-2'>
                                <div className='p-col-12 p-lg-9 p-xl-9'>
                                    <InputBase type='text' label='Nome completo (Nome e Sobrenome)' placeholder='Digite seu nome completo'></InputBase>
                                </div>
                                <div className='p-field p-col-12 p-lg-3 p-xl-3 p-mt-1'>
                                    <label htmlFor="">Celular<span className="p-ml-1" style={{ color: 'red' }}>*</span></label>
                                    <InputMask mask="(99) 9.9999-9999" placeholder='(99) 9.9999-9999' type='text' className={classNames({ 'p-invalid': '' })} style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div> */}
          <div className="card p-p-3 p-mt-3 p-shadow-2">
            <div>
              <span className='lable-lista'>Dados do endereço</span>
            </div>
            <div className='p-mt-2'>
              <div className='p-field p-col-12 p-lg-2 p-xl-2 p-mt-1'>
                <label htmlFor="">CEP<span className="p-ml-1" style={{ color: 'red' }}>*</span></label>
                <InputMask mask="99999-999" placeholder='99999-999' type='text' value={storeEnd.objPage.cep} onChange={(e) => (storeEnd.objPage.cep = e.target.value)} style={{ width: '100%' }} />
              </div>
              <div className='p-p-2 p-grid'>
                <div className='p-col-12 p-lg-9 p-xl-9'>
                  <InputBase type='text' label='Logradouro' placeholder='Digite seu endereço' value={storeEnd.objPage.logradouro} onChange={(e) => { storeEnd.objPage.logradouro = e.currentTarget.value }} />
                </div>
                <div className='p-col-12 p-lg-3 p-xl-3'>
                  <InputBase type='text' label='Número' placeholder='Digite o número da residência' value={storeEnd.objPage.numero} onChange={(e) => { storeEnd.objPage.numero = e.currentTarget.value }} />
                </div>,
                <div className='p-col-12 p-lg-3 p-xl-3'>
                  <InputBase type='text' label='Cidade' placeholder='Digite o nome do cidade' value={storeEnd.objPage.cidade} onChange={(e) => (storeEnd.objPage.cidade = e.target.value)} />
                </div>
                <div className='p-col-12 p-lg-3 p-xl-3'>
                  <InputBase type='text' label='Bairro' placeholder='Digite o nome do bairro' value={storeEnd.objPage.bairro} onChange={(e) => (storeEnd.objPage.bairro = e.target.value)} />
                </div>
                <div className='p-col-12 p-lg-3 p-xl-3'>
                  <InputBase type='text' label='Complemento (opcional)' placeholder='Apartamento, sala, conjunto, edifício, andar, ect.' value={storeEnd.objPage.complemento} onChange={(e) => { storeEnd.objPage.complemento = e.target.value }} />
                </div>
                <div className='p-field p-col-12 p-lg-2 p-xl-2 p-mt-1'>
                  <label htmlFor="" style={{ width: '100%' }}>UF</label>
                  <Dropdown className='' value={selectedUF} options={Ufs.estados} onChange={onUFChange} optionLabel="name" placeholder="Escolha o estado" style={{ zIndex: '9999' }} />
                </div>
              </div>
            </div>
          </div>
        </FormControl>
        <div className="p-text-right p-mt-3">
          <ButtonBase icon='pi pi-check' label='Salvar' className="p-button-success p-pr-6 p-pl-6" onClick={()=>onSave(2)} />
        </div>
      </DialogContent>
    </Dialog>
    <ModalLoad visible={modalLoad} />
    <Toast ref={msg} />
    {/* <FormEndereco visible={modalDialog} closeFuncion={hideDialog} store={selectEnd} /> */}
  </Container>;
}
export default observer(Endereco);