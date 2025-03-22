import { ChangeEvent, useState } from "react"
import { api } from "../api/api";

export const useInput = <T extends Object>(data: T) => {
    const [state, setState] = useState<T>(data)
    
    const handleInput = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLDivElement>) => {
        const target = event.target
        if(target instanceof HTMLDivElement) {
            const { name, value } = target.dataset
            if (name && value) {
                if(name.includes('.')){
                    const [parent, child] = name.split('.')
                    setState(prevState => ({ ...prevState, [parent]:{ ...prevState[parent as keyof typeof prevState], [child]: value === '' ? value : (isNaN(Number(value)) ? value : Number(value)) } }))
                } else {
                    setState(prevState => ({ ...prevState, [name]: value === '' ? value : (isNaN(Number(value)) ? value : Number(value)) }))
                }
            }
        } else if(target instanceof HTMLSelectElement || target instanceof HTMLButtonElement){
            console.log(target.name, target.value)
            const { name, value } = target
            if(name.includes('.')){
                const [parent, child] = target.name.split('.')
                setState(prevState => ({ ...prevState, [parent]:{ ...prevState[parent as keyof typeof prevState], [child]: value === '' ? value : (isNaN(Number(value)) ? value : Number(value)) } }))
            } else {
                setState(prevState => ({ ...prevState, [target.name]: value === '' ? value : (isNaN(Number(value)) ? value : Number(value)) }))
            }
        } else if(target instanceof HTMLInputElement){
            const value = target.type === 'checkbox' ? target.checked : target.value
            // if (new RegExp(target.pattern).test(target.value) || target.value === ``) { 
                if(target.name.includes('.')){
                    const [parent, child] = target.name.split('.')
                    setState(prevState => ({ ...prevState, [parent]:{ ...prevState[parent as keyof typeof prevState], [child]: value === '' ? value : (isNaN(Number(value)) ? value : Number(value)) } }))
                } else {
                    setState(prevState => ({ ...prevState, [target.name]: value === '' ? value : (isNaN(Number(value)) ? value : Number(value)) }))
                }
            // }
        }
    }
    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        api.get<T>(`/${event.target.name}?value=${event.target.value}`, { params: { page: 0, size: 20, sort: `id,ASC` } }
        ).then((response: any) => {
            setState({ ...state, [event.target.name]: response.data.content[0] })
        })
    }
    const handleMultiSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        api.get<T>(`/${event.target.name}?value=${event.target.value}`, { params: { page: 0, size: 20, sort: `id,ASC` } }
        ).then((response: any) => {
            setState({ ...state, [event.target.name]: [response.data.content[0]] })
        })
    }
    return { state, setState, handleInput, handleSelect, handleMultiSelect }
}