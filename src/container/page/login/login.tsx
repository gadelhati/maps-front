import { useState, ChangeEvent, useTransition, useEffect, KeyboardEvent } from 'react'
import { UserAuth, initialUserAuth } from "../../../component/user"
import { ErrorMessage } from '../../../assets/error/errorMessage'
import { initialErrorMessage } from '../../../assets/error/errorMessage.initial'
import { login, retrieve } from '../../../service/service.crud'
import { Button } from '../../template/button/button';
import { logout } from '../../../service/service.crud'
import { getPayload, isValidToken } from '../../../service/service.token'
import logo from '../../../assets/image/user-4254.svg'
import { Home } from '../home'
import '../../page/login/login.css'
import '../../template/input/input.css'
import '../../template/tooltip.css'
import '../../template/toast.css'
import { Search } from '../../../component/search'

export const Login = () => {
    const [state, setState] = useState<UserAuth>(initialUserAuth)
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [ispending, startTransition] = useTransition()

    useEffect(() => {
        retrieveItem()
    }, [])
    const retrieveItem = async () => {
        let searched: Search = {page: 0, size: 20, sort: {key: 'username', order: 'ASC'}, value: getPayload().sub}
        await retrieve('user', searched).then((data: any) => {
            if(data.content[0]) startTransition(() => setState(data.content[0]))
        }).catch((error) => { setError(error) })
    }
    const refresh = () => {
        window.location.reload()
    }
    const resetItem = () => {
        setState(initialUserAuth)
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
                        <img src={logo} className='rotate' width="180" height="180"></img>
                        <div className='container tooltip' data-tip={validation('username')}>
                            <input type={'text'} data-tip={validation('username').length} required autoFocus name={'username'} value={state.username} onChange={handleInputChange} autoComplete='off' />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className='container tooltip' data-tip={validation('password')}>
                            <input type={'password'} data-tip={validation('password').length} required name={'password'} value={state.password} onChange={handleInputChange} autoComplete='off' />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className='container tooltip' data-tip={validation('totpKey')}>
                            <input type={'text'} data-tip={validation('totpKey').length} required name={'totpKey'} value={state.totpKey} onChange={handleInputChange} autoComplete='off' />
                            <label htmlFor="totpKey">totpKey</label>
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