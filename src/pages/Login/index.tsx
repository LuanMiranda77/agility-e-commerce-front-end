import { Container } from './styles'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import logo  from '../../assets/logo.svg'

// ========================================
// Autor: Luan Miranda
// ========================================
export function Login() {
    return (
        <Container>
            <div className="card">
                <div>
                    <img src={logo} alt="logo" />
                    <Divider/>
                </div>
                <div>
                    <br />
                    <h3>Login</h3>
                </div>
                <div className="p-grid">
                    <div className="p-col-12 p-md-6 p-lg-5 p-d-flex p-ai-center p-jc-center">
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="email">E-mail</label>
                                <InputText id="email" type="text" placeholder="Digite seu e-mail" />
                            </div>
                            <div className="p-field">
                                <label htmlFor="senha">Senha</label>
                                <InputText id="senha" type="password" placeholder="Digite sua senha" />
                            </div>
                            <Button label="ENTRAR" className="p-button-success"></Button>
                            <div className="div-link">
                                <a href="" ><span>Cadastre-se</span></a>
                                <a href=""><span className="span-link">Esquece a senha</span></a>
                            </div>

                        </div>
                    </div>
                    <div className="p-col-2">
                        <Divider layout="vertical">
                        </Divider>
                    </div>

                    <div>
                        <div className="p-col-12 p-md-6 p-lg-12 p-d-flex p-ai-center p-jc-center">
                            <Button className="google p-2">
                                <i className="pi pi-google p-px-2"></i>
                                <span className="p-px-3">Google</span>
                            </Button>
                        </div>
                        <div className="p-col-12 p-md-6 p-lg-12 p-d-flex p-ai-center p-jc-center">
                            <Button className="facebook p-p-2">
                                <i className="pi pi-facebook p-px-2"></i>
                                <span className="p-px-3">Facebook</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </Container>

    )
}