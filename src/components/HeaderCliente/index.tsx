import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';
import { Logo } from '../../components/logo'
import logo_zap from '../../assets/logo_zap.svg';
import logo_face from '../../assets/logo_face.svg';
import logo_insta from '../../assets/logo_insta.svg';
import logo_sacola from '../../assets/logo-sacola.svg';
import { InputSearch } from '../InputSearch';
import { ButtonBase } from '../ButtonBase';
import { Dropdown } from 'primereact/dropdown';
import { CategoriaService } from '../../services/CategoriaService/categoriaService';
import { Utils } from '../../utils/utils';
import { Toast } from 'primereact/toast';

interface HeaderClienteProps {
  //adicionar os props
}

export const HeaderCliente: React.FC<HeaderClienteProps> = () => {
  const [selectedCateg, setSelectedCateg] = useState<any>(null);
  const categoriaService = new CategoriaService();
  const [categorias, setCategorias] = useState<any>([]);
  const msg = useRef<Toast>(null);
  const [quantCarrinho, setQuantCarrinho] = useState(0);
  const history = useHistory();

  const onCategChange = (e: { value: any }) => {
    setSelectedCateg(e.value);
  }

  const pesquisaProduto = (event: any, params: string) => {
  if(event === null){
    history.push(`/pesquisa/${'c!'+params}`);
  }else if (event.key === 'Enter') {
      history.push(`/pesquisa/${params}`);
  }
  }

  useEffect(() => {
    categoriaService.getCategorias().then(
      data => {
        data.map((item: { id: number, nome: string }) => {
          let categ = { code: 0, name: '' };
          categ.code = item.id;
          categ.name = item.nome;
          categorias.push(categ);
        });
      }
    ).catch(error => {
      Utils.messagemShow(msg, 'error', 'Erro de listagem', error.mensagemUsuario, 5000);
    });
  }, []);


  return <Container className='p-shadow-2'>
    <div className='p-col-12 p-grid'>
      <div className='p-col-2 p-text-center p-mt-3'>
        <Logo className='' />
      </div>
      <div className='p-col-10'>
        <div className='p-grid p-p-1'>
          <div className='p-col-12  p-text-right'>
            <label htmlFor="blog">
              <a href="/sobre-nos" className='text-top'>Sobre nós | </a>
            </label>
            <label htmlFor="blog" className='text-top'>
              Siga-nos no
              <a href="https://www.instagram.com/gracasoft/" ><img src={logo_insta} alt="logo-zap" className='' /></a>
              <a href="https://www.facebook.com/luanmirandabessa" ><img src={logo_face} alt="logo-zap" className='' /></a>
              <label htmlFor="div" className='text-top p-mr-2 p-ml-2'>|</label>
            </label>
            <label htmlFor="blog">
              <a href="https://api.whatsapp.com/send?phone=5583996386694" className='text-top p-mr-2'>
                Atendimento
                <img src={logo_zap} alt="logo-zap" className='p-mr-2' />
                |
              </a>
            </label>
            <label htmlFor="blog">
              <a href="/blog" className='text-top'>Nosso blog</a>
            </label>
          </div>
        </div>
        <div className='p-grid'>
          <div className='p-col-10'>
            <InputSearch placeholder='Pesquisar produto...' onKeyDown={(e) => pesquisaProduto(e, e.currentTarget.value)}/>
          </div>
          <div className='p-col-1 p-text-right'>
            <label htmlFor="entra"><a href="/login" className='label-div-enter  text-top p-mb-2'>Entra</a></label>
            <label htmlFor="cad"><a href="/cadastro" className='label-div-enter text-top'>Cadastre-se</a></label>
          </div>
          <div className='p-text-right p-col-1'>
            <img src={logo_sacola} alt="sacola" className='icon-sacola'>
            </img>
          </div>
          <label htmlFor="" className='quant-sacola p-text-bold'>{quantCarrinho}</label>
        </div>
      </div>
    </div>
    <div className='div-footer p-grid'>
      <i className='button-categ pi pi-bars p-ml-6 p-mt-2' style={{ 'fontSize': '1.5em' }}></i>
      <Dropdown className='button-categ p-mr-4'
        value={selectedCateg}
        options={categorias}
        onChange={onCategChange}
        optionLabel="name"
        placeholder="Todas as categorias"
        style={{ color: 'white' }}
      />
      <button className='button-categ p-mr-4 p-mt-1' onClick={(e) => pesquisaProduto(null, 'categoria-test0')}>Ofertas do dia</button>
      <button className='button-categ p-mr-4 p-mt-1'>Novidades</button>
      <button className='button-categ p-mr-4 p-mt-1'>Relógios</button>
      <button className='button-categ p-mr-4 p-mt-1'>Brincos</button>
      <button className='button-categ p-mr-4 p-mt-1'>Pulseiras</button>
      <button className='button-categ p-mt-1'>Gargantilhas</button>
    </div>
    <Toast ref={msg} />
  </Container>;
}