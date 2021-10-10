import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { ButtonBase } from '../ButtonBase';
import { Container } from './styles';
import { useState } from "react"

interface DialogConfirmeProps{
  setFunction: Function;
  text: string;
  show: boolean;
}

export const DialogConfirme: React.FC<DialogConfirmeProps> = (props) => {
  const [dialogShow, setDialogShow] = useState(false);
  
  const hideDialog = () => {
     props.show = false;
  }

  return <Container>
          <Dialog
            open={props.show}
            onClose={hideDialog}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
           >
            <DialogContent style={{background: '#fffaf3bd', border: '5px solid #FFA726', borderRight: '0', borderTop: '0', borderBottom: '0'}}>
              <div className="p-text-center p-pt-4">
                  <i className="pi pi-exclamation-triangle" style={{ fontSize: '3rem', color: 'var(--red)' }} />
              </div>
              <DialogTitle id="alert-dialog-slide-title">{props.text}</DialogTitle>
              <DialogActions>
                  <ButtonBase label="SIM" icon="" className="p-button-success p-pl-6 p-pr-6 p-mr-3" onClick={props.setFunction()} />
                  <ButtonBase onClick={hideDialog} label="NÂO" icon="" className="p-button-danger  p-pl-6 p-pr-6 p-mr-3" />
              </DialogActions>
            </DialogContent>
          </Dialog>
         </Container>;
}