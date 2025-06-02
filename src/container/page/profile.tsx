import { useState, ChangeEvent, useTransition, useEffect } from 'react'
import { User, initialUser } from "../../component/user"
import { ErrorMessage, initialErrorMessage } from '../../assets/error/errorMessage'
import { changePassword, retrieve } from '../../service/service.crud'
import { Button } from '../template/button/button'
import { logout } from '../../service/service.crud'
import { getPayload } from '../../service/service.token'
import { useNavigate } from 'react-router-dom'
import { Header } from './header'
import { Search } from '../../component/search'

export const Profile = () => {
    const [state, setState] = useState<User>(initialUser)
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [ispending, startTransition] = useTransition()
    const navigate = useNavigate();

    useEffect(() => {
        {ispending}
        retrieveItem()
    }, [])
    const retrieveItem = async () => {
        let searched: Search = {page: 0, size: 20, sort: {key: 'username', order: 'ASC'}, value: getPayload().sub}
        await retrieve('userEntity', searched).then((data: any) => {
            startTransition(() => setState(data?.content[0]))
        }).catch(() => { networkError() })
        setState({ ...state, password: '' })
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
    const networkError = () => {
        setError([{ field: 'DTO', message: 'Network Error' }])
    }
    const logoutUser = async () => {
        navigate('/login')
        logout()
        resetItem()
    }
    const validation = (name: string): string[] => {
        let vector: string[] = []
        error?.map((element: any) => { if (name == element.field) return vector.push(element?.message) })
        return vector
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setState({ ...state, [event.target.name]: value })
    }
    const changePasswordItem = async () => {
        await changePassword(state).then((data) => {
            startTransition(() => validItem(data))
        }).catch(() => { networkError() })
    }
    return (
        <>
            <Header title='perfil' function={logoutUser}/>
            <header className='header'>
                <div>
                    <span className='inputgroup tooltip' data-tip={validation("password")} >
                        <input type={'password'} required name={'password'} value={state.password} onChange={handleInputChange} autoComplete='off' />
                        <label htmlFor={"password"}>senha</label>
                    </span>
                    <Button category='primary' function={changePasswordItem} name='Trocar'/>
                </div>
                <ul>
                    <li><input type="checkbox" disabled checked={/\d/.test(state.password)} />{/\d/.test(state.password) ? 'OK, contém números' : 'não contém números'}</li>
                    <li><input type="checkbox" disabled checked={/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(state.password)} />{/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(state.password) ? 'OK, contém caracteres especiais' : 'não contém caracteres especiais'}</li>
                    <li><input type="checkbox" disabled checked={/[a-z]/.test(state.password)} />{/[a-z]/.test(state.password) ? 'OK, contém letras minúsculas' : 'não contém letras minúsculas'}</li>
                    <li><input type="checkbox" disabled checked={/[A-Z]/.test(state.password)} />{/[A-Z]/.test(state.password) ? 'OK, contém letras maiúsculas' : 'não contém letras maiúsculas'}</li>
                    <li><input type="checkbox" disabled checked={state.password.length >= 10} />{state.password.length >= 10 ? 'OK, contém 10 caracteres' : 'não contém 10 caracteres'}</li>
                </ul>
            </header>
        </>
    );
}