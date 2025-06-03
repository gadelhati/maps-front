import { Country, initialCountry } from "./country";
import { Identifiable, initialHateoas } from "./identifiable";

export interface State extends Identifiable {
    readonly id: string,
    code: string,
    name: string,
    country: Country,
}
export interface StateValidation {
    readonly id: string,
    readonly code: string,
    readonly name: string,
}
export const initialStateValidation: StateValidation = {
    id: `^[a-zA-Z0-9]+$`,
    code: `^[a-zA-Z0-9]+$`,
    name: `^[a-zA-Z0-9]+$`,
}
export const initialState : State = {
    id: '',
    links: initialHateoas,
    code: '',
    name: '',
    country: initialCountry,
}