import { initialCountry } from "../country/country";
import { LegalEntity } from "../legal_entity/legal_entity";
import { initialStock, Stock } from "../stock/stock";

export interface Provider extends LegalEntity {
    deliveryTime: Date,
    cost: number,
    quality: number,
    paymentTerms: number,
    flexibility: number,
    service: number,
    stock: Stock,
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
}