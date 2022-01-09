import React, { useContext, useEffect, useState, useRef } from "react"

import { Container } from './styles';
import { observer } from 'mobx-react-lite';
import EnderecoStore from "../../stores/EnderecoStore"
import { InputBase } from "../../components/InputBase";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { ButtonBase } from "../../components/ButtonBase";
import { ModalLoad } from "../../components/ModalLoad";
import { Toast } from "primereact/toast";
import { Divider } from "@material-ui/core";
import { Badge } from 'primereact/badge';
import { FormEndereco } from "./form"

/**
*@Author
*@Issue
*/

const Endereco: React.FC = () => {
  const store = useContext(EnderecoStore);
  const msg = useRef<Toast>(null);
  const [modalLoad, setModalLoad] = useState(false);
  const [modalDialog, setModalDialog] = useState(false);

  const hideDialog = () => {
    setModalDialog(false);
  }

  const lista = [
    { id: 1, nome: 'Kaka', celular: '(83) 9.9638-6694', endereco: 'RUA LEOPOLDINO JOSE DA SILVA, 14, TERREO - NA ALEIXO FERRAGENS Monteiro-Paraíba 58500000', padrao: true },
    { id: 1, nome: 'Kaka', celular: '(83) 9.9638-6694', endereco: 'RUA LEOPOLDINO JOSE DA SILVA, 14, TERREO - NA ALEIXO FERRAGENS Monteiro-Paraíba 58500000', padrao: false }
  ];

  const enderecos =
    lista.map((e) =>
      <div key={e.id} className="p-mt-4">
        <div className="p-grid">
          <div className="p-col-12 p-lg-9 p-xl-9">
            <div className="p-p-2">
              <label htmlFor="" className="p-mr-2 p-text-bold">
                <span className="lable-lista p-mr-2 p-text-bold">Nome completo:</span>
                {e.nome}
              </label>
              {e.padrao ? <Badge value="Padrão" severity="success"></Badge> : ''}
            </div>
            <div className="p-p-2">
              <label htmlFor="" className="p-mr-2 p-text-bold">
                <span className="lable-lista p-mr-2 p-text-bold">Telefone:</span>
                {e.celular}
              </label>
            </div>
            <div className="p-p-2">
              <label htmlFor="" className="p-mr-2 p-text-bold">
                <span className="lable-lista p-mr-2 p-text-bold">Endereço:</span>
                {e.endereco}
              </label>
            </div>
          </div>
          <div className="p-col-12 p-lg-3 p-xl-3 p-text-center">
            <ButtonBase icon='pi pi-pencil' label='Editar' className="p-button-success p-pr-6 p-pl-6 p-mb-3" />
            <ButtonBase icon='pi pi-trash' label='Remover' className="p-button-danger p-pr-5 p-pl-5 p-mb-3" />
            {e.padrao ? '' : <ButtonBase icon='pi pi-star' label='Definir padrão' className="p-button-warning p-pr-2 p-pl-2" />}
          </div>
        </div>
        <Divider />
      </div>
    );


  const onSave = () => {

  }

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
            <ButtonBase icon='pi pi-plus' label='Adicionar' className="p-button-success p-pr-3 p-pl-3" onClick={() => setModalDialog(true)} />
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
    <ModalLoad visible={modalLoad} />
    <Toast ref={msg} />
    <FormEndereco visible={modalDialog} closeFuncion={hideDialog} store={store} />
  </Container>;
}
export default observer(Endereco);