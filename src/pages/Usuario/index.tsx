import React, { useContext, useEffect, useState, useRef } from "react"

import { Container } from './styles';
import { observer } from 'mobx-react-lite';
import UsuarioStore from "../../stores/UsuarioStore"
import icon_usuario from "../../assets/icon-user.svg"
import { Divider } from "@material-ui/core";
import { InputBase } from "../../components/InputBase";
import { ModalLoad } from "../../components/ModalLoad";
import { InputMask } from 'primereact/inputmask';
import InputDateBase from "../../components/InputDateBase";
import { RadioButton } from 'primereact/radiobutton';
import { ButtonBase } from "../../components/ButtonBase";
import { Logo } from "../../components/logo";
import { InputGroup } from "../../components/InputGroup";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Utils } from "../../utils/utils";
import { Checkbox } from "primereact/checkbox";
import { Tooltip } from 'primereact/tooltip';
import { UsuarioService } from "../../services/UsuarioService/usuarioService";
import { Toast } from "primereact/toast";
import { UtilsDate } from "../../utils/utilsDate";

/**
*@Author Luan Miranda
*@Issue AE-28
*/

const Usuario: React.FC = () => {
  const store = useContext(UsuarioStore);
  const msg = useRef<Toast>(null);
  const [modalLoad, setModalLoad] = useState(false);
  const [erroForm, setErroForm] = useState('');
  const [maskCPF, setMaskCPF] = useState('block');
  const [maskCNPJ, setMaskCNPJ] = useState('none');
  const [checked, setChecked] = useState<boolean>(false);
  const [checkedCNPJ, setCheckedCNPJ] = useState<boolean>(false);
  const usuarioService = new UsuarioService();
  const passwordHeader = <h6>Escolha uma senha</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="p-mt-2">Sugestões</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
        <li>Pelo menos uma letra minúscula</li>
        <li>Pelo menos uma maiúscula</li>
        <li>Pelo menos um numérico</li>
        <li>Mínimo 6 caracteres</li>
      </ul>
    </React.Fragment>
  );

  const getFormErrorMessage = (tipo: string) => {
    return erroForm != '' ? <small className="p-error">{'Campo ' + tipo + ' é obrigatório'}</small> : '';
  };

  const setMask = (e: any) => {
    setCheckedCNPJ(e);

    if (e) {
      setMaskCNPJ('block');
      setMaskCPF('none');
    } else {
      setMaskCNPJ('none');
      setMaskCPF('block');
    }
  };

  const onValidaCpfCnpj = (e: string) => {
    let t = e.replace(/[^\d]+/g, '');
    if (t.length === 14 && checkedCNPJ) {
      store.cliente.cpfCnpj = e;
      if (Utils.isValidCNPJ(e) === false) {
        store.objPag.isFormValidCPF = false;
      } else {
        store.objPag.isFormValidCPF = true;
      }
    }
    else if (t.length === 11) {
      store.cliente.cpfCnpj = e;
      if (Utils.validCPF(e) === false) {
        console.log('invalido');
        store.objPag.isFormValidCPF = false;
      } else {
        store.objPag.isFormValidCPF = true;
      }
    }
    else if (t.length === 0) {
      store.resetForm();
      store.objPag.isFormValidCPF = true;
    }
  }

  const onSave = () => {

    console.log(store.cliente.cpfCnpj);
    if (store.isValidaFormBranco()) {
      setErroForm(store.isValid());
      if (erroForm === '' && store.objPag.isFormValidCPF) {
        setModalLoad(true);
        // store.cliente.dataNascimento = UtilsDate.formatByYYYYMMDDSemHora(store.cliente.dataNascimento);
        usuarioService.post(store.cliente).then((result) => {
          setModalLoad(false);
          Utils.messagemShow(msg, 'success', '😃 Cadastrado com sucesso!', 'Cadastrado com sucesso!', 5000);
        })
          .catch((error) => {
            setModalLoad(false);
            setErroForm('');
            store.objPag.isFormValidCPF = true;
            Utils.messagemShow(msg, 'error', 'Erro no salvar', error.mensagemUsuario, 5000);
          });
      } else {
        setErroForm('');
        store.objPag.isFormValidCPF = true;
        Utils.messagemShow(msg, 'error', 'Erro ao salvar registro', '😋 Ops algo deu errado', 5000);
      }
    }
  };

  return <Container>
    <div className="p-col-12">
      <Logo className="" />
    </div>
    <div className="p-col-12">
      <div className="card p-col-12 p-shadow-2">
        <div className="p-grid p-p-2">
          <div>
            <img src={icon_usuario} alt="logo-icon" />
          </div>
          <div className="p-mt-3 p-col-12 p-lg-8 p-xl-8" style={{ fontSize: '22px' }}>
            <label className="title-label p-text-bold" htmlFor="titulo">Cadastro de  Usuário</label>
          </div>
          <div className="p-col-12 p-lg-3 p-xl-3  p-text-right p-mt-3">
            <Checkbox inputId="binary" checked={checked} onChange={e => setChecked(e.checked)} />
            <span className="p-ml-2">Sejá o comprador em atacado</span>
            <Tooltip target=".custom-target-icon" />
            <i className="custom-target-icon p-ml-1 pi pi-exclamation-circle" data-pr-tooltip="Um cliente atacadista tem preços exclusivos" data-pr-position="top" data-pr-at="right+5 top" data-pr-my="left center-2" style={{ cursor: 'pointer' }}></i>
            {checked ? <small className="p-error">{'ATENÇÂO: Cadastro será analisado para aprovação'}</small> : ''}
          </div>
        </div>
        <Divider />
        <div className="p-p-2 p-mt-3">
          <div className="">
            <label className="title-label p-text-bold" htmlFor="dados">Dados pessoais</label>
            <div className="p-p-2">
              <Checkbox inputId="binary" checked={checkedCNPJ} onChange={e => setMask(e.checked)} />
              <span className="p-ml-2">Usar CNPJ para cadastro</span>
            </div>
          </div>

          <div className="p-grid p-p-3">
            <div className='p-field p-col-12 p-lg-3 p-xl-2 p-mt-1' style={{ display: `${maskCNPJ}` }}>
              <label htmlFor="">CNPJ<span className="p-ml-1" style={{ color: 'red' }}>*</span></label>
              <InputMask mask='99.999.999/9999-99' placeholder='Digite o seu CNPJ' type='text'
                className={classNames({ 'p-invalid': !store.objPag.isFormValidCPF && store.cliente.cpfCnpj === '' })}
                value={store.cliente.cpfCnpj} onChange={(e) => { onValidaCpfCnpj(e.value) }} style={{ width: '100%' }}
              />
              {!store.objPag.isFormValidCPF && store.cliente.cpfCnpj === '' && checkedCNPJ ? <small className="p-error">{'Campo CNPJ é obrigatório'}</small> : ''}
              {!store.objPag.isFormValidCPF && store.cliente.cpfCnpj !== '' && checkedCNPJ ? <small className="p-error">{'CNPJ inválido'}</small> : ''}
            </div>
            <div className='p-field p-col-12 p-lg-3 p-xl-2 p-mt-1' style={{ display: `${maskCPF}` }}>
              <label htmlFor="">CPF<span className="p-ml-1" style={{ color: 'red' }}>*</span></label>
              <InputMask mask='999.999.999-99' placeholder='Digite o seu CPF' type='text'
                className={classNames({ 'p-invalid': !store.objPag.isFormValidCPF && store.cliente.cpfCnpj === '' })}
                value={store.cliente.cpfCnpj} onChange={(e) => { onValidaCpfCnpj(e.value) }} style={{ width: '100%' }}
              />
              {!store.objPag.isFormValidCPF && store.cliente.cpfCnpj === '' ? <small className="p-error">{'Campo CPF é obrigatório'}</small> : ''}
              {!store.objPag.isFormValidCPF && store.cliente.cpfCnpj !== '' ? <small className="p-error">{'CPF inválido'}</small> : ''}
            </div>
            <div className='p-col-12 p-lg-8 p-xl-8'>
              <InputBase className={classNames({ 'p-invalid': !store.objPag.isFormValidNome && store.usuario.nome === '' })} type='text' label='Nome completo' placeholder="Digite seu nome" onChange={(e) => { store.usuario.nome = e.currentTarget.value }} required />
              {!store.objPag.isFormValidNome && store.usuario.nome === '' ? <small className="p-error">{'Campo nome é obrigatório'}</small> : ''}
            </div>
            <div className='p-sm-12 p-md-12 p-lg-2 p-xl-2 p-mt-1'>
              <InputDateBase label="Data de nascimento" value={store.cliente.dataNascimento} setFunction={store.setDataNascimento} />
            </div>
          </div>
          <div className="p-grid p-p-3">
            <div className='p-field p-col-12 p-lg-2 p-xl-2'>
              <label htmlFor="">Telefone</label>
              <InputMask mask="(99) 9999-9999" placeholder='(99) 9999-9999' type='text' className='' style={{ width: '100%' }} value={store.cliente.telefone} onChange={(e) => { store.cliente.telefone = e.value }} />
            </div>
            <div className='p-field p-col-12 p-lg-2 p-xl-2'>
              <label htmlFor="">Celular<span className="p-ml-1" style={{ color: 'red' }}>*</span></label>
              <InputMask mask="(99) 9.9999-9999" placeholder='(99) 9.9999-9999' type='text' className={classNames({ 'p-invalid': !store.objPag.isFormValidCelular && store.cliente.celular === '' })} style={{ width: '100%' }} value={store.cliente.celular} onChange={(e) => { store.cliente.celular = e.value }} />
              {!store.objPag.isFormValidCelular && store.cliente.celular === '' ? <small className="p-error">{'Campo celular é obrigatório'}</small> : ''}
            </div>
            <div className='p-field p-col-12 p-lg-2 p-xl-4'>
              <label htmlFor="">Sexo</label>
              <div className='p-grid p-col-12'>
                <div className="p-field-radiobutton p-col-4">
                  <RadioButton inputId="masculino" name="masculino" value="M" onChange={(e) => (store.cliente.sexo = e.value)} checked={store.cliente.sexo === 'M'} />
                  <small className='p-ml-2 p-text-bold' >masculino</small>
                </div>
                <div className="p-field-radiobutton p-col-4">
                  <RadioButton inputId="feminino" name="feminino" value="F" onChange={(e) => (store.cliente.sexo = e.value)} checked={store.cliente.sexo === 'F'} />
                  <small className='p-ml-2 p-text-bold'>feminino</small>
                </div>
                <div className="p-field-radiobutton p-col-4">
                  <RadioButton inputId="outros" name="outros" value="O" onChange={(e) => (store.cliente.sexo = e.value)} checked={store.cliente.sexo === 'O'} />
                  <small className='p-ml-2 p-text-bold'>outros</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-mt-3">
        <div className="card p-col-12 p-p-3 p-shadow-2">
          <label className="title-label p-text-bold" htmlFor="dados">Dados do acesso</label>
          <div className="p-p-3 p-col-12 p-lg-5 p-xl-5">
            <div className="p-field">
              <InputBase className={classNames({ 'p-invalid': !store.objPag.isFormValidEmail })} required label="E-mail" type="text" placeholder="Digite seu e-mail" value={store.usuario.email} onChange={(e) => (store.usuario.email = e.currentTarget.value)} />
              {!store.objPag.isFormValidEmail && !erroForm ? <small className="p-error">{'Campo e-mail é obrigatório'}</small> : ''}
              {!store.objPag.isFormValidEmail && erroForm ? <small className="p-error">{store.isValid()}</small> : ''}
            </div>
            <div className="p-field">
              <label htmlFor="">Senha<span className="p-ml-1" style={{ color: 'red' }}>*</span></label>
              <span className="p-float-label">
                <Password id="password" name="password" placeholder="Digite sua senha" value={store.usuario.password} onChange={(e) => (store.usuario.password = e.currentTarget.value)} toggleMask
                  className={classNames({ 'p-invalid': !store.objPag.isFormValidSenha })} header={passwordHeader} footer={passwordFooter} />
              </span>
              {!store.objPag.isFormValidSenha && store.usuario.password === '' ? <small className="p-error">{'Campo senha é obrigatório'}</small> : ''}
              {!store.objPag.isFormValidSenha && erroForm ? <small className="p-error">{erroForm}</small> : ''}
            </div>
            <div className="p-field">
              <label htmlFor="">Confirmar senha<span className="p-ml-1" style={{ color: 'red' }}>*</span></label>
              <span className="p-float-label">
                <Password id="confirme-password" name="confirme-password" placeholder="Confirme sua senha" value={store.objPag.senha} onChange={(e) => (store.objPag.senha = e.currentTarget.value)} toggleMask
                  className={classNames({ 'p-invalid': !store.objPag.isFormValidSenha })} />
              </span>
              {!store.objPag.isFormValidSenha && store.objPag.senha === '' ? <small className="p-error">{'Campo senha é obrigatório'}</small> : ''}
              {!store.objPag.isFormValidSenha && erroForm ? <small className="p-error">{erroForm}</small> : ''}
            </div>
          </div>
        </div>
      </div>
      <div className="p-mt-3 p-text-right">
        <ButtonBase icon='pi pi-check' label='SALVAR' className="p-button-success p-pr-3 p-pl-3" onClick={onSave} />
      </div>
    </div>
    <ModalLoad visible={modalLoad} />
    <Toast ref={msg} />
  </Container>;
}
export default observer(Usuario);