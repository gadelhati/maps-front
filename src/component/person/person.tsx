import { Address, initialAddress } from "../address/address.interface";
import { initialCountry } from "../country/country.initial";
import { Country } from "../country/country.interface";

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