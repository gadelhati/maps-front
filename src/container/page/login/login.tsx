import { useState, ChangeEvent, useTransition, useEffect, KeyboardEvent } from 'react'
import { User } from "../../../component/user/user.interface"
import { initialUser } from '../../../component/user/user'
import { ErrorMessage } from '../../../assets/error/errorMessage'
import { initialErrorMessage } from '../../../assets/error/errorMessage.initial'
import { login, retrieve } from '../../../service/service.crud'
import { Button } from '../../template/button/button';
import { logout } from '../../../service/service.crud'
import { getPayload, isValidToken } from '../../../service/service.token'
import logo from '../../../assets/image/giphy.gif'
import { Home } from '../home'
import './login.css'
import '../../template/input/input.css'
import '../../template/tooltip/tooltip.css'
import '../../template/toast/toast.css'

export const Login = () => {
    const [state, setState] = useState<User>(initialUser)
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [ispending, startTransition] = useTransition()

    useEffect(() => {
        retrieveItem()
    }, [])
    const retrieveItem = async () => {
        await retrieve('user', 0, 20, 'username', getPayload().sub).then((data: any) => {
            startTransition(() => setState(data?.content[0]))
        }).catch((error) => { setError(error) })
    }
    const refresh = () => {
        window.location.reload()
    }
    const resetItem = () => {
        setState(initialUser)
        setError([initialErrorMessage])
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
    const loginUser = async () => {
        await login('auth/login', state).then((data) => {
            startTransition(() => validItem(data))
        }).catch((error) => { setError(error) })
    }
    const logoutUser = async () => {
        logout()
        resetItem()
    }
    const validation = (name: string): string[] => {
        let vector: string[] = []
        if (Array.isArray(error)) {
            if (name === '') {
                error?.map((element: any) => { if (element.field?.startsWith("DTO")) return vector.push(element?.message + '. ') })
            } else {
                error?.map((element: any) => { if (name == element.field) return vector.push(element?.message + '. ') })
            }
        }
        return vector
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setState({ ...state, [event.target.name]: value })
    }
    const submit = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            loginUser()
        }
    }
    return (
        <>
            {isValidToken() ?
                <Home></Home>
                :
                <section>
                    <article onKeyDown={submit}>
                        <img src={logo} width="220" height="220"></img>
                        <div className='container tooltip' data-tip={validation('username')}>
                            <input type={'text'} data-tip={validation('username').length} required autoFocus name={'username'} value={state.username} onChange={handleInputChange} autoComplete='off' />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className='container tooltip' data-tip={validation('password')}>
                            <input type={'password'} data-tip={validation('password').length} required name={'password'} value={state.password} onChange={handleInputChange} autoComplete='off' />
                            <label htmlFor="password">Password</label>
                        </div>
                        {!isValidToken() && <Button category={'primary'} function={loginUser} name='Login'/>}
                        {isValidToken() && <Button category={'secondary'} function={logoutUser} name='Logout'/>}
                        {ispending}
                        <span>
                            {Array.isArray(error) && error.map((erro: ErrorMessage) => {
                                return <p key={Math.random()}>{erro.message === "Unauthorized" && "Não Autorizado"}</p>
                            })}
                        </span>
                    </article>
                    <ul className="toast notifications"></ul>
                </section>
            }
        </>
    );
}