import React from 'react';
import { Container } from './styles';

interface DateProps{
   date: string
}

const InputDateBase: React.FC<DateProps> = (props) => {
  return <Container>

          <input value={props.date} className=" p-col-12 p-p-2 p-sm-5 p-md-6 p-lg-12 p-xl-6 calendario" type="date" />

         </Container>;
}

export default InputDateBase;