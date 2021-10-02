import { Card } from 'primereact/card';
import React from 'react';
import { Logo } from '../logo';
import icon  from '../../assets/icon.png'
import { Container } from './styles';

const FooterAdmin: React.FC = () => {
  return <Container>
    <div className="p-shadow-5 card">
      <label htmlFor="texto">©2021 - Direitos reservados a GraçaSoft</label>
      <img src={icon} alt="logo"/>
    </div>
  </Container>;
}

export default FooterAdmin;