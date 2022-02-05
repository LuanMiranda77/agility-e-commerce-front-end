import React, { useContext, useEffect, useRef,  useState  } from "react"

import PagoConfigStore  from "../../stores/PagoConfigStore"
import { Divider } from "@material-ui/core";
import { observer } from 'mobx-react-lite';
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import iconChave from '../../assets/icon-chave.svg';
import iconPago from '../../assets/icon-pago.svg';
import { ButtonBase } from "../../components/ButtonBase";
import { HeaderAdmin } from "../../components/HeaderAdmin";
import { InputBase } from "../../components/InputBase";
import { ModalLoad } from "../../components/ModalLoad";
import { Container } from './styles';
import {ConfigPagamentoService} from '../../services/ConfigPagamentoService/ConfigPagementoService'
import { Utils } from "../../utils/utils";


/**
*@Author
*@Issue
*/

const PagoConfig: React.FC = () => {
  const store = useContext(PagoConfigStore);
  const msg = useRef<Toast>(null);
  const [modalLoad, setModalLoad] = useState(false);
  const [option, setSelectedOption] = useState("S");
  const options = [{ value: 'S', label: 'Ativo' }, { value: 'N', label: 'Inativo' }];
  const configPagamentoService = new ConfigPagamentoService();

  useEffect(() => {
    configPagamentoService.get().then(data =>{
        store.load(data);
        setSelectedOption(data.status);
    }
    ).catch(error => {
      Utils.messagemShow(msg, 'error', 'Erro de carregamento', "😱 "+error.mensagemUsuario, 5000);
    });
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  
  const onChangeOption = (option: any) => {
    setSelectedOption(option.value);
    store.objPage.status = option.value;
  }

  const onSave = () => {
    setModalLoad(true);
    configPagamentoService.post(store.objPage).then(data =>{
      setModalLoad(false);
      Utils.messagemShow(msg, 'success', 'Salvo', '😃 ' + data, 5000);
    }).catch(error =>{
      setModalLoad(false);
      Utils.messagemShow(msg, 'error', 'Erro no salvar', "😱 "+error.mensagemUsuario, 5000);
    });

  }



  return <Container>
    <HeaderAdmin />
    <div className="p-col-12 top">
      <div className="p-grid card-amarelo">
        <div className="p-mr-4">
          <img src={iconPago} alt="logo" />
        </div>
        <div className="p-mt-2">
          <h2 className="p-mb-2">Olá! Antes de mais,</h2>
          <h2>configure suas credencias para receber pagamentos com Mercado Pago</h2>
        </div>
      </div>
      <div className="p-col-12">
        <div className="p-grid center">
          <div className="card" >
            <div className="p-grid title-label">
              <img src={iconChave} alt="logo" style={{ width: '4rem' }} />
              <h2>CREDENCIAIS</h2>
            </div>
            <Divider />
            <div className="p-p-3 p-mt-3">
              <div>
                <span className='lable-lista'>Informações de credenciamento</span>
              </div>
              <div className='p-mt-2'>
                <div className='p-p-2 p-grid'>
                  <div className='p-col-12 p-lg-6 p-xl-6'>
                    <InputBase type='text' label='Public Key' autoComplete="off" placeholder='Cole aqui Public Key' value={store.objPage.public_key} onChange={(e) => { store.objPage.public_key = e.currentTarget.value }} />
                  </div>
                  <div className='p-col-12 p-lg-6 p-xl-6'>
                    <InputBase type='password' label='Access Token' autoComplete="off" placeholder='Cole aqui Access Token' value={store.objPage.access_token} onChange={(e) => { store.objPage.access_token = e.currentTarget.value }} />
                  </div>
                </div>
                <div className='p-p-2 p-grid'>
                <div className='p-col-12 p-lg-6 p-xl-6'>
                    <InputBase type='text' label='Client ID' autoComplete="off" placeholder='Cole aqui Client ID' value={store.objPage.client_id} onChange={(e) => { store.objPage.client_id = e.currentTarget.value }} />
                  </div>
                  <div className='p-col-12 p-lg-4 p-xl-4'>
                    <InputBase type='password' label='Client Secret' autoComplete="off" placeholder='Cole aqui Client Secret' value={store.objPage.client_secret} onChange={(e) => { store.objPage.client_secret = e.currentTarget.value }} />
                  </div>
                  <div className='p-field p-col-12 p-lg-2 p-xl-2 p-mt-1'>
                    <label htmlFor="" style={{ width: '100%' }}>Status</label>
                    <Dropdown className='' value={option} options={options} onChange={onChangeOption} optionLabel="label" placeholder="Status" style={{ zIndex: '99' }} />
                  </div>
                </div>
                <div className="style-div">
                  <span className="p-text-bold" style={{ color: 'red' }}>Atenção use esta url para os campos com o mesmo nome no Mercado Pago</span>
                  <div>
                    <div className="lable-lista p-text-bold p-mt-2">
                      <span>Configuração de notificações</span>
                    </div>
                    <span className='p-text-bold'>URI Modo de teste: </span>
                    <span className=''>https://integrador-agilityecommerce.herokuapp.com/api/m_pago/notificacoes</span>
                  </div>
                  <div>
                    <div className="p-text-bold lable-lista p-mt-2">
                      <span>Configuração de notificações</span>
                    </div>
                    <span className='p-text-bold'>URL Modo produção: </span>
                    <span className=''>https://integrador-agilityecommerce.herokuapp.com/api/m_pago/notificacoes</span>
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
    </div>
    <ModalLoad visible={modalLoad} />
    <Toast ref={msg} />
  </Container>;
}
export default observer(PagoConfig);