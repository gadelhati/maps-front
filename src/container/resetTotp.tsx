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

export const ResetTotp = () => {
    const {state, setState, handleInput} = useInput<UserAuth>(initialUserAuth)
    const [, startTransition] = useTransition()

    const resetTotp = async () => {
        await login('user/resetTotp', state).then((data: any) => {
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
                    <h2>Reset de Semente</h2>
                    <p>Entre com seu nome de usuário</p>
                </div>
                <form action={resetTotp} id="captchaForm">
                    <GInput name='username' resource='fas fa-user' required value={state.username} onChange={handleInput}></GInput>
                    <input type="hidden" id="captchaToken" name="captchaToken" />
                    <GButton type="submit" className="submit-button" onClick={resetTotp}>Entrar</GButton>
                </form>
                <div className="login-footer">
                    <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
                </div>
                <div className="login-footer">
                    <p><Link to="/login">Faça login na sua conta</Link></p>
                </div>
                <div className="login-footer">
                    <p><Link to="/resetPassword">Esqueci minha senha</Link></p>
                </div>
            </article>
        </section>
    )
}