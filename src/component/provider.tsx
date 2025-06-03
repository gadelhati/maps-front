import { initialCountry } from "./country";
import { initialHateoas } from "./identifiable";
import { LegalEntity } from "./person";
import { initialStock, Stock } from "./stock";

export interface Provider extends LegalEntity {
    readonly id: string,
    deliveryTime: Date,
    cost: number,
    quality: number,
    paymentTerms: number,
    flexibility: number,
    service: number,
    stock: Stock,
}
export interface ProviderValidation {
    readonly id: string,
    readonly deliveryTime: string,
    readonly cost: string,
    readonly quality: string,
    readonly paymentTerms: string,
    readonly flexibility: string,
    readonly service: string,
    readonly stock: string,
}
export const initialProviderValidation: ProviderValidation = {
    id: `^[a-zA-Z0-9]+$`,
    deliveryTime: `^[a-zA-Z0-9]+$`,
    cost: `^[a-zA-Z0-9]+$`,
    quality: `^[a-zA-Z0-9]+$`,
    paymentTerms: `^[a-zA-Z0-9]+$`,
    flexibility: `^[a-zA-Z0-9]+$`,
    service: `^[a-zA-Z0-9]+$`,
    stock: `^[a-zA-Z0-9]+$`,
}
export const initialProvider: Provider = {
    id: '',
    links: initialHateoas,
    name: '',
    birth: new Date(),
    email: '',
    telephone: [],
    country: initialCountry,
    address: [],
    cnpj: '',
    deliveryTime: new Date(),
    cost: 0,
    quality: 0,
    paymentTerms: 0,
    flexibility: 0,
    service: 0,
    stock: initialStock,
}