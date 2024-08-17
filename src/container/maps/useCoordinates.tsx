import { Point, initialPoint } from "../../component/point"
import { ChangeEvent, useEffect, useState } from "react"

export const usePoint = () => {
    const [ order, setOrder ] = useState<number>(0)
    const [ pointList, setPointList ] = useState<Point[]>([initialPoint])

    useEffect(()=> {
        
    }, [pointList])
    const addPoint = () => {
        setPointList([...pointList, initialPoint])
    }
    const handleInputLongitude = (event: ChangeEvent<HTMLInputElement>) => {
        setPointList([
            ...pointList.slice(0, order),
            {...pointList[order], [event.target.name]: [Number(event.target.value), pointList[order].coordinates[1]]},
            ...pointList.slice(order + 1),
        ])
    }
    const handleInputLatitude = (event: ChangeEvent<HTMLInputElement>) => {
        setPointList([
            ...pointList.slice(0, order),
            {...pointList[order], [event.target.name]: [pointList[order].coordinates[0], Number(event.target.value)]},
            ...pointList.slice(order + 1),
        ])
    }
    const removePoint = () => {
        let rs = pointList.splice(order, 1)
        setPointList(rs)
    }
    const handle = () => {
        // setCount((prevCount) => prevCount + value)
    }
    return {
        pointList,
        addPoint,
        setOrder,
        handleInputLongitude,
        handleInputLatitude,
        removePoint,
        handle,
    }
}