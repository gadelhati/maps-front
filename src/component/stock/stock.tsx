// import { initialOrder, Order } from "../order/order";

export interface Stock {
    readonly id: string,
    maximumBulk: number,
    currentBulk: number,
    order: [],
    // order: [Order],
}

export const initialStock: Stock = {
    id: '',
    maximumBulk: 0,
    currentBulk: 0,
    order: [],
    // order: [initialOrder],
}