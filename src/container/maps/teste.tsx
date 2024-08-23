import { ChangeEvent } from "react"

export const handleChange = (state: any, setState: any, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    if (new RegExp(event.target.pattern).test(event.target.value) || event.target.value === '') {
        setState({ ...state, [event.target.name]: value })
    }
}