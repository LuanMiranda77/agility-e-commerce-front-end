import React, { useContext, useEffect, useState, useRef } from "react"

import { Container } from './styles';
import { observer } from 'mobx-react-lite';
import LojaStore from "../../stores/LojaStore"
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { Divider } from "@material-ui/core";
import { ButtonBase } from "../../components/ButtonBase";
import { InputBase } from "../../components/InputBase";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import Ufs from '../Endereco/listaUF.json';
import { InputMask } from "primereact/inputmask";
import { Utils } from "../../utils/utils";
import { LojaService } from "../../services/LojaService/lojaService";
import { ModalLoad } from "../../components/ModalLoad";

/**
*@Author
*@Issue
*/

const Loja: React.FC = () => {
  const store = useContext(LojaStore);
  const msg = useRef<Toast>(null);
  const [modalLoad, setModalLoad] = useState(false);
  const [selectedUF, setSelectedUF] = useState<any>(null);
  const empresaService = new LojaService();

  useEffect(() => {
    empresaService.get().then(data =>{
        store.load(data);
        let uf = Ufs.estados.filter((e: any) => e.code === store.objPage.uf);
        setSelectedUF(uf[0]);
    }
    ).catch(error => {
      Utils.messagemShow(msg, 'error', 'Erro de carregamento', "😱 "+error.mensagemUsuario, 5000);
    });
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const onSave = () => {
    setModalLoad(true);
    empresaService.post(store.objPage).then(data =>{
      setModalLoad(false);
      Utils.messagemShow(msg, 'success', 'Salvo', '😃 Dados salvo com sucesso', 5000);
    }).catch(error =>{
      setModalLoad(false);
      Utils.messagemShow(msg, 'error', 'Erro no salvar', "😱 "+error.mensagemUsuario, 5000);
    });
  }

  const onUFChange = (e: { value: any }) => {
    setSelectedUF(e.value);
    store.objPage.uf = e.value.code;
  }

  const onValidaCnpj = () => {
    if (Utils.isValidCNPJ(store.objPage.cnpj) === false) {
      store.isValid.CNPJ = false;
      Utils.messagemShow(msg, 'error', 'Erro no salvar', "😱 "+"CNPJ inválido", 5000);
    } else {
      store.isValid.CNPJ = true;
      onSave();
    }
  }

  return <Container>
    <HeaderAdmin />
    <div className="p-col-12 top">
      <div className="card">
        <div className="title-label p-text-bold">
          <i className="title-label p-text-bold pi pi-home p-mr-2"></i>
          <span>Informações da Loja</span>
          <Divider />
        </div>
        <div className="p-col-12">
          <div className="p-mt-3">
            <div>
              <span className='lable-lista'>Ficha da empresa</span>
            </div>
            <div className='p-mt-2'>
              <div className='p-p-2 p-grid'>
                <div className='p-field p-col-12 p-lg-4 p-xl-4 p-mt-1'>
                  <label htmlFor="">CNPJ<span className="p-ml-1" style={{ color: 'red' }}>*</span></label>
                  <InputMask mask='99.999.999/9999-99' placeholder='Digite o seu CNPJ' type='text'
                    value={store.objPage.cnpj} onChange={(e) => store.objPage.cnpj = e.value} style={{ width: '100%' }}
                  />
                </div>
                <div className='p-field p-col-12 p-lg-4 p-xl-4 p-mt-1'>
                  <label htmlFor="">Ins. Estadual</label>
                  <InputMask mask='99.999.999-9' placeholder='Digite o seu inscrição' type='text'
                    value={store.objPage.instEstadual} onChange={(e) => store.objPage.instEstadual = e.value} style={{ width: '100%' }}
                  />
                </div>
                <div className='p-field p-col-12 p-lg-4 p-xl-4 p-mt-1'>
                  <label htmlFor="">Ins. Municipal</label>
                  <InputMask mask='99.999.999-9' placeholder='Digite o seu inscrição' type='text'
                    value={store.objPage.instMunicipal} onChange={(e) => store.objPage.instMunicipal = e.value} style={{ width: '100%' }}
                  />
                </div>
                <div className='p-col-12 p-lg-6 p-xl-6'>
                  <InputBase type='text' label='Razão Social' placeholder='Digite aqui' value={store.objPage.razaoSocial} onChange={(e) => { store.objPage.razaoSocial = e.currentTarget.value.toUpperCase() }} />
                </div>
                <div className='p-col-12 p-lg-6 p-xl-6'>
                  <InputBase type='text' label='Nome Fantasia' placeholder='Digite aqui' value={store.objPage.nomeFantasia} onChange={(e) => { store.objPage.nomeFantasia = e.currentTarget.value.toUpperCase() }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="card p-mt-3">
          <div className="p-ml-3">
            <span className='lable-lista'>Ficha do endereço</span>
          </div>
          <div className="p-grid p-p-3">
            <div className='p-field p-col-12 p-lg-4 p-xl-4'>
              <label htmlFor="">CEP</label>
              <InputMask mask='99999-999' placeholder='99999-999' type='text'
                value={store.objPage.cep} onChange={(e) => store.objPage.cep = e.value} style={{ width: '100%' }}
              />
            </div>
            <div className='p-col-12 p-lg-9 p-xl-9'>
              <InputBase type='text' label='Logradouro' placeholder='Digite aqui sua rua' value={store.objPage.logradouro} onChange={(e) => { store.objPage.logradouro = e.currentTarget.value.toUpperCase() }} />
            </div>
            <div className='p-col-12 p-lg-2 p-xl-2'>
              <InputBase type='text' label=' Número' placeholder='Digite número' value={store.objPage.numero} onChange={(e) => { store.objPage.numero = e.currentTarget.value }} />
            </div>
            <div className='p-col-12 p-lg-4 p-xl-4'>
              <InputBase type='text' label='Cidade' placeholder='Digite aqui cidade' value={store.objPage.cidade} onChange={(e) => { store.objPage.cidade = e.currentTarget.value.toUpperCase() }} />
            </div>
            <div className='p-col-12 p-lg-5 p-xl-5'>
              <InputBase type='text' label='Bairro' placeholder='Digite aqui bairro' value={store.objPage.bairro} onChange={(e) => { store.objPage.bairro = e.currentTarget.value.toUpperCase() }} />
            </div>
            <div className='p-field p-col-12 p-lg-2 p-xl-2 p-mt-1'>
              <label htmlFor="" style={{ width: '100%' }}>UF</label>
              <Dropdown className='' value={selectedUF} options={Ufs.estados} onChange={onUFChange} optionLabel="name" placeholder="Escolha o estado" style={{ zIndex: '99' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="card p-mt-3">
        <div className="p-ml-3">
          <span className='lable-lista'>Ficha de contato</span>
        </div>
        <div className="p-grid p-p-3">
          <div className='p-col-12 p-lg-6 p-xl-6'>
            <InputBase type='text' label='E-mail principal' placeholder='Digite o e-mail' value={store.objPage.emailPrincipal} onChange={(e) => { store.objPage.emailPrincipal = e.currentTarget.value }} />
          </div>
          <div className='p-col-12 p-lg-6 p-xl-6'>
            <InputBase type='text' label='E-mail auxiliar' placeholder='Digite o e-mail' value={store.objPage.emailSegundario} onChange={(e) => { store.objPage.emailSegundario = e.currentTarget.value }} />
          </div>
          <div className='p-field p-col-12 p-lg-3 p-xl-3'>
            <label htmlFor="">Celular-1</label>
            <InputMask mask="(99) 9.9999-9999" placeholder='(99) 9.9999-9999' type='text' className='' style={{ width: '100%' }} value={store.objPage.celular1} onChange={(e) => { store.objPage.celular1 = e.value }} />
          </div>
          <div className='p-field p-col-12 p-lg-3 p-xl-3'>
            <label htmlFor="">Celular-2</label>
            <InputMask mask="(99) 9.9999-9999" placeholder='(99) 9.9999-9999' type='text' className='' style={{ width: '100%' }} value={store.objPage.celular2} onChange={(e) => { store.objPage.celular2 = e.value }} />
          </div>
          <div className='p-field p-col-12 p-lg-3 p-xl-3'>
            <label htmlFor="">Telefone</label>
            <InputMask mask="(99) 9999-9999" placeholder='(99) 9999-9999' type='text' className='' style={{ width: '100%' }} value={store.objPage.foneFixo} onChange={(e) => { store.objPage.foneFixo = e.value }} />
          </div>
        </div>
      </div>
      <div className="p-text-right p-mt-3">
        <ButtonBase icon='pi pi-check' label='SALVAR' className="p-button-success p-pr-6 p-pl-6" onClick={onValidaCnpj} />
      </div>
    </div>
    <ModalLoad visible={modalLoad} />
    <Toast ref={msg} />
  </Container>;
}
export default observer(Loja);