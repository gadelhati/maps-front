// import { initialOrder, Order } from "./order";
import { Identifiable, initialHateoas } from "./identifiable"

export interface Stock extends Identifiable {
    readonly id: string,
    maximumBulk: number,
    currentBulk: number,
    order: [],
    // order: [Order],
}
export interface StockValidation {
    readonly id: string,
    readonly maximumBulk: string,
    readonly currentBulk: string,
    readonly order: string,
}
export const initialStockValidation: StockValidation = {
    id: `^[a-zA-Z0-9]+$`,
    maximumBulk: `^[0-9]+$`,
    currentBulk: `^[0-9]+$`,
    order: `^[a-zA-Z0-9]+$`,
}
export const initialStock: Stock = {
    id: '',
    links: initialHateoas,
    maximumBulk: 0,
    currentBulk: 0,
    order: [],
    // order: [initialOrder],
}