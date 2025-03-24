import { startTransition, useEffect, useState } from "react"
import { initialAddress } from "../../component/address"
import { initialItem, Item } from "../../component/item"
import { initialOrder, Order } from "../../component/order"
import { initialOrderItem } from "../../component/orderItem"
import { initialLot } from "../../component/lot"
import { initialPerson } from "../../component/person"
import { initialStock, Stock } from "../../component/stock"
import { retrieve } from "../../service/service.crud"
import { initialSearch } from "../../component/search"

export const Wms = () => {
    const [address, setAddress] = useState([initialAddress])
    const [lot, setLot] = useState([initialLot])
    const [order, setOrder] = useState([initialOrder])
    const [orderItem, setOrderItem] = useState([initialOrderItem])
    const [person, setPerson] = useState([initialPerson])
    const [item, setItem] = useState<Item[]>([initialItem])
    const [stock, setStock] = useState<Stock[]>([initialStock])
    
    useEffect(()=>{
        retrieve('address', initialSearch).then((data: any) => {
            startTransition(() => setAddress(data.content))
        })
        retrieve('lot', initialSearch).then((data: any) => {
            startTransition(() => setLot(data.content))
        })
        retrieve('order', initialSearch).then((data: any) => {
            startTransition(() => setOrder(data.content))
        })
        retrieve('orderItem', initialSearch).then((data: any) => {
            startTransition(() => setOrderItem(data.content))
        })
        retrieve('person', initialSearch).then((data: any) => {
            startTransition(() => setPerson(data.content))
        })
        retrieve('item', initialSearch).then((data: any) => {
            startTransition(() => setItem(data.content))
        })
        retrieve('stock', initialSearch).then((data: any) => {
            startTransition(() => setStock(data.content))
        })
    },[])
    return (
        <div>
            <div>
                <div>Address: {address[0].city.name}</div>
                <div>Lot: {lot[0].number}</div>
                <div>Order: 
                    {order.map((element: Order)=>{
                        return <p key={Math.random()}>{element?.person?.name}</p>
                    })}
                </div>
                <div>Order Item: {JSON.stringify(orderItem[0].item.lot.overdue)}</div>
                <div>Person: {person[0].name}</div>
                <div>Item: {item[0].id}</div>
                <div>Stock: {stock[0].id}</div>
            </div>
        </div>
    )
}