import { Divider } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { InputBase } from '../../components/InputBase';
import CheckoutStore from '../../stores/CheckoutStore';
import { Container } from './styles';
import { RadioButton } from 'primereact/radiobutton';
import { InputMask } from 'primereact/inputmask';
import { Utils } from '../../utils/utils';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ButtonBase } from '../../components/ButtonBase';
import { ListItem } from '../../components/ListItem';
import { Toast } from 'primereact/toast';
import { CheckoutService } from '../../services/CheckoutService/checkoutService';
import config from '../../config/index.json'
import { Route, useHistory } from 'react-router-dom';
import PagePix from './pagepix';

const Checkout: React.FC = () => {
  const store = useContext(CheckoutStore);
  const frentePAc = 35.00;
  const frenteSedex = 80.00;
  const [qr_code_base64, setQRCode64] = useState('');
  const [qr_code, setQRCode] = useState('');
  const [dt_expired, setDataExpiried] = useState('');


  const msg = useRef<Toast>(null);
  const [tipoFrete, setTipoFrete] = useState('PAC');
  const [tipoPagamento, setTipoPagamento] = useState('credit_card');
  const [valorFrete, setValorFrete] = useState(frentePAc);
  const [valorCompra, setValorCompra] = useState(100);
  const [totalCompra, setTotalCompra] = useState(valorCompra);
  const PUBLIC_KEY = '';
  const [modalDialog, setModalDialog] = useState(false);
  const [selectedParcela, setSelectedParcela] = useState<any>(null);
  const chekoutService = new  CheckoutService();
  const parcelas = [
    { name: '1x parcelas', code: '1' },
    { name: '2x parcelas', code: 'RM' },
  ];
  const produtos = [
    { id: 1, name: 'Reologio ouro', quant: 1, valor: 70.00},
    { id: 2, name: 'Reologio prata', quant: 1, valor: 30.00 },
  ];

  useEffect(() =>{
    totalizador();
  },[])

  const totalizador = () => {
    let res = valorCompra + valorFrete;
    setTotalCompra(res);
    store.checkout.transaction_amount = res;
  };

  const finalizarPagamento = () =>{
    if(tipoPagamento === config.BANCO_MERC_PAGO || tipoPagamento === 'pix'){
      store.checkout.type = 'BOLETO';
    }
    store.checkout.description = "Blue shirt"
    store.checkout.installments =1
    store.checkout.transaction_amount = valorCompra;
    store.checkout.issuer_id = "310"
    store.checkout.payer = {
      email: "test@test.com",
      first_name: 'Teste', 
      last_name: 'Miranda',
      identification: {
        type: 'CPF',
        number: '40601032845'
      }
    }
    // store.checkout.address = {
    //   zip_code: "06233200",
    //   street_name: "Av. das Nações Unidas",
    //   street_number: "3003",
    //   neighborhood: "Bonfim",
    //   city: "Osasco",
    //   federal_unit: "SP"
    // }
    store.checkout.payment_method_id = tipoPagamento;
    chekoutService.enviarPagemento(store.checkout).then(data =>{
      Utils.messagemShow(msg,'success','Sucesso', 'pagamento gerado',5000);
      console.log(data.response);
      if(tipoPagamento === 'pix'){
        console.log(data.response.point_of_interaction.transaction_data);
        setDataExpiried(data.response.date_of_expiration);
        setQRCode(data.response.point_of_interaction.transaction_data.qr_code);
        setQRCode64(data.response.point_of_interaction.transaction_data.qr_code_base64);
        setModalDialog(true);
        
      }else{
        window.location.replace(data.response.transaction_details.external_resource_url);
      }
    }).catch(error => {
      Utils.messagemShow(msg,'error','Erro enviar pagaemnto', error,5000);
      console.log(error);
    });
  }

  const testFrete = (tipo: string) => {

    if (tipo === 'PAC') {
      setValorFrete(frentePAc);
      setTipoFrete(tipo);
    } else {
      setValorFrete(frenteSedex);
      setTipoFrete(tipo);
    }
    totalizador();
  };

  const listItems = produtos.map((item, id) =>
    <div className='center p-grid p-col-12' style={{ background: 'var(--white)' }}>
          <div className='p-grid p-col-6'>{item.name}</div>
          <div className='p-grid p-col-3'>{item.quant} </div>
          <div className='p-grid p-col-3'>{Utils.formatCurrency(item.valor)}</div>
    </div>
  );

  const hideDialog = () => {
    setModalDialog(false);
}

  return (
    <Container id='form-checkout'>
      <script src="https://sdk.mercadopago.com/js/v2"></script>
      <script>
        const mp = new MercadoPago(PUBLIC_KEY);
      </script>

      <div className='center p-col-12 p-mb-1 p-grid p-shadow-2' style={{ background: 'var(--primary)' }}>
        <div className='p-md-6 p-lg-8 p-xl-8'>
          <i className='title pi pi-shield p-mr-3' />
          <label htmlFor="titulo" className='title p-text-bold p-text-uppercase'>Pagamento do pedido</label>
        </div>
        <div className='p-text-right p-md-6 p-lg-4 p-xl-4'>
          <label htmlFor="id-pedido" className='title p-text-bold p-text-right'>ID:1554656</label>
        </div>
      </div>

      <div className='p-col-12 p-grid p-mb-3'>
        <div className='center p-grid  p-md-6 p-lg-9 p-xl-9 p-mt-3 p-p-2'>

          <div className='card p-md-6 p-lg-12 p-xl-12 p-mb-2 p-p-3'>
            <label htmlFor="endereco" className='label-title p-text-bold'>
              Endereço de entrega
            </label>
            <Divider />
            <br />
            <InputBase label='CEP' placeholder='00000-000' type='text' className='title-second p-mt-1' />
          </div>
          <div className='card p-md-6 p-lg-12 p-xl-12 p-mb-2 p-p-3'>
            <label htmlFor="endereco" className='label-title p-text-bold'>
              Tipo de entrega
            </label>
            <Divider />
            <br />
            <div className='p-grid p-md-6 p-lg-12 p-xl-12 '>
              <div className="p-field-radiobutton p-col-4">
                <RadioButton inputId="PAC" name="PAC" value="PAC" onChange={(e) => testFrete(e.value)} checked={tipoFrete === 'PAC'} />
                <label htmlFor="pac" className='p-text-bold'>
                  <img src="https://logodownload.org/wp-content/uploads/2017/03/pac-correios-logo-9.png" alt="logo" className='img-cartao' />
                  <span style={{ color: 'var(--secondary)' }}>{Utils.formatCurrency(frentePAc)}</span></label>
              </div>
              <div className="p-field-radiobutton p-col-4">
                <RadioButton inputId="SEDEX" name="SEDEX" value="SEDEX" onChange={(e) => testFrete(e.value)} checked={tipoFrete === 'SEDEX'} />
                <label htmlFor="sedex" className='p-text-bold' >
                  <img src="https://d2r9epyceweg5n.cloudfront.net/stores/597/816/rte/sedex-rastreamento-1.jpg" alt="logo" className='img-cartao' />
                  <span style={{ color: 'var(--secondary)' }}>{Utils.formatCurrency(frenteSedex)}</span>
                </label>
              </div>
            </div>

          </div>
          <div className='card p-md-6 p-lg-12 p-xl-12 p-mb-2 p-p-3'>
            <label htmlFor="endereco" className='label-title p-text-bold'>
              Tipo de pagamento
            </label>
            <Divider />
            <br />
            <div className='p-grid p-md-6 p-lg-12 p-xl-12 '>
              <div className="p-field-radiobutton p-col-4">
                <RadioButton inputId="tipo-cartao" name="tipo-cartao" value="credit_card" onChange={(e) => setTipoPagamento(e.value)} checked={tipoPagamento === 'credit_card'} />
                <label htmlFor="cartao" className='p-text-bold' >Cartão</label>
              </div>
              <div className="p-field-radiobutton p-col-4">
                <RadioButton inputId="tipo-boleto" name="tipo-boleto" value={config.BANCO_MERC_PAGO} onChange={(e) => setTipoPagamento(e.value)} checked={tipoPagamento === config.BANCO_MERC_PAGO} />
                <label htmlFor="boleto" className='p-text-bold'>Boleto</label>
              </div>
              <div className="p-field-radiobutton p-col-4">
                <RadioButton inputId="tipo-pix" name="tipo-pix" value="pix" onChange={(e) => setTipoPagamento(e.value)} checked={tipoPagamento === 'pix'} />
                <label htmlFor="pix" className='p-text-bold'>Pix</label>
              </div>
            </div>

            <div className='p-grid p-col-12'>
              <div className='p-field p-md-5 p-lg-6 p-xl-6'>
                <div><label htmlFor="" className='p-text-bold'>Número do cartão</label></div>
                <InputMask mask="9999 9999 9999 9999" placeholder='5555 5555 5555 5555' type='text' className='title-second' style={{ width: '100%' }} />
              </div>
              <div className='p-field p-md-5 p-lg-3 p-xl-3'>
                <div><label htmlFor="" className='p-text-bold'>Válidade</label></div>
                <InputMask mask="99" placeholder='00' type='number' className='title-second' style={{ width: '30%' }} />
                <label className='p-pl-2 p-pr-2'>/</label>
                <InputMask mask="99" placeholder='00' type='number' className='title-second' style={{ width: '30%' }} />
              </div>
              <div className='p-field p-md-2 p-lg-3 p-xl-3'>
                <div><label htmlFor="" className='p-text-bold'>Bandeira</label></div>
                <img src="https://www.visa.com.br/content/dam/VCOM/regional/lac/brazil/media-kits/images/visa-empresarial.png" alt="" className='img-cartao' />
              </div>
              <div className='p-grid p-col-12'>
                <div className='p-field p-md-12 p-lg-6 p-xl-6' >
                  <div><label htmlFor="" className='p-text-bold'>Nome do titular do cartão</label></div>
                  <InputText placeholder='digite o nome que está no cartão' type='text' className='title-second p-mt-1' style={{ width: '100%' }} />
                </div>
                <div className='p-field p-md-12 p-lg-3 p-xl-2'>
                  <div><label htmlFor="" className='p-text-bold'>Cód.de segurança</label></div>
                  <InputMask mask="999" placeholder='123' type='text' className='title-second' style={{ width: '100%' }} />
                </div>
                <div className='p-field p-md-12 p-lg-3 p-xl-4'>
                  <div><label htmlFor="" className='p-text-bold' >Numero de parcelas</label></div>
                  <Dropdown value={selectedParcela} options={parcelas} onChange={(e) => setSelectedParcela(e.value)} optionLabel="name" placeholder="Selecione" style={{ width: '100%' }} />

                </div>

              </div>

            </div>

          </div>
        </div>
        {/* resumo de compra */}
        <div className='resumo-ped p-col-3 p-mt-4 p-p-2' style={{ height: '100%' }}>
          <div className='p-col-12'>
            <label htmlFor="resumo" className='label-title p-text-bold '>
              Resumo da compra
            </label>
            <Divider />
          </div>
          <div className='card center p-grid p-col-12'>
            <div className='p-col-6'><label htmlFor="resumo" className='label-title'>Produto</label></div>
            <div className='p-col-3'><label htmlFor="resumo" className='label-title'>Qtde</label></div>
            <div className='p-col-3'><label htmlFor="resumo" className='label-title'>Preço</label></div>
          </div>
            <ul  className='p-mb-2'>{listItems}</ul>
            {/* <ListItem array={produtos}></ListItem> */}
          <Divider />
          <div className='center p-col-12 p-mb-2 p-mt-2'>
            <div className='p-grid p-col-12 p-mb-1'>
              <div className='p-col-6'><label htmlFor="resumo" className='label-title'>Sub. Total</label></div>
              <div className='p-col-6'><label htmlFor="resumo" className='label-title'>{Utils.formatCurrency(valorCompra)}</label></div>
              <div className='p-col-6'><label htmlFor="resumo" className='label-title'>Frete</label></div>
              <div className='p-col-6'><label htmlFor="resumo" className='label-title'>{Utils.formatCurrency(valorFrete)}</label></div>
            </div>
          </div>
          <Divider />
          <div className='card center p-col-12 p-mb-3'>
            <div className='p-grid p-col-12'>
              <div className='p-col-6'><label htmlFor="resumo" className='label-title p-text-bold p-text-uppercase'>Total</label></div>
              <div className='p-col-6'><label htmlFor="resumo" className='label-title p-text-bold'>{Utils.formatCurrency(totalCompra)}</label></div>
            </div>
          </div>
          <Divider />
          <div className='center p-col-12 p-mb-5'>
            <ButtonBase icon='pi pi-check-circle' label='Finalizar pagamento' onClick={finalizarPagamento} className='p-button-warning p-p-4' style={{ width: '100%', fontSize: '25px' }} />
            <ButtonBase icon='pi pi-check-circle' label='Pix' onClick={() =>{setModalDialog(true)}} className='p-button-warning p-p-4' style={{ width: '100%', fontSize: '25px' }} />
          </div>
          <div>
            <img src="https://cdn.shopify.com/s/files/1/0519/6546/0651/files/8_-_SELO_MERCADO_PAGO.png?v=1608404016" alt="" style={{ width: '100%' }} />
            <img src={`data:image/jpeg;base64,${qr_code_base64}`} style={{ width: '100%' }}/>
          </div>
          
        </div>

      </div>
      <input type="text" name="cardNumber" id="form-checkout__cardNumber" />
      <input type="text" name="cardExpirationMonth" id="form-checkout__cardExpirationMonth" />
      <input type="text" name="cardExpirationYear" id="form-checkout__cardExpirationYear" />
      <input type="text" name="cardholderName" id="form-checkout__cardholderName" />
      <input type="email" name="cardholderEmail" id="form-checkout__cardholderEmail" />
      <input type="text" name="securityCode" id="form-checkout__securityCode" />
      <select name="issuer" id="form-checkout__issuer"></select>
      <select name="identificationType" id="form-checkout__identificationType"></select>
      <input type="text" name="identificationNumber" id="form-checkout__identificationNumber" />
      <select name="installments" id="form-checkout__installments"></select>
      <button type="submit" id="form-checkout__submit">Pagar</button>
      <progress value="0" className="progress-bar">Carregando...</progress>
      <Toast ref={msg} />
      <PagePix 
          valor={totalCompra} 
          data_expired={dt_expired}
          qr_code={qr_code} 
          qr_code_base64={qr_code_base64} 
          closeFuncion={hideDialog} 
          modalDialog={modalDialog} 
      />
    </Container>
  );
}

export default observer(Checkout);