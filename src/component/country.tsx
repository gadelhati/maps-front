import { Identifiable, initialHateoas } from "./identifiable"

export interface Country extends Identifiable {
    readonly id: string,
    code: number,
    name: string,
}
export interface CountryValidation {
    readonly id: string,
    readonly code: string,
    readonly name: string,
}
export const initialCountryValidation: CountryValidation = {
    id: `^[a-zA-Z0-9]+$`,
    code: `^[0-9]+$`,
    name: `^[a-zA-Z0-9]+$`,
}
export const initialCountry: Country = {
    id: '',
    links: initialHateoas,
    code: 0,
    name: '',
}