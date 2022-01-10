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
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import default_avatar from '../../assets/default_avatar.png';
import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Menu } from 'primereact/menu';

interface HeaderClienteProps {
  //adicionar os props
}

export const HeaderCliente: React.FC<HeaderClienteProps> = () => {
  const [selectedCateg, setSelectedCateg] = useState<any>(null);
  const menu = useRef<any>(null);
  const categoriaService = new CategoriaService();
  const [categorias, setCategorias] = useState<any>([]);
  const msg = useRef<Toast>(null);
  const [quantCarrinho, setQuantCarrinho] = useState(0);
  const history = useHistory();


  const onCategChange = (e: { value: any }) => {
    setSelectedCateg(e.value);
  }

  const pesquisaProduto = (event: any, params: string) => {
    if (event === null) {
      history.push(`/pesquisa/${'c!' + params}`);
    } else if (event.key === 'Enter') {
      history.push(`/pesquisa/${params}`);
    }
  }

  useEffect(() => {
    let array = JSON.parse(localStorage.getItem("carrinho") || "[]");

    setQuantCarrinho(array.length);

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

  const getUser = () => {
    let user = Utils.getTokenLogin();

    if (user) {
      return user;
    } else {
      return null;
    }
  }

  const items = [
    {
      label: 'Dados pessoais', icon: 'pi pi-fw pi-video',
      items: [
        {
          label: 'Minha Conta',
          icon: 'pi pi-android',
          command: () => {
            history.push(`/cliente`);
          }
        },
        {
          label: 'Compras',
          icon: 'pi pi-dollar',
          command: () => {
            history.push(`/pedido`);
          }
        },
        {
          label: 'Sair',
          icon: 'pi pi-sign-out',
          command: () => {
            Utils.logout();
            history.push(`/login`);
          }
        }
      ]
    },
  ];


  return <Container className='p-shadow-2'>
    <div className='p-col-12 p-grid'>
      <div className='p-col-2 p-text-center p-mt-3' onClick={() => history.push('/home')}>
        <Logo className='cursor-pointer' />
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
          <div className='p-col-9'>
            <InputSearch placeholder='Pesquisar produto...' onKeyDown={(e) => pesquisaProduto(e, e.currentTarget.value)} />
          </div>
          {
            !localStorage.getItem('p-text-left') ?
              <div className='p-col-2 p-text-right'>
                <label htmlFor="entra"><a href="/login" className='label-div-enter  text-top p-mb-2'>Entra</a></label>
                <label htmlFor="cad"><a href="/usuario" className='label-div-enter text-top'>Cadastre-se</a></label>
              </div>
              :
              <div className='p-col-2 p-text-center' onMouseEnter={(event) => menu?.current.toggle(event)} onMouseLeave={(event) => menu?.current.toggle(event)}>
                <div className='text-top'>
                  <Avatar image={default_avatar} className="p-mt-2" shape="circle" style={{ width: '15%', height: '15%' }} >
                    <small className='p-ml-2'>{getUser()?.nome}</small>
                    <Menu model={items} popup ref={menu} id="popup_menu" />
                  </Avatar>
                </div>
              </div>
          }
          <div className='cursor-pointer p-text-right p-col-1' onClick={() => history.push(`/carrinho`)}>
            <img src={logo_sacola} alt="sacola" className='icon-sacola'>
            </img>
          </div>
          {quantCarrinho > 0 ? <Badge className='quant-sacola p-text-bold' value={quantCarrinho} severity="danger" ></Badge> : ''}
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