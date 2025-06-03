import { Identifiable, initialHateoas } from "./identifiable";
import { initialState, State } from "./state";

export interface City extends Identifiable {
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
    links: initialHateoas,
    code: '',
    name: '',
    state: initialState,
}