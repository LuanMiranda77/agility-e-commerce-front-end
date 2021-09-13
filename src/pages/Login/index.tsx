import { Container } from './styles'
import { Divider } from 'primereact/divider';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import { ButtonBase } from '../../components/ButtonBase';
import { ButtonRedeSociais } from '../../components/ButtonRedeSociais';
import { InputGroup } from '../../components/InputGroup';
import { LoginService } from '../../services/LoginService/LoginService';
import { observer} from 'mobx-react-lite';
import {useContext} from 'react';
import UserStore from "../../stores/userStore";


// ========================================
// Autor: Luan Miranda
// ========================================

function Login() {
    const store = useContext(UserStore);
    const history = useHistory();
    const {user} = store;
    const loginService = new LoginService();

    const logar = () => {
        
        loginService.login(user).then(data => {
            console.log(data);
            if (data === true) {
                history.push("/produto");
            }else {
               console.log("errro");
            }
        });
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
                                <InputGroup type="text" label="E-mail" placeholder="Digite seu e-mail" icon="pi pi-user" onChange={(e) => user.email = e.target.value} required autoFocus></InputGroup>
                            </div>
                            <div className="p-field">
                                <InputGroup label="Senha" placeholder="Digite a senha" icon="pi pi-key" type="password" onChange={(e) => user.password = e.target.value} required autoFocus></InputGroup>
                            </div>
                            <ButtonBase icon="" label="ENTER" className="p-button-success p-button-raised p-button-rounded" onClick={logar} />
                            <div className="div-link">
                                <a href="/user" ><span className="cadastro">Cadastre-se</span></a>
                                <a href="/esquece"><span className="esquece">Esquece a senha</span></a>
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

        </Container>

    )
}

export default observer(Login);