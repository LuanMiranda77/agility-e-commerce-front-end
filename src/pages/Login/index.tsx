import React, { useState} from 'react';
import { Container } from './styles'
import { Divider } from 'primereact/divider';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import { ButtonBase } from '../../components/ButtonBase';
import { ButtonRedeSociais } from '../../components/ButtonRedeSociais';
import { InputGroup } from '../../components/InputGroup';
import { LoginService } from '../../services/LoginService/LoginService';
import { observer} from 'mobx-react-lite';
import {useContext, useRef} from 'react';
import UserStore from "../../stores/userStore";
import { Toast } from 'primereact/toast';
import { Utils } from '../../utils/utils';
import { ModalRecuperaSenha } from './modalRecuperaSenha';



// ========================================
// Autor: Luan Miranda
// ========================================

function Login() {
    const store = useContext(UserStore);
    const history = useHistory();
    const msg = useRef<Toast>(null);
    const loginService = new LoginService();

    const logar = () => {
        
        loginService.login(store.user).then(response => {
                if(response.role === 'MASTER'){
                    history.push("/dashbord");
                }else if(response.role === 'ADMIN'){
                    history.push("/dashbord");
                }else if(response.role === 'SEPARADOR'){
                    history.push("/dashbord");
                }else{
                    history.push("/home");
                }
        }).catch(err =>{
              Utils.messagemShow(msg,'info', `AVISO`, err.mensagemUsuario, 3000);
        });
    }

    const [modalSenha, setModalSenha] = useState(false);

    const closeModalSenha = () =>{
        setModalSenha(false);
    }

    return (
        <Container>
            <div className="card">
                <div>
                    <img src={logo} alt="logo" />
                </div>
                <div>

                </div>
                <div className="p-grid">
                    <div className="div-login p-col-12 p-md-6 p-lg-5 p-d-flex p-ai-center p-jc-center">
                        <div className="p-fluid">
                            <h3>Login</h3>
                            <div className="p-field">
                                <InputGroup type="text" label="E-mail" placeholder="Digite seu e-mail" icon="pi pi-user" onChange={(e) => store.user.email = e.target.value} required autoFocus></InputGroup>
                            </div>
                            <div className="p-field">
                                <InputGroup label="Senha" placeholder="Digite a senha" icon="pi pi-key" type="password" onChange={(e) => store.user.password = e.target.value} required autoFocus></InputGroup>
                            </div>
                            <ButtonBase icon="" label="ENTER" className="p-button-success p-button-raised p-button-rounded" onClick={logar} />
                            <div className="div-link">
                                <a href="/user" ><span className="cadastro">Cadastre-se</span></a>
                                <a onClick={()=> setModalSenha(true)} style={{cursor:'pointer'}} >
                                    <span className="esquece">Esquece a senha</span>
                                </a>
                            </div>

                        </div>
                    </div>
                    <div className="p-col-2">
                        <Divider className="divider" layout="vertical">
                        </Divider>
                    </div>

                    <div className="coletor p-col-12 p-md-6 p-lg-5 p-ai-center p-jc-center">
                        <h3>Login com redes sociais</h3>
                        <ButtonRedeSociais icon="pi pi-google" sizeIcon="3" size="6" label="Google" className="google p-button-raised p-button-rounded" />
                        <ButtonRedeSociais icon="pi pi-facebook" sizeIcon="3" size="6" label="Facebook" className="facebook p-button-raised p-button-rounded" />
                    </div>
                </div>
              
            </div>
            <Toast ref={msg}/>
            <ModalRecuperaSenha store={store} modalDialog={modalSenha} closeFuncion={closeModalSenha}/>
        </Container>

    )
}

export default observer(Login);