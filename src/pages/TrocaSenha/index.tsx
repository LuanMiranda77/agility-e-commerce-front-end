import React, { useContext, useState, useRef } from "react"

import { Container } from './styles';
import { observer } from 'mobx-react-lite';
import TrocaSenhaStore from "../../stores/TrocaSenhaStore"
import { InputBase } from "../../components/InputBase";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { ButtonBase } from "../../components/ButtonBase";
import { ModalLoad } from "../../components/ModalLoad";
import { Toast } from "primereact/toast";
import { Divider } from "@material-ui/core";

/**
*@Author
*@Issue
*/

const TrocaSenha: React.FC = () => {
  const store = useContext(TrocaSenhaStore);
  const msg = useRef<Toast>(null);
  const [modalLoad, setModalLoad] = useState(false);

  const onSave = () => {

  }

  return <Container>
    <HeaderAdmin />
    <div className="top p-col-12">
      <div className="card p-p-3 p-shadow-2">
        <div>
        <i className="pi pi-key" style={{'fontSize': '1.5em'}}></i>
        <label htmlFor="" className="title-label p-ml-2  p-text-bold">Troca de senha</label>
        </div>
        <Divider />
        <div className=" p-col-12 p-lg-4 p-xl-4">
          <InputBase type='text' label='Senha atual' placeholder="Digite sua senha" />
        </div>
        <div className=" p-col-12 p-lg-4 p-xl-4">
          <InputBase type='text' label='Nova senha' placeholder="Digite sua nova senha" />
        </div>
        <div className=" p-col-12 p-lg-4 p-xl-4">
          <InputBase type='text' label='Confirmar nova senha' placeholder="Confirmar sua senha" />
        </div>
      </div>
      <div className="p-text-right p-mt-4">
        <ButtonBase icon='pi pi-check' label='SALVAR' className="p-button-success p-pr-3 p-pl-3" onClick={onSave} />
      </div>
    </div>
    <ModalLoad visible={modalLoad} />
    <Toast ref={msg} />
  </Container>;
}
export default observer(TrocaSenha);