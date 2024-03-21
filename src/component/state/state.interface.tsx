import { Country } from "../country/country.interface";

export interface State {
    readonly id: string,
    name: string,
    country?: Country,
}