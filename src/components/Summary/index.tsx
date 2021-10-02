import React from 'react';
import { Container } from './styles';
import { Card } from 'primereact/card';
import { formatCurrency } from '../../utils/formatCurrency';

interface CardProps {
  label: string;
  description: string;
  value: number;
  icon: string;
  color: string;
}

const Summary: React.FC<CardProps> = (props) => {
  const valor = formatCurrency(props.value);
  return <Container>
    <Card className="card">
      <div className="p-flex">
        <label id='valor' className="p-col-12 p-mr-6" style={{ color: props.color}}>{valor}</label>
        <i id={props.icon} className={"icon " + props.icon} style={{ fontSize: '2em', color: props.color}}></i>
      </div>
        <h5 className="p-pb-1 p-pl-2">{props.description}</h5>
    </Card>
    <div className={"p-pl-4 p-shadow-5 label-title"} style={{ background: props.color}}>
      <label id={props.label} htmlFor="title">{props.label}</label>
    </div>
  </Container>;
}

export default Summary;