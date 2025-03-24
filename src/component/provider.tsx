import { initialCountry } from "./country";
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
    readonly name: string,
    readonly privileges: string[],
}
export const initialProviderValidation: ProviderValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[0-9]+$`,
    privileges: [`^[0-9]+$`],
}
export const initialProvider: Provider = {
    id: '',
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
	links: {
        rel: '',
        href: '',
    },
}