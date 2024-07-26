import { initialCity } from "../city/city";
import { City } from "../city/city";

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