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
        api.get<T>(`/state?value=${event.target.value}`, { params: { page: 0, size: 20, sort: `id,ASC` } }
        ).then((response: any) => {
            setState({ ...state, state: response.data.content[0] })
        })
    }
    return { state, setState, handleInput, handleSelect }
}