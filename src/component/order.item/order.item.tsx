import { initialProduct, Product } from "../product/product";

export interface OrderItem {
    readonly id: string,
    unitPrice: number,
    discount: number,
    quantity: number,
    product: Product,
}

export const initialOrderItem : OrderItem = {
    id: '',
    unitPrice: 0,
    discount: 0,
    quantity: 0,
    product: initialProduct,
}