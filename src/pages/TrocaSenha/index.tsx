import React, { useContext, useState, useRef } from "react";
import { useHistory } from 'react-router-dom';

import { Container } from './styles';
import { observer } from 'mobx-react-lite';
import TrocaSenhaStore from "../../stores/TrocaSenhaStore";
import { InputBase } from "../../components/InputBase";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { ButtonBase } from "../../components/ButtonBase";
import { ModalLoad } from "../../components/ModalLoad";
import { Toast } from "primereact/toast";
import { Divider } from "@material-ui/core";
import { Utils } from "../../utils/utils";
import { LoginService } from "../../services/LoginService/LoginService";

/**
*@Author
*@Issue
*/

const TrocaSenha: React.FC = () => {
  const store = useContext(TrocaSenhaStore);
  const msg = useRef<Toast>(null);
  const [modalLoad, setModalLoad] = useState(false);
  const history = useHistory();
  const loginService = new LoginService();

  const onSave = () => {
    setModalLoad(true);
    const userLogado = Utils.getClienteLocal().usuario;
    if(testeSenha()){
      userLogado.password = store.objPage.nova;
      loginService.trocarSenha(userLogado).then(data => {
        Utils.logout();
        setModalLoad(false);
        store.new();
        Utils.messagemShow(msg, 'success', 'Senha', '😃 Alterado com sucesso!', 5000);
        history.push("/login");
      }).catch(error => {
        setModalLoad(false);
        Utils.messagemShow(msg, 'error', 'Erro na gravação', "😭 "+error.mensagemUsuario, 5000);
      });
    }
  }

  const testeSenha = () =>{
    if(store.objPage.nova !== '' && store.objPage.confirmar !== ''){
      if(store.objPage.nova !== store.objPage.confirmar){
        Utils.messagemShow(msg, 'error', 'Erro na gravação', "😭 As senhas são diferentes", 5000);
        return false;
      }else{
        return true;
      }

    }else if(store.objPage.nova === ''){
      Utils.messagemShow(msg, 'error', 'Erro na gravação', "😭 O campo nova senha está em branco", 5000);
      return false;
    }else if(store.objPage.confirmar === ''){
      Utils.messagemShow(msg, 'error', 'Erro na gravação', "😭 O campo confirmar senha está em branco", 5000);
      return false;
    }

  }

  return <Container>
    <HeaderAdmin />
    <div className="top p-col-12">
      <div className="card p-p-3 p-shadow-2">
        <div>
          <i className="pi pi-key" style={{ 'fontSize': '1.5em' }}></i>
          <label htmlFor="" className="title-label p-ml-2  p-text-bold">Troca de senha</label>
        </div>
        <Divider />
        {/* <div className=" p-col-12 p-lg-4 p-xl-4">
          <InputBase type='text' label='Senha atual' placeholder="Digite sua senha" />
        </div> */}
        <div className=" p-col-12 p-lg-4 p-xl-4">
          <InputBase type='password' label='Nova senha' placeholder="Digite sua nova senha" value={store.objPage.nova} onChange={(e) => store.objPage.nova = e.target.value}/>
        </div>
        <div className=" p-col-12 p-lg-4 p-xl-4">
          <InputBase type='password' label='Confirmar nova senha' placeholder="Confirmar sua senha" value={store.objPage.confirmar} onChange={(e) => store.objPage.confirmar = e.target.value}/>
        </div>
        <div className="p-text-right p-mt-4">
          <ButtonBase icon='pi pi-check' label='SALVAR' className="p-button-success p-pr-6 p-pl-6" onClick={onSave} />
        </div>
      </div>
    </div>
    <ModalLoad visible={modalLoad} />
    <Toast ref={msg} />
  </Container>;
}
export default observer(TrocaSenha);