import { GInput } from './data/GInput';
import { GButton } from './data/GButton';
import { useTransition } from 'react';
import { useInput } from '../assets/hook/useInput';
import { login } from '../service/service.crud';
import { initialUserAuth, UserAuth } from '../component/user';
import { Link } from 'react-router-dom';
import { createToast, toastDetails } from './page/toast.message';
import './template/toast.css'
import './login.css'

export const Login = () => {
    const {state, setState, handleInput} = useInput<UserAuth>(initialUserAuth)
    const [, startTransition] = useTransition()

    const loginUser = async () => {
        await login('auth/login', state).then((data: any) => {
            startTransition(() => validItem(data))
            createToast(toastDetails[1], data)
        }).catch((error) => {
            createToast(toastDetails[1], error)
        })
    }
    const validItem = (data: any) => {
        if (data?.hasOwnProperty('accessToken')) {
            setState(data)
            window.location.reload()
        }
    }
    return (
        <section className="login-container">
            <article className="login-box">
                <div className="login-header">
                    <h2>Bem vindo de volta</h2>
                    <p>Entre com suas credenciais</p>
                </div>
                <form action={loginUser} id="captchaForm">
                    <GInput name='username' resource='fas fa-user' required value={state.username} onChange={handleInput}></GInput>
                    <GInput name='password' resource='fas fa-lock' type='password' required value={state.password} onChange={handleInput}></GInput>
                    <GInput name='totpKey' resource='fas fa-key' required value={state.totpKey} onChange={handleInput}></GInput>
                    <input type="hidden" id="captchaToken" name="captchaToken" />
                    <GButton type="submit" className="submit-button" onClick={loginUser}>Entrar</GButton>
                </form>
                <div className="login-footer">
                    <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
                </div>
                <div className="login-footer">
                    <p><Link to="/resetPassword">Esqueci minha senha</Link></p>
                </div>
                <div className="login-footer">
                    <p><Link to="/resetTotp">Esqueci minha semente</Link></p>
                </div>
            </article>
        </section>
    )
}