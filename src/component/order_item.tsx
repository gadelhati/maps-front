import { initialItem, Item } from "./item";

export interface OrderItem {
    readonly id: string,
    unitPrice: number,
    discount: number,
    quantity: number,
    totalCost: number,
    item: Item,
}

export const initialOrderItem : OrderItem = {
    id: '',
    unitPrice: 0,
    discount: 0,
    quantity: 0,
    totalCost: 0,
    item: initialItem,
}