import React from 'react';
import { Container } from './styles';
import logo from '../../assets/logo.svg';
import { Card } from 'primereact/card';

// import { Container } from './styles';

export function Notfound() {
  return <Container>
    <Card >
      <div className="card ">
        <img src={logo} alt="" />
        <h1>Erro: Pagina não encontrada</h1>
        <label>😅404</label>
        
      </div>
    </Card>
  </Container>;
}

