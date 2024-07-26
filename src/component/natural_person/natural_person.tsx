import { initialCountry } from "../country/country";
import { Person } from "../person/person";

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