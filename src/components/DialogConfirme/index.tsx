import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { MouseEventHandler } from 'hoist-non-react-statics/node_modules/@types/react';
import React from 'react';
import { ButtonBase } from '../ButtonBase';
import { Container } from './styles';

interface DialogConfirmeProps{
  setFunctionButtonSim: MouseEventHandler;
  setFunctionButtonNao: MouseEventHandler;
  text: string;
  show: boolean;
  titulo: string;
}

export const DialogConfirme: React.FC<DialogConfirmeProps> = (props) => {

  return <Container>
          <Dialog
            open={props.show}
            onClose={props.setFunctionButtonNao}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
           >
           <DialogContent style={{background: '#fffaf3bd', border: '5px solid #FFA726', borderRight: '0', borderTop: '0', borderBottom: '0'}}>
                    <span className="p-grid">
                      <span className="p-text-center p-pt-1">
                          <i className="pi pi-exclamation-triangle" style={{ fontSize: '3rem', color: 'var(--red)' }} />
                      </span>
                      
                      <DialogTitle id="alert-dialog-slide-title">{props.titulo}</DialogTitle>
                      
                    </span>
                    <DialogContentText id="alert-dialog-slide-description">
                    <p className="p-text-center p-pt-2">{props.text}</p>
                    </DialogContentText>
                    <DialogActions>
                    <span className="p-text-center p-col-12 p-grid p-pt-4">
                        <ButtonBase id='button-sim' label="Sim" icon="" className="p-button-success p-pl-6 p-pr-6 p-mr-3 p-ml-5" onClick={props.setFunctionButtonSim} />
                        <ButtonBase id='button-nao' onClick={props.setFunctionButtonNao} label="Não" icon="" className="p-button-danger  p-pl-6 p-pr-6" />
                    </span>
                    </DialogActions>
                </DialogContent>
          </Dialog>
         </Container>;
}