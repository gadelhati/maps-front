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

export const ResetPassword = () => {
    const {state, setState, handleInput} = useInput<UserAuth>(initialUserAuth)
    const [, startTransition] = useTransition()

    const resetPassword = async () => {
        await login('user/resetPasssword', state).then((data: any) => {
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
                    <h2>Reset de Senha</h2>
                    <p>Entre com seu nome de usuário</p>
                </div>
                <form action={resetPassword} id="captchaForm">
                    <GInput name='username' resource='fas fa-user' required value={state.username} onChange={handleInput}></GInput>
                    <input type="hidden" id="captchaToken" name="captchaToken" />
                    <GButton type="submit" className="submit-button" onClick={resetPassword}>Entrar</GButton>
                </form>
                <div className="login-footer">
                    <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
                </div>
                <div className="login-footer">
                    <p><Link to="/login">Faça login na sua conta</Link></p>
                </div>
                <div className="login-footer">
                    <p><Link to="/resetTotp">Esqueci minha semente</Link></p>
                </div>
            </article>
        </section>
    )
}