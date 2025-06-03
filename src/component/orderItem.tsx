import { Identifiable, initialHateoas } from "./identifiable";
import { initialItem, Item } from "./item";

export interface OrderItem extends Identifiable {
    readonly id: string,
    unitPrice: number,
    discount: number,
    quantity: number,
    totalCost: number,
    item: Item,
}
export interface OrderItemValidation {
    readonly id: string,
    readonly unitPrice: string,
    readonly discount: string,
    readonly quantity: string,
    readonly totalCost: string,
    readonly item: string,
}
export const initialOrderItemValidation: OrderItemValidation = {
    id: `^[a-zA-Z0-9]+$`,
    unitPrice: `^[0-9]+$`,
    discount: `^[0-9]+$`,
    quantity: `^[0-9]+$`,
    totalCost: `^[0-9]+$`,
    item: `^[a-zA-Z0-9]+$`,
}
export const initialOrderItem : OrderItem = {
    id: '',
    links: initialHateoas,
    unitPrice: 0,
    discount: 0,
    quantity: 0,
    totalCost: 0,
    item: initialItem,
}