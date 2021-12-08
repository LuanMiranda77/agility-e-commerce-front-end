import React from 'react';
import { Container } from './styles';
import logo_pag from '../../assets/img-pagamento.svg';
import logo_qrcode from '../../assets/qr-code.svg';
import logo_store from '../../assets/icon-apple.svg';
import logo_play from '../../assets/icon-play.svg';

/**
 * @author  Luan Miranda
 * @Demanda AE-25
 */

export const FooterCliente: React.FC = () => {
  return <Container>
    <div className='footer-boby p-grid p-p-3'>
      <div className='p-sm-12 p-md-12 p-lg-3 p-xl-3'>
        <div className='p-col-12'>
          <label htmlFor="" className='p-text-bold'>Atendimento ao cliente</label>
        </div>
        <div className='p-col-12'>
          <label htmlFor=""><a href="/central-ajuda" className='text-body'>Central de ajuda</a></label>
        </div>
        <div className='p-col-12'>
          <label htmlFor=""><a href="/como-comprar" className='text-body'>Como comprar</a></label>
        </div>
        <div className='p-col-12'>
          <label htmlFor=""><a href="/garantia" className='text-body'>Garantia da loja</a></label>
        </div>
        <div className='p-col-12'>
          <label htmlFor=""><a href="/devolução-reembolso" className='text-body'>Devolução e reembolso</a></label>
        </div>
      </div>
      <div className='p-sm-12 p-md-12 p-lg-3 p-xl-3'>
        <div className='p-col-12'>
          <label htmlFor="" className='p-text-bold'>Sobre a loja</label>
        </div>
        <div className='p-col-12'>
          <label htmlFor=""><a href="/nos" className='text-body'>Sobre Nós</a></label>
        </div>
        <div className='p-col-12'>
          <label htmlFor=""><a href="/politicas" className='text-body'>Políticas da loja</a></label>
        </div>
        <div className='p-col-12'>
          <label htmlFor=""><a href="/privacidade" className='text-body'>Política de Privacidade</a></label>
        </div>
      </div>
      <div className='p-sm-12 p-md-12 p-lg-3 p-xl-3'>
        <div className='p-col-12'>
          <label htmlFor="" className='p-text-bold'>Pagamento aceitos na loja</label>
        </div>
        <div className='p-col-12'>
          <img src={logo_pag} alt="logo" />
        </div>

      </div>
      <div className='p-sm-12 p-md-12 p-lg-3 p-xl-3'>
        <div className='p-col-12'>
          <label htmlFor="" className='p-text-bold'>Baixe nosso App</label>
        </div>
        <div className='p-grid'>
          <div className='p-col-6 p-text-center'>
            <img src={logo_qrcode} alt="" />
          </div>
          <div className='link-store p-col-6'>
            <div className='p-col-12'>
              <a href="/privacidade" className='text-body'>
                <img src={logo_store} alt="" />
              </a>
            </div>
            <div className='p-col-12'>
              <a href="/privacidade" className='text-body'>
                <img src={logo_play} alt="" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
    <div className='footer-bottom p-text-center'>
      <small>© 2021 LBS Joias. Todos os direitos reservados</small>
    </div>

  </Container>;
}