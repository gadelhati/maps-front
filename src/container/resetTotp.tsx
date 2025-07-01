import { GInput } from './data/GInput';
import { GButton } from './data/GButton';
import { useInput } from '../assets/hook/useInput';
import { reset } from '../service/service.crud';
import { initialUserAuth, UserAuth } from '../component/user';
import { Link } from 'react-router-dom';
import { createToast, toastDetails } from './page/toast.message';
import './template/toast.css'
import './template/login.css'

export const ResetTotp = () => {
    const {state, handleInput} = useInput<UserAuth>(initialUserAuth)

    const resetTotp = async () => {
        await reset('user/resetTotp', state).then((data: any) => {
            createToast(toastDetails[1], data)
        }).catch((error) => {
            createToast(toastDetails[1], error)
        })
    }
    return (
        <section className="login-container">
            <article className="login-box">
                <div className="login-header">
                    <h2>Reset de Semente</h2>
                    <p>Entre com seu nome de usuário</p>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    resetTotp(); 
                }} id="captchaForm">
                    <GInput name='username' resource='fas fa-user' value={state.username} onChange={handleInput}></GInput>
                    <input type="hidden" id="captchaToken" name="captchaToken" />
                    <GButton type="submit" className="submit-button">Entrar</GButton>
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