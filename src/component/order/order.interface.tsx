import { Address, initialAddress } from "../address/address.interface";
import { initialOrderItem, OrderItem } from "../order.item/order.item";

export interface Order {
    readonly id: string,
    category: string,
    totalCost: number,
    orderItem: OrderItem[],
    addressSeller: Address,
    addressBuyer: Address,
}

export const initialOrder: Order = {
    id: '',
    category: '',
    totalCost: 0,
    orderItem: [initialOrderItem],
    addressSeller: initialAddress,
    addressBuyer: initialAddress,
}