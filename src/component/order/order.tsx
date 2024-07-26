import { initialOrderItem, OrderItem } from "../order_item/order_item";
import { initialPerson, Person } from "../person/person";
import { initialStock, Stock } from "../stock/stock";

export interface Order {
    readonly id: string,
    category: string,
    totalCost: number,
    orderItem: OrderItem[],
    stock: Stock,
    person: Person,
}

export const initialOrder: Order = {
    id: '',
    category: '',
    totalCost: 0,
    orderItem: [initialOrderItem],
    stock: initialStock,
    person: initialPerson,
}