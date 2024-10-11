import { Address } from "./address";
import { initialCountry } from "./country";
import { Country } from "./country";

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

export interface NaturalPerson extends Person {
    cpf: string,
    rg: string,
}

export const initialNaturalPerson: NaturalPerson = {
    id: '',
    name: '',
    birth: new Date(),
    email: '',
    telephone: [],
    country: initialCountry,
    address: [],
    cpf: '',
    rg: '',
}

export interface LegalEntity extends Person {
    cnpj: string,
}

export const initialLegalEntity: LegalEntity = {
    id: '',
    name: '',
    birth: new Date(),
    email: '',
    telephone: [],
    country: initialCountry,
    address: [],
    cnpj: '',
}