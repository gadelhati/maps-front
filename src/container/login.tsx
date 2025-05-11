import { GInput } from './data/GInput';
import { GButton } from './data/GButton';
// import './login.css'

export const Login = () => {
    return (
        <section className="login-container">
            <article className="login-box">
                <div className="login-header">
                    <h2>Bem vindo de volta</h2>
                    <p>Entre com suas credenciais</p>
                </div>
                <GInput name='username' resource='fas fa-user' ></GInput>
                <GInput name='password' resource='fas fa-lock' type='password' ></GInput>
                <GInput name='totpKey' resource='fas fa-key' ></GInput>
                <input type="hidden" id="captchaToken" name="captchaToken" />
                <GButton type="submit" className="submit-button">Entrar</GButton>
                <div className="login-footer">
                    <p>Não tem uma conta? <a href="@{/register}">Cadastre-se</a></p>
                </div>
                <div className="login-footer">
                    <p><a href="@{/resetPassword}">Esqueci minha senha</a></p>
                </div>
                <div className="login-footer">
                    <p><a href="@{/resetTotp}">Esqueci minha semente</a></p>
                </div>
            </article>
        </section>
    )
}