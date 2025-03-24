import { Hateoas } from "./hetoas";
import { initialState, State } from "./state";

export interface City extends Hateoas {
    readonly id: string,
    code: string,
    name: string,
    state: State,
}
export interface CityValidation {
    readonly id: string,
    readonly code: string,
    readonly name: string,
    readonly state: string,
}
export const initialCityValidation: CityValidation = {
    id: `^[a-zA-Z0-9]+$`,
    code: `^[0-9]+$`,
    name: `^[a-zA-Z0-9]+$`,
    state: `^[a-zA-Z0-9]+$`,
}
export const initialCity : City = {
    id: '',
    code: '',
    name: '',
    state: initialState,
	links: {
        rel: '',
        href: '',
    },
}