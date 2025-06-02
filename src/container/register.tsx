import { GInput } from './data/GInput';
import { GButton } from './data/GButton';
import { useState, useTransition } from 'react';
import { useInput } from '../assets/hook/useInput';
import { login } from '../service/service.crud';
import { ErrorMessage, initialErrorMessage } from '../assets/error/errorMessage';
import { initialUser, User } from '../component/user';
import { Link } from 'react-router-dom';
import { createToast, toastDetails } from './page/toast.message';
// import './template/load.css'
import './login.css'

export const Register = () => {
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const {state, setState, handleInput} = useInput<User>(initialUser)
    const [, startTransition] = useTransition()

    const loginUser = async () => {
        await login('auth/login', state).then((data: any) => {
            if(data?.content[0]) startTransition(() => validItem(data!.content[0]))
        }).catch((error) => { setError(error) })
    }
    const validItem = (data: any) => {
        if (data?.hasOwnProperty('accessToken')) {
            // setConfirm({ ...confirm, show: !confirm.show })
            setState(data)
            setError([initialErrorMessage])
            refresh()
            createToast(toastDetails[0])
        } else {
            // handleConfirm('')
            setError(data)
            createToast(toastDetails[1])
        }
    }
    const refresh = () => {
        window.location.reload()
    }
    return (
        <section className="login-container">
            <article className="login-box">
                <div className="login-header">
                    <h2>Bem vindo de volta</h2>
                    <p>Crie sua conta</p>
                </div>
                <form action={loginUser} method="post" id="captchaForm">
                    <GInput name='username' resource='fas fa-user' required value={state.username} onChange={handleInput}></GInput>
                    <GInput name='email' resource='fas fa-envelope' required value={state.email} onChange={handleInput}></GInput>
                    <GInput name='password' resource='fas fa-lock' type='password' required value={state.password} onChange={handleInput}></GInput>
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
            {/* {ispending && <div className='load'></div>} */}
            {JSON.stringify(error)}
        </section>
    )
}