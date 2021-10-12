import React, { useRef  } from "react";

import { Toast } from 'primereact/toast';
import { Container } from './styles';
import { IMessageProps } from "../../domain/types/ImessageProps";
import { ButtonBase } from "../ButtonBase";


interface PosicitonProps{
  position: "bottom-right";
}

export const MessagesBase: React.FC<PosicitonProps> = (props) => {
  const toast = useRef<Toast>(null);
 
  
  const messageShow = (props: IMessageProps) => {
    if( toast.current!=null){
      toast.current.show({severity:props.type, summary: props.title, detail: props.body, life: props.time});
    }
  }

  const showConfirm = () => {
        
    const clear = () => {
        if(toast.current != null){
            toast.current.clear();
        }
    }

    if(toast.current != null){
        toast.current.show({ severity: 'warn', sticky: true, content: (
            <div className="p-flex p-flex-column" style={{flex: '1'}}>
                <div className="p-text-center">
                    <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                    <h4>Realmente deseja excluir?</h4>
                </div>
                <div className="p-grid p-fluid">
                    <div className="p-col-6">
                        <ButtonBase type="button" icon='' label="Sim" className="p-button-success" />
                    </div>
                    <div className="p-col-6">
                        <ButtonBase type="button" icon='' label="Não" className="p-button-danger" onClick={clear}/>
                    </div>
                </div>
            </div>
        ) });
    }    
}


  return <Container>
            <Toast ref={toast} position={props.position}/>
         </Container>;
}