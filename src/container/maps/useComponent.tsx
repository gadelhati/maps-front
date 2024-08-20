import { ChangeEvent, startTransition, useEffect, useState } from "react"
import { initialPoint, Point } from "../../component/point"
import { retrieve } from "../../service/service.crud"

export const useComponent = <T extends { point: Point }>(url: string) => {
    const [ order, setOrder ] = useState<number>(0)
    const [ state, setState ] = useState<T>(Object)
    const [ list, setList ] = useState<T[]>([])
    const [ pointList, setPointList ] = useState<Point[]>([])

    useEffect(()=> {
        get()
    }, [])
    const add = () => {
        setPointList([...pointList, initialPoint])
    }
    const get = async () => {
        await retrieve(url, 0, 1000, 'id', undefined).then((data: any) => {
            startTransition(() => setList(data.content))
        })
        fillPointList()
    }
    const fillPointList = () => {
        let points: Point[] = []
        list.forEach((element) => {
            points.push(element?.point)
        });
        setPointList(points)
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
            setPointList([
                ...pointList.slice(0, order),
                {...pointList[order], [event.target.name]: [Number(event.target.value), pointList[order].coordinates[1]]},
                ...pointList.slice(order + 1),
            ])
        }
    }
    const handleChangeLatitude = (event: ChangeEvent<HTMLInputElement>) => {
        setPointList([
            ...pointList.slice(0, order),
            {...pointList[order], [event.target.name]: [pointList[order].coordinates[0], Number(event.target.value)]},
            ...pointList.slice(order + 1),
        ])
    }
    const remove = () => {
        pointList.splice(order, 1)
    }
    return {
        state,
        list,
        pointList,
        add,
        get,
        setOrder,
        setPointList,
        handleChange,
        handleChangeList,
        handleChangeLongitude,
        handleChangeLatitude,
        remove,
    }
}