import { Country, initialCountry } from "./country";
import { Hateoas } from "./hetoas";

export interface State extends Hateoas {
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
    code: `^[0-9]+$`,
    name: `^[0-9]+$`,
}
export const initialState : State = {
    id: '',
    code: '',
    name: '',
    country: initialCountry,
	links: {
        rel: '',
        href: '',
    },
}