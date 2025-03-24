import { Hateoas } from "./hetoas";
import { initialItem, Item } from "./item";

export interface OrderItem extends Hateoas {
    readonly id: string,
    unitPrice: number,
    discount: number,
    quantity: number,
    totalCost: number,
    item: Item,
}
export interface OrderItemValidation {
    readonly id: string,
    readonly name: string,
    readonly privileges: string[],
}
export const initialOrderItemValidation: OrderItemValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[0-9]+$`,
    privileges: [`^[0-9]+$`],
}
export const initialOrderItem : OrderItem = {
    id: '',
    unitPrice: 0,
    discount: 0,
    quantity: 0,
    totalCost: 0,
    item: initialItem,
	links: {
        rel: '',
        href: '',
    },
}