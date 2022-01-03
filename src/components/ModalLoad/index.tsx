import React from 'react';
import { Container } from './styles';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { ProgressSpinner } from 'primereact/progressspinner';

interface ModalLoadProps {
  //adicionar os props
  visible: boolean;
  closeFuncion: Function;
}

export const ModalLoad: React.FC<ModalLoadProps> = (props) => {

  const hideDialog = () => {
    props.closeFuncion();
  }
  return <Container>
    <Dialog
      className="p-col-12"
      open={props.visible}
      // onClose={hideDialog}
    >
      <div className='p-pl-6 p-pr-6'>
      <div className='p-text-center'>
        <ProgressSpinner />
      </div>
      <div className='p-text-center p-col-12'>
        <label htmlFor="">carregando aguarde...</label>
      </div>
      </div>

    </Dialog>

  </Container>;
}