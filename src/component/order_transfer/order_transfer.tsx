import { initialOrderItem } from "../order_item/order_item";
import { Order } from "../order/order";
import { initialPerson } from "../person/person";
import { initialStock, Stock } from "../stock/stock";

export interface OrderTransfer extends Order {
    starts: Date,
    finish: Date,
    // stock: Stock,
}

export const initialOrderTransfer: OrderTransfer = {
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