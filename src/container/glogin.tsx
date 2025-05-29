import { useInput } from "../assets/hook/useInput"
import './style.css'
import { login } from "../service/service.crud"
import { initialUserAuth, UserAuth } from "../component/user"
import { ErrorMessage } from "../assets/error/errorMessage"
import { useState, useTransition } from "react"
import { initialErrorMessage } from "../assets/error/errorMessage.initial"

export const GLogin = () => {
	// const [state, setState] = useState<UserAuth>(initialUserAuth)
	const [, setError] = useState<ErrorMessage[]>([initialErrorMessage])
	const { state , setState, handleInput } = useInput<UserAuth>(initialUserAuth)
	const [, startTransition] = useTransition()

	const loginUser = async () => {
		await login('auth/login', state).then((data) => {
			startTransition(() => validItem(data))
		}).catch((error) => { setError(error) })
	}
	const validItem = (data: any) => {
        if (data?.accessToken) {
            setState(data)
            setError([initialErrorMessage])
            refresh()
        } else {
            startTransition(() => setError(data))
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
					<p>Entre com suas credenciais</p>
				</div>
				<form action={loginUser} method="post" id="captchaForm">
					<div className="form-group">
						<input type="text" id="username" name="username" placeholder=" " required value={state.username} onChange={handleInput}
							className="form-group__input"/>
							<i className="fas fa-user form-group__icon"></i>
							<label htmlFor="username" className="form-group__label">Nome de usuário</label>
					</div>
					<div className="form-group">
						<input type="password" id="password" name="password" placeholder=" " required value={state.password} onChange={handleInput}
							className="form-group__input"/>
							<i className="fas fa-lock form-group__icon"></i>
							<label htmlFor="password" className="form-group__label">Senha</label>
							<i className="fas fa-eye toggle-password" id="togglePassword"></i>
					</div>
					<div className="form-group">
						<input type="text" id="totpKey" name="totpKey" placeholder=" " required value={state.totpKey} onChange={handleInput}
							className="form-group__input"/>
							<i className="fas fa-key form-group__icon"></i>
							<label htmlFor="totpKey" className="form-group__label">Autenticador</label>
					</div>
					<input type="hidden" id="captchaToken" name="captchaToken" />
					<button type="submit" className="submit-button">Entrar</button>
				</form>
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