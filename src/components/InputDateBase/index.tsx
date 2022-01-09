import { Calendar } from 'primereact/calendar';
import React from 'react';
import { Container } from './styles';

interface DateProps {
   label: string;
   setFunction: Function;
   value: Date;
}

const InputDateBase: React.FC<DateProps> = (props) => {
   return <Container>

      <div className="p-field">
         <label>{props.label}</label>
         <Calendar id={props.label} name={props.label}  placeholder='01/12/1990' value={props.value} dateFormat="dd/mm/yy" onChange={(e) => props.setFunction(e.value)} showIcon style={{width: '100%'}} />
      </div>

   </Container>;
}

export default InputDateBase;