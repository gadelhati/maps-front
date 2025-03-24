import { Hateoas } from "./hetoas"

export interface Lot extends Hateoas {
    readonly id: string,
    number: string,
    manufacturing: Date,
    overdue: Date,
}
export interface LotValidation {
    readonly id: string,
    readonly name: string,
    readonly privileges: string[],
}
export const initialLotValidation: LotValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[0-9]+$`,
    privileges: [`^[0-9]+$`],
}
export const initialLot: Lot = {
    id: '',
    number: '',
    manufacturing: new Date(),
    overdue: new Date(),
	links: {
        rel: '',
        href: '',
    },
}