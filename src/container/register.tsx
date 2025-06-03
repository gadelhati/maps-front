import { GInput } from './data/GInput';
import { GButton } from './data/GButton';
import { useInput } from '../assets/hook/useInput';
import { create } from '../service/service.crud';
import { initialUser, User } from '../component/user';
import { Link } from 'react-router-dom';
import { createToast, toastDetails } from './page/toast.message';
import './template/toast.css'
import './login.css'

export const Register = () => {
    const {state, handleInput} = useInput<User>(initialUser)

    const register = async () => {
        await create('signup2', state).then((data: any) => {
            createToast(toastDetails[1], data)
        }).catch((error) => {
            createToast(toastDetails[1], error)
        })
    }
    return (
        <section className="login-container">
            <article className="login-box">
                <div className="login-header">
                    <h2>Bem vindo</h2>
                    <p>Crie sua conta</p>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    register(); 
                }} id="captchaForm">
                    <GInput name='username' resource='fas fa-user' value={state.username} onChange={handleInput}></GInput>
                    <GInput name='email' resource='fas fa-envelope' value={state.email} onChange={handleInput}></GInput>
                    <GInput name='password' resource='fas fa-lock' type='password' value={state.password} onChange={handleInput}></GInput>
					{/* <GInput name='password' resource='fas fa-lock' type='password' value={state.password} onChange={handleInput}></GInput> */}
                    <input type="hidden" id="captchaToken" name="captchaToken" />
                    <GButton type="submit" className="submit-button">Entrar</GButton>
                </form>
                <div className="login-footer">
                    <p>Entrar com minha conta? <Link to="/login">Entra</Link></p>
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