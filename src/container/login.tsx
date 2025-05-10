import { GInput } from './data/GInput';
import { GButton } from './data/GButton';
import './login.css'

export const Login = () => {
    return (
        <>
            <div className="login-header">
                <h2>Bem vindo de volta</h2>
                <p>Entre com suas credenciais</p>
            </div>
            <GInput name='username' resource='fas fa-user form-group__icon' ></GInput>
            <GInput name='password' resource='fas fa-lock form-group__icon' type='password' ></GInput>
            <GInput name='totpKey' resource='fas fa-key form-group__icon' ></GInput>
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
        </>
    )
}