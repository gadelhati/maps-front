import { initialOrderItem, OrderItem } from "../order.item/order.item";
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

export interface OrderTranfer extends Order {
    readonly id: string,
    starts: Date,
    finish: Date,
    // stock: Stock,
}

export const initialOrderTransfer: OrderTranfer = {
    id: '',
    category: '',
    totalCost: 0,
    orderItem: [initialOrderItem],
    stock: initialStock,
    person: initialPerson,
    starts: new Date(),
    finish: new Date(),
    // stock: initialStock,
}