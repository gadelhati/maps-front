import { initialCountry } from "../country/country";
import { Person } from "../person/person";

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