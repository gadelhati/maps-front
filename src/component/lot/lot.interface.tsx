export interface Lot {
    readonly id: string,
    number: string,
    manufacturing: Date,
    overdue: Date,
}

export const initialLot: Lot = {
    id: '',
    number: '',
    manufacturing: new Date(),
    overdue: new Date(),
}