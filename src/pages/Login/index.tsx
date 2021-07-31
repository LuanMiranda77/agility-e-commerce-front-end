import { Container } from './styles'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import logo from '../../assets/logo.svg'
import { ButtonBase } from '../../components/ButtonBase';
import { ButtonRedeSociais } from '../../components/ButtonRedeSociais';

// ========================================
// Autor: Luan Miranda
// ========================================
export function Login() {
    return (
        <Container>
            <div className="card">
                <div>
                    <img src={logo} alt="logo" />
                </div>
                <div>
                   
                </div>
                <div className="p-grid">
                    <div className="p-col-12 p-md-6 p-lg-5 p-d-flex p-ai-center p-jc-center">
                      
                        <div className="p-fluid">
                            <h3>Login</h3>
                            <div className="p-field">
                                <label htmlFor="email">E-mail</label>
                                <InputText id="email" type="text" placeholder="Digite seu e-mail" />
                            </div>
                            <div className="p-field">
                                <label htmlFor="senha">Senha</label>
                                <InputText id="senha" type="password" placeholder="Digite sua senha" />
                            </div>
                            <ButtonBase icon="" label="ENTER" className="p-button-success p-button-raised p-button-rounded" />
                            <div className="div-link">
                                <a href="" ><span>Cadastre-se</span></a>
                                <a href=""><span className="span-link">Esquece a senha</span></a>
                            </div>

                        </div>
                    </div>
                    <div className="divider p-col-2">
                        <Divider layout="vertical">
                        </Divider>
                    </div>

                    <div className="p-col-12 p-md-6 p-lg-5 p-ai-center p-jc-center">
                            <h3>Login com redes sociais</h3>
                            <ButtonRedeSociais icon="pi pi-google" sizeIcon="4" size="6" label="Google" className="google p-button-raised p-button-rounded" />
                            <ButtonRedeSociais icon="pi pi-facebook" sizeIcon="3" size="6" label="Facebook" className="facebook p-button-raised p-button-rounded" />
                    </div>
                </div>
            </div>

        </Container>

    )
}