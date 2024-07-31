import { Country, initialCountry } from "./country";

export interface State {
    readonly id: string,
    code: string,
    name: string,
    country: Country,
}
export const initialState : State = {
    id: '',
    code: '',
    name: '',
    country: initialCountry,
}