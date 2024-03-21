import { useState, ChangeEvent, useEffect, useTransition } from 'react'
import { ErrorMessage } from '../../../assets/error/errorMessage'
import { initialErrorMessage } from '../../../assets/error/errorMessage.initial'
import { InputInterface } from './assets/input.interface'
import { retrieve } from '../../../service/service.crud'
import { SubAtributeSet } from '../../../component/atribute/subAtribute'
import { SetAtributes } from './assets/setAtributes'
import { initialInput } from './assets/input.initial'
import './assets/input.css'

export const Input = (object: InputInterface) => {
    const [state, setState] = useState<any>(initialInput)
    const [subStates, setSubStates] = useState<Object[]>(SubAtributeSet(state))
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [ispending, startTransition] = useTransition()

    useEffect(() => {
        {JSON.stringify(ispending)}
        setState(SetAtributes(object))
        loadSubStates()
    }, [object.show])
    const validation = (name: string): string[] => {
        let vector: string[] = []
        if(Array.isArray(error)){
            error?.map((element: any) => { if (name == element.field) return vector.push(element?.message+'. ') })
        }
        return vector
    }
    const loadSubStates = async () => {
        Array.isArray(object.value) &&
            retrieve(object.name, 0, 1000, '', '').then((data: any) => {
                startTransition(() => {
                    setSubStates(data.content)
                })
            }).catch(() => { networkError() })
    }
    // const removeTimeFromDate = (date: any) => {
    //     let aux = new Date(date)
    //     return new Date(aux.getFullYear(), aux.getMonth() + 1, aux.getDate()).toLocaleDateString('fr-CA');
    // }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setState({ ...state, value: value })
    }
    const updateFather = () => {
        object.childToParent(state)
    }
    const handleInputChangeSubSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
        await retrieve(event.target.name, 0, 1000, event.target.name, event.target.value).then((data: any) => {
            setState({ ...state, value: data?.content[0] })
        }).catch(() => { networkError() })
    }
    const handleInputChangeSubSelectArray = async (event: ChangeEvent<HTMLSelectElement>) => {
        await retrieve(event.target.name, 0, 1000, 'id', event.target.value).then((data: any) => {
            setState({ ...state, value: [data?.content[0]] })
        }).catch(() => { networkError() })
    }
    const networkError = () => {
        setError([{ field: 'DTO', message: 'Network Error' }])
    }
    return (
        <span>
            {/* {state.type === 'checkbox' || state.type === 'date' || state.value === null && state.type === 'number' || state.value === null && state.type === 'string' || state.type !== 'undefined' ? */}
            { Array.isArray(state.value) ?
                <select key={Math.random()} name={state.name} onBlur={updateFather} onChange={Array.isArray(state.value) ? handleInputChangeSubSelectArray : handleInputChangeSubSelect}
                    // defaultValue={typeof state.value[0] === 'boolean' ? undefined : state.type === 'date' ? removeTimeFromDate(state.value[0]) : state.value[0]}
                    value={state.value[0]}>
                    <option selected key={Math.random()} value={state.value[0]}>{state.value[0].hasOwnProperty('name') ? state.value[0]?.name : state.value[0]?.id}</option>
                    {subStates?.map(((result: any) => <option key={Math.random()} value={result.id}>{result?.name ? result.name : result.id}</option>))}
                </select>
                :
                <input key={state.name} name={state.name} onBlur={updateFather} onChange={handleInputChange} autoComplete='off' readOnly={state.readOnly} required type={state.type}
                    // defaultValue={typeof state.value === 'boolean' ? undefined : state.type === 'date' ? removeTimeFromDate(state.value) : state.value}    
                    defaultChecked={typeof state.value === 'boolean' ? state.value : undefined}
                    value={typeof state.value === 'boolean' ? undefined : state.value} />
            }
            <label htmlFor={state.name} hidden={state.type === 'hidden' || state.type === 'checkbox' ? true : false} >{state.name}</label>
            <label htmlFor={state.name}>{validation(state.name)}</label>
        </span>
    );
}