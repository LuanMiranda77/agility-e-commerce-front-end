import { Dialog } from '@material-ui/core';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { ButtonBase } from '../../components/ButtonBase';
import { InputBase } from '../../components/InputBase';
import { Logo } from '../../components/logo';
import { LoginService } from '../../services/LoginService/LoginService';
import { Utils } from '../../utils/utils';
import { ProgressSpinner } from 'primereact/progressspinner';


interface ModalProps {
    store: any;
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
    const [enviando, setEnviando] = useState(false);

    const sendEmail = (item: any) => {
        setEmail(item.email);
        props.store.user.email = item;
    }

    const recuperarSenha = () => {
        if (email === '') {
            setSubmit(true);
            Utils.messagemShow(msg, 'error', `Erro e-mail`, 'Campo e-mail em branco', 5000);
            return false;
        }
        setEnviando(true);
        loginService.recuperarSenha(props.store.user)
            .then(res => {
                Utils.messagemShow(msg, 'success', `E-mail enviado`, 'Verifique sua caixa de e-mail!', 5000);
                setEnviando(false);
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
                                className='p-col-12 p-xl-12 p-lg-12' onChange={e => sendEmail(e.target.value)}
                            />
                            {submit === true && <small className="p-error">E-mail é obtigatorio.</small>}
                        </div>
                        <div className='p-col-12 p-text-center'>
                            {enviando === false &&
                                <ButtonBase id='button-recuperar' label='CONTINUAR' icon='' className='p-button-success p-pr-6 p-pl-6' onClick={recuperarSenha} />
                            }
                        </div>

                        <Toast ref={msg} />
                        {enviando === true &&
                            <div className='p-col-12 p-text-center'>
                                <ProgressSpinner strokeWidth="4" fill="#ffff" animationDuration=".8s" />
                            </div>
                        }
                    </div>
                </Card>
            </Dialog>

        </>

    );
}