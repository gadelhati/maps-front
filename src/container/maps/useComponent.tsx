import { ChangeEvent, useEffect, useState } from "react"
import { retrieve } from "../../service/service.crud"
import { GaugeStation, initialGaugeStation } from "../../component/gauge_station"
import { Point } from "../../component/point"

export const useComponent = <T extends { coordinates: [number, number] }>(object: T, url: string) => {
    const [ order, setOrder ] = useState<number>(0)
    const [ state, setState ] = useState<T>(object)
    const [ list, setList ] = useState<T[]>([object])

    const [ pointList, setPointList ] = useState<Point[]>([])
    const [ componentList, setComponentList ] = useState<GaugeStation[]>([initialGaugeStation])

    useEffect(()=> {
        // setList(list)
        // console.log("typeof: ", typeof object)
        // console.log("1: ", Object.prototype.constructor(object))
        // console.log("2: ", Object.prototype.valueOf)
        // console.log(add.name)
        get()
    }, [])
    const add = () => {
        setList([...list, object])
    }
    const get = async () => {
        await retrieve(url).then((data: any) => {
            // startTransition(() => setPageable(data))
            // startTransition(() => setStates(data.content))
            setComponentList(data.content)
            console.log('get: ', data.content)
            ppp()
        })//.catch(() => { networkError() })
    }
    const ppp = () => {
        console.log('componentList: ', componentList)
        let gat: Point[] = []
        componentList.forEach((element) => {
            gat.push(element.point)
        });
        setPointList(gat)
        console.log('gat: ', gat)
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        if (new RegExp(event.target.pattern).test(event.target.value) || event.target.value === '') { 
            setState({...state,[event.target.name]: value})
        } 
    }
    const handleChangeList = (event: ChangeEvent<HTMLInputElement>) => {
        if (new RegExp(event.target.pattern).test(event.target.value) || event.target.value === '') {
            setList([
                ...list.slice(0, order),
                {...list[order], [event.target.name]: [event.target.value]},
                ...list.slice(order + 1),
            ])
        }
    }
    const handleChangeLongitude = (event: ChangeEvent<HTMLInputElement>) => {
        if (new RegExp(event.target.pattern).test(event.target.value) || event.target.value === '') { 
            setList([
                ...list.slice(0, order),
                {...list[order], [event.target.name]: [Number(event.target.value), list[order].coordinates[1]]},
                ...list.slice(order + 1),
            ])
        }
    }
    const handleChangeLatitude = (event: ChangeEvent<HTMLInputElement>) => {
        setList([
            ...list.slice(0, order),
            {...list[order], [event.target.name]: [list[order].coordinates[0], Number(event.target.value)]},
            ...list.slice(order + 1),
        ])
    }
    const remove = () => {
        list.splice(order, 1)
    }
    return {
        state,
        list,
        add,
        setOrder,
        handleChange,
        handleChangeList,
        handleChangeLongitude,
        handleChangeLatitude,
        remove,
    }
}