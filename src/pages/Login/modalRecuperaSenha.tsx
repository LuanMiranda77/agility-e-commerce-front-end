import { Dialog } from '@material-ui/core';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { ButtonBase } from '../../components/ButtonBase';
import { InputBase } from '../../components/InputBase';
import { Logo } from '../../components/logo';
import { LoginService } from '../../services/LoginService/LoginService';
import { Utils } from '../../utils/utils';


interface ModalProps {
    closeFuncion: Function;
    modalDialog: boolean;
}

export const ModalRecuperaSenha: React.FC<ModalProps> = (props) => {
    const loginService = new LoginService();
    const msg = useRef<Toast>(null);

    const hideDialog = () => {
        props.closeFuncion();
    }

    const [email, setEmail] = useState('');
    const [submit, setSubmit] = useState(false);

    const recuperarSenha = () => {
        console.log(email);
        if(email === ''){
            setSubmit(true);
            Utils.messagemShow(msg, 'error', `Erro e-mail`, 'Campo e-mail em branco', 5000);
            return false;
        }
        loginService.recuperarSenha(email)
        .then(res =>{
            Utils.messagemShow(msg, 'sucess', `E-mail enviado`, 'Verifique sua caixa de e-mail!', 5000);
        }).catch(error => {
            Utils.messagemShow(msg, 'error', `Erro ao enviar e-mail`, error.mensagemUsuario, 5000);
        });
    }

    return (
        <>
            <Dialog
                className="p-col-12"
                open={props.modalDialog}
                onClose={hideDialog}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"

            >
                <Card>
                    <div className='p-col-12'>
                        <div className='p-text-center'>
                            <Logo className='' />
                        </div>
                        <div className='p-col-12 p-text-center p-field' style={{ color: 'var(--primary)' }}>
                            <h2>{'Recuperação de  de senha'}</h2>
                            <small>{'Insira o seu endereço de e-mail associado à sua conta'}</small>
                        </div>
                        <div className='p-col-12 p-field'>
                            {/* <label htmlFor="" className='p-text-bold' style={{color: 'var(--green)'}}>{'E-mail'}</label> */}
                            <InputBase type="text" label='E-mail' placeholder='Digite o e-mail cadastrado'
                                className='p-col-12 p-xl-12 p-lg-12' onChange={e => setEmail(e.target.value)} 
                            />
                            {submit === true  && <small className="p-error">E-mail é obtigatorio.</small>}
                        </div>
                        <div className='p-col-12 p-text-center'>
                            <ButtonBase label='CONTINUAR' icon='' className='p-button-success p-pr-6 p-pl-6' onClick={recuperarSenha} />
                        </div>

                    </div>
                    <Toast ref={msg}/>
                </Card>
            </Dialog>
            
        </>

    );
}