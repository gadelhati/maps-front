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
    readonly cepNumber: string,
    readonly cepCategory: string,
    readonly cepSubCategory: string,
    readonly neighborhood: string,
    readonly address: string,
    readonly complement: string,
    readonly IBGECode: string,
    readonly city: string,
}
export const initialAddressValidation: AddressValidation = {
    id: `^[a-zA-Z0-9]+$`,
    cepNumber: `^[a-zA-Z0-9]+$`,
    cepCategory: `^[a-zA-Z0-9]+$`,
    cepSubCategory: `^[a-zA-Z0-9]+$`,
    neighborhood: `^[a-zA-Z0-9]+$`,
    address: `^[a-zA-Z0-9]+$`,
    complement: `^[a-zA-Z0-9]+$`,
    IBGECode: `^[a-zA-Z0-9]+$`,
    city: `^[a-zA-Z0-9]+$`,
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