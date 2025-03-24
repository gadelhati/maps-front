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
    readonly birth: string,
    readonly email: string,
    readonly telephone: string,
    readonly country: string,
    readonly address: string,
}
export const initialPersonValidation: PersonValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[a-zA-Z0-9]+$`,
    birth: `/^\d{2}\/\d{2}\/\d{4}$/`,
    email: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`,
    telephone: `/^\+\d{2} \(\d{2}\) \d{1,2} \d{4}-\d{4}$/`,
    country: `^[a-zA-Z0-9]+$`,
    address: `^[a-zA-Z0-9]+$`,
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
    links: {
        rel: '',
        href: '',
    },
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
    links: {
        rel: '',
        href: '',
    },
}