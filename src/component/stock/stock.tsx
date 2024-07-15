import { initialOrder, Order } from "../order/order.interface";

export interface Stock {
    readonly id: string,
    maximumBulk: number,
    currentBulk: number,
    order: [Order],
}

export const initialStock: Stock = {
    id: '',
    maximumBulk: 0,
    currentBulk: 0,
    order: [initialOrder],
}