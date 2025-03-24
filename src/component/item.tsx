import { Hateoas } from "./hetoas";
import { initialLot, Lot } from "./lot";

export interface Item extends Hateoas {
    readonly id: string,
    sku: string,
    gtin: string,
    ncm: string,
    cest: string,
    cfop: string,
    category: string,
    brand: string,
    model: string,
    minimumStock: number,
    maximumStock: number,
    reservedStock: number,
    availableStock: number,
    bulk: number,
    grossWeightMeasurement: number,
    netWeightMeasurement: number,
    grossWeight: number,
    netWeight: number,
    url: string,
    lot: Lot,
}
export interface ItemValidation {
    readonly id: string,
    readonly name: string,
    readonly privileges: string[],
}
export const initialItemValidation: ItemValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[0-9]+$`,
    privileges: [`^[0-9]+$`],
}
export const initialItem: Item = {
    id: '',
    sku: '',
    gtin: '',
    ncm: '',
    cest: '',
    cfop: '',
    category: '',
    brand: '',
    model: '',
    minimumStock: 0,
    maximumStock: 0,
    reservedStock: 0,
    availableStock: 0,
    bulk: 0,
    grossWeightMeasurement: 0,
    netWeightMeasurement: 0,
    grossWeight: 0,
    netWeight: 0,
    url: '',
    lot: initialLot,
	links: {
        rel: '',
        href: '',
    },
}