import { Address } from "../address/address";
import { initialCountry } from "../country/country";
import { Country } from "../country/country";

export interface Person {
    readonly id: string,
    name: string,
    birth: Date,
    email: string,
    telephone: string[],
    country: Country,
    address: Address[],
}

export const initialPerson: Person = {
    id: '',
    name: '',
    birth: new Date(),
    email: '',
    telephone: [],
    country: initialCountry,
    address: [],
}