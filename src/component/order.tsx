import { Hateoas } from "./hetoas";
import { initialOrderItem, OrderItem } from "./orderItem";
import { initialPerson, Person } from "./person";
import { initialStock, Stock } from "./stock";

export interface Order extends Hateoas {
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
	links: {
        rel: '',
        href: '',
    },
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