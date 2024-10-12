import { ChangeEvent, useState } from "react"
import { api } from "../api/api";

export const useInput = <T extends Object>(data: T) => {
    const [state, setState] = useState<T>(data)
    
    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        // if (new RegExp(event.target.pattern).test(event.target.value) || event.target.value === '') { 
            setState({ ...state, [event.target.name]: value })
        // }
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