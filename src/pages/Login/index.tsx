import { Container, Content } from './styles'
import iconGoogle from '../../assets/icon-google.svg'
import iconFace from '../../assets/icon-face.svg'

// ========================================
// Autor: Luan Miranda
// ========================================
export function Login() {
    return (
        <Container>
            {/* <img src="./assets/logo.svg" alt="logo" /> */}
            <div className="p-fluid">
                <h3>Login</h3>
                <div className="div-master">
                    <label htmlFor="email" >E-mail</label>
                    <input type="text" placeholder="Digite seu e-mail" />
                </div>
                <div className="div-master">
                    <label htmlFor="senha" >Senha</label>
                    <input type="text" placeholder="Digite sua senha" />
                </div>
                <button className="button-enter">ENTRAR</button>
                <div className="div-link">
                    <a href="" ><span>Cadastre-se</span></a>
                    <a href=""><span className="span-link">Esquece a senha</span></a>
                </div>
            </div>

            <Content>
                <div className="content">
                    <h3>Fazer login via redes sociais</h3>
                    <button className="button-sem-fundo">
                        <img src={iconGoogle} alt="logo" />
                        <span>Registre-se com o google</span>
                    </button>
                    <button>
                        <img src={iconFace} alt="" />
                        <span>Registre-se com o facebook</span>
                    </button>
                </div>
            </Content>

        </Container>

    )
}