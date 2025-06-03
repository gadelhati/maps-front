import { Identifiable, initialHateoas } from "./identifiable"

export interface Lot extends Identifiable {
    readonly id: string,
    number: string,
    manufacturing: Date,
    overdue: Date,
}
export interface LotValidation {
    readonly id: string,
    readonly number: string,
    readonly manufacturing: string,
    readonly overdue: string,
}
export const initialLotValidation: LotValidation = {
    id: `^[a-zA-Z0-9]+$`,
    number: `^[a-zA-Z0-9]+$`,
    manufacturing: `^[a-zA-Z0-9]+$`,
    overdue: `^[a-zA-Z0-9]+$`,
}
export const initialLot: Lot = {
    id: '',
    links: initialHateoas,
    number: '',
    manufacturing: new Date(),
    overdue: new Date(),
}