import { Address } from "./address";
import { initialCountry } from "./country";
import { Country } from "./country";
import { Hateoas } from "./hetoas";

export interface Person extends Hateoas {
    readonly id: string,
    name: string,
    birth: Date,
    email: string,
    telephone: string[],
    country: Country,
    address: Address[],
}
export interface PersonValidation {
    readonly id: string,
    readonly name: string,
    readonly privileges: string[],
}
export const initialPersonValidation: PersonValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[0-9]+$`,
    privileges: [`^[0-9]+$`],
}
export const initialPerson: Person = {
    id: '',
    name: '',
    birth: new Date(),
    email: '',
    telephone: [],
    country: initialCountry,
    address: [],
	links: {
        rel: '',
        href: '',
    },
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