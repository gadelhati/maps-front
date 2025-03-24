import { initialCity } from "./city";
import { City } from "./city";

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
}
export interface AddressValidation {
    readonly id: string,
    readonly name: string,
    readonly privileges: string[],
}
export const initialAddressValidation: AddressValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[0-9]+$`,
    privileges: [`^[0-9]+$`],
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
}