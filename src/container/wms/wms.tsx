import { startTransition, useEffect, useState } from "react"
import { Address, initialAddress } from "../../component/address/address"
import { initialItem, Item } from "../../component/item/item"
import { initialOrder, Order } from "../../component/order/order"
import { initialOrderItem } from "../../component/order_item/order_item"
import { initialLot } from "../../component/lot/lot"
import { initialPerson } from "../../component/person/person"
import { initialStock, Stock } from "../../component/stock/stock"
import { retrieve } from "../../service/service.crud"

export const Wms = () => {
    const [address, setAddress] = useState([initialAddress])
    const [lot, setLot] = useState([initialLot])
    const [order, setOrder] = useState([initialOrder])
    const [orderItem, setOrderItem] = useState([initialOrderItem])
    const [person, setPerson] = useState([initialPerson])
    const [item, setItem] = useState<Item[]>([initialItem])
    const [stock, setStock] = useState<Stock[]>([initialStock])
    
    useEffect(()=>{
        retrieve('address', 0, 5, 'id', '', 'ASC').then((data: any) => {
            startTransition(() => setAddress(data.content))
        })
        retrieve('lot', 0, 5, 'id', '', 'ASC').then((data: any) => {
            startTransition(() => setLot(data.content))
        })
        retrieve('order', 0, 5, 'id', '', 'ASC').then((data: any) => {
            startTransition(() => setOrder(data.content))
        })
        retrieve('orderItem', 0, 5, 'id', '', 'ASC').then((data: any) => {
            startTransition(() => setOrderItem(data.content))
        })
        retrieve('person', 0, 5, 'id', '', 'ASC').then((data: any) => {
            startTransition(() => setPerson(data.content))
        })
        retrieve('item', 0, 5, 'id', '', 'ASC').then((data: any) => {
            startTransition(() => setItem(data.content))
        })
        retrieve('stock', 0, 5, 'id', '', 'ASC').then((data: any) => {
            startTransition(() => setStock(data.content))
        })
    },[])
    return (
        <div>
            <div>
                <div>Address: {JSON.stringify(address[0].city.name)}</div>
                <div>Lot: {JSON.stringify(lot[0].number)}</div>
                <div>Order: {JSON.stringify(order[0])}
                    {order.map((element: Order)=>{
                        return <p key={Math.random()}>{JSON.stringify(element?.person)}</p>
                    })}
                </div>
                <div>Order Item: {JSON.stringify(orderItem[0].item.category)}</div>
                <div>Person: {JSON.stringify(person[0].name)}</div>
                <div>Item: {JSON.stringify(item[0].category)}</div>
                <div>Stock: {JSON.stringify(stock[0].currentBulk)}</div>
            </div>
        </div>
    )
}