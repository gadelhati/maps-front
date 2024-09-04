import { ChangeEvent, useState } from "react"

export const useInput = <T extends Object>(data: T) => {
    const [state, setState] = useState<T>(data)
    const handleInput = (event: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        // if (new RegExp(event.target.pattern).test(event.target.value) || event.target.value === '') { 
            setState({...state, [event.target.name]: value})
        // }
    }
    return {state, setState, handleInput}
}