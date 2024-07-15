import { initialCity } from "../city/city.initial";
import { City } from "../city/city.interface";
import { initialPerson, Person } from "../person/person";

export interface Address {
    readonly id: string,
    cepNumber: string,
    cepCategory: string,
    cepSubCategory: string,
    neighborhood: string,
    address: string,
    complement: string,
    IBGECode: string,
    city: City,
    person: Person,
}

export const initialAddress: Address = {
    id: '',
    cepNumber: '',
    cepCategory: '',
    cepSubCategory: '',
    neighborhood: '',
    address: '',
    complement: '',
    IBGECode: '',
    city: initialCity,
    person: initialPerson,
}