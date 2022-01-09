import { Dialog, DialogContent } from '@material-ui/core';
import { ProgressSpinner } from 'primereact/progressspinner';
import React from 'react';
import { Container } from './styles';

interface ModalLoadProps {
  //adicionar os props
  visible: boolean;
}

export const ModalLoad: React.FC<ModalLoadProps> = (props) => {
  return <Container>
    <Dialog
      className="p-col-12"
      open={props.visible}
    // onClose={hideDialog}
    >
      <DialogContent style={{ background: 'var(--background)' }}>
        <div className='p-pl-6 p-pr-6'>
          <div className='p-text-center'>
            <ProgressSpinner />
          </div>
          <div className='p-text-center p-col-12'>
            <label htmlFor="">carregando aguarde...</label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </Container>;
}