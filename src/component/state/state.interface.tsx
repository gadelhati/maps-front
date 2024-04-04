import { Country } from "../country/country.interface";

export interface State {
    readonly id: string,
    code: string,
    name: string,
    country?: Country,
}