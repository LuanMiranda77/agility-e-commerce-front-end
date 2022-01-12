import React, { useContext, useEffect, useState, useRef } from "react"

import { Container } from './styles';
import { observer } from 'mobx-react-lite';
import UsuarioStore from "../../stores/UsuarioStore"
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { InputBase } from "../../components/InputBase";
import { Divider } from "primereact/divider";
import { InputMask } from "primereact/inputmask";
import { RadioButton } from "primereact/radiobutton";
import InputDateBase from "../../components/InputDateBase";
import { ButtonBase } from "../../components/ButtonBase";
import { Utils } from "../../utils/utils";
import {ClienteService} from '../../services/ClienteService/clienteService';
import { Toast } from 'primereact/toast';
import { ModalLoad } from "../../components/ModalLoad";

/**
*@Author
*@Issue
*/

const Cliente: React.FC = () => {
  const store = useContext(UsuarioStore);
  const [modalLoad, setModalLoad] = useState(false);
  const user = Utils.getTokenLogin();
  const clienteService = new ClienteService();
  const msg = useRef<Toast>(null);

  useEffect(() => {
    clienteService.get(Number(user?.id)).then(data =>{
        store.load(data);
        Utils.setClienteLocal(data);
        console.log(Utils.getClienteLocal());
      }
      ).catch(error => {
        Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
      });

  }, []);

  const onSave = () =>{
    clienteService.post(store.cliente).then(data =>{
      setModalLoad(true);
      store.load(data);
      Utils.setClienteLocal(data);
      setModalLoad(false);
      Utils.messagemShow(msg, 'success', 'Salvo', '😃 Alterado com sucesso!', 5000);
    }).catch(error =>{
      setModalLoad(false);
      Utils.messagemShow(msg, 'error', 'Erro no salvar', error.mensagemUsuario, 5000);
    });
  }


  return <Container>
    <HeaderAdmin />
    <div className="p-col-12">
      <div className="card p-p-3">
        <h2>Meu Perfil</h2>
        <small>Gerenciar e proteger sua conta</small>
        <br />
        <br />
        <Divider />
        <div className="p-grid p-p-3 p-mt-1">
          <div className="p-col-8">
            <div className="p-grid">
            <div className='p-col-12 p-lg-8 p-xl-8'>
              <InputBase label="Nome" type="text" placeholder="" value={store.cliente.usuario.nome} onChange={(e) => { store.cliente.usuario.nome = e.target.value }}/>
            </div>
            <div className='p-sm-12 p-md-12 p-lg-3 p-xl-3 p-mt-1'>
              <InputDateBase label="Data de nascimento" value={store.cliente.dataNascimento} setFunction={store.setDataNascimento} />
            </div>
            </div>
            <div className='p-col-12 p-lg-5 p-xl-5'>
              <InputBase label="E-mail" type="text" placeholder="" value={store.cliente.usuario.email} onChange={(e) => { store.cliente.usuario.email = e.target.value }} />
            </div>
            <div className="p-grid p-pl-2">
            <div className='p-field p-col-12 p-lg-3 p-xl-3'>
                <label htmlFor="">Celular</label>
                <InputMask mask="(99) 9999-9999" placeholder='(99) 9999-9999' type='text' className='' style={{ width: '100%' }} value={store.cliente.celular} onChange={(e) => { store.cliente.celular = e.value }} />
              </div>
              <div className='p-field p-col-12 p-lg-3 p-xl-3'>
                <label htmlFor="">Telefone</label>
                <InputMask mask="(99) 9999-9999" placeholder='(99) 9999-9999' type='text' className='' style={{ width: '100%' }} value={store.cliente.telefone} onChange={(e) => { store.cliente.telefone = e.value }} />
              </div>
              <div className='p-field p-col-12 p-lg-6 p-xl-6'>
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
          <Divider className="divider" layout="vertical" />
          <div className="p-col-3">
            <div>
                <h3>Tipo do contrato</h3>
                <h2 className="p-mt-2" style={{color:'var(--secondary)'}}>{store.cliente.tipo}</h2>
              </div>
          </div>
        </div>
        <div className="p-col-12 p-text-right">
        <ButtonBase className="p-button-success p-pl-5 p-pr-5" label="SALVAR" icon="pi pi-check" onClick={onSave} />
        </div>
      </div>
    </div>
    <ModalLoad visible={modalLoad} />
    <Toast ref={msg} />
  </Container>;
}
export default observer(Cliente);