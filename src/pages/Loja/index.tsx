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

/**
*@Author
*@Issue
*/

const Loja: React.FC = () => {
  const store = useContext(LojaStore);
  const msg = useRef<Toast>(null);
  const [modalLoad, setModalLoad] = useState(false);
  const [option, setSelectedOption] = useState("S");
  const options = [{ value: 'S', label: 'Ativo' }, { value: 'N', label: 'Inativo' }];

  useEffect(() => {
    // marketplaceService.get().then(data =>{
    //     store.load(data);
    //     setSelectedOption(data.status);
    // }
    // ).catch(error => {
    //   Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
    // });
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  
  const onChangeOption = (option: any) => {
    setSelectedOption(option.value);
    // store.objPage.status = option.value;
  }

  const onSave = () => {
    setModalLoad(true);
    // marketplaceService.post(store.objPage).then(data =>{
    //   setModalLoad(false);
    //   Utils.messagemShow(msg, 'success', 'Salvo', '😃 ' + data, 5000);
    // }).catch(error =>{
    //   setModalLoad(false);
    //   Utils.messagemShow(msg, 'error', 'Erro no salvar', "😱 "+error.mensagemUsuario, 5000);
    // });

  }

  return <Container>
    <HeaderAdmin />
    <div className="p-col-12 top">
      <div className="card">
        <div className="title-label">
          <i className="title-label pi pi-home p-mr-2"></i>
          <label  htmlFor="">Informações da Loja</label>
          <Divider />
        </div>
        <div className="p-col-12">
            <div className="p-p-3 p-mt-3">
              <div>
                <span className='lable-lista'>Ficha da empresa</span>
              </div>
              <div className='p-mt-2'>
                <div className='p-p-2 p-grid'>
                  <div className='p-col-12 p-lg-6 p-xl-6'>
                    <InputBase type='text' label='CNPJ' autoComplete="off" placeholder='Digite aqui o cnpj' value={store.objPage.CNPJ} onChange={(e) => { store.objPage.CNPJ = e.currentTarget.value }} />
                  </div>
                  <div className='p-col-12 p-lg-6 p-xl-6'>
                    <InputBase type='password' label='Client Secret' autoComplete="off" placeholder='Cole aqui Client Secret' value={store.objPage.nomeFantasia} onChange={(e) => { store.objPage.nomeFantasia = e.currentTarget.value }} />
                  </div>
                  <div className='p-field p-col-12 p-lg-2 p-xl-2 p-mt-1'>
                    <label htmlFor="" style={{ width: '100%' }}>Status</label>
                    <Dropdown className='' value={option} options={options} onChange={onChangeOption} optionLabel="label" placeholder="Status" style={{ zIndex: '99' }} />
                  </div>
                </div>
              </div>
              <div className="p-text-right p-mt-3">
                <ButtonBase icon='pi pi-check' label='SALVAR' className="p-button-success p-pr-6 p-pl-6" onClick={() => onSave()} />
              </div>
            </div>
          </div>
      </div>
    </div>

  </Container>;
}
export default observer(Loja);