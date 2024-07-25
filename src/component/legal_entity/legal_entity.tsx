import { initialCountry } from "../country/country.initial";
import { Person } from "../person/person";

export interface LegalEntity extends Person {
    cnpj: number,
}

export const initialLegalEntity: LegalEntity = {
    id: '',
    name: '',
    birth: new Date(),
    email: '',
    telephone: [],
    country: initialCountry,
    address: [],
    cnpj: 0,
}