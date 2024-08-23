import { ChangeEvent, startTransition, useEffect, useState } from "react"
import { initialPoint, Point } from "../../component/point"
import { retrieve } from "../../service/service.crud"

// export const add = <Point>(pointList: Point[], index: number): Point => {
//         let points: Point[] = pointList[index]
//         return points.push(initialPoint)
//         // setPointList([
//         //     ...pointList.slice(0, index),
//         //     points,
//         //     ...pointList.slice(index + 1)
//         // ])
//     }
    // export const get = async (url: string) => {
    //     let dataT: Point[] = []
    //     await retrieve(url, 0, 1000, 'id', undefined).then((data: any) => {
    //         dataT = data.content
    //     })
    //     fillPointList()
    //     return dataT
    // }
    // export const fillPointList = (list: Point[],index: number) => {
    //     let points: Point[] = []
    //     list[index]?.forEach((element) => {
    //         points.push(element?.point)
    //     });
    //     setPointList([...pointList.slice(0, index), points, ...pointList.slice(index + 1)])
    // }
    export const handleChange = <T,>(state: T, event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        if (new RegExp(event.target.pattern).test(event.target.value) || event.target.value === '') { 
            return {...state,[event.target.name]: value}
        }
    }
    export const handleChangeList = <T,>(list: T[], index: number, event: ChangeEvent<HTMLInputElement>) => {
        if (new RegExp(event.target.pattern).test(event.target.value) || event.target.value === '') {
            return [
                ...list.slice(0, index),
                [{...list[index], [event.target.name]: [event.target.value]}],
                ...list.slice(index + 1)
            ]
        }
    }
    // export const handleChangeLongitude = (event: ChangeEvent<HTMLInputElement>) => {
    //     // if (new RegExp(event.target.pattern).test(event.target.value) || event.target.value === '') {
    //         return [
    //             ...pointList.slice(0, index),
    //             [
    //                 ...pointList[index].slice(0, order),
    //                 {...pointList[index][order], [event.target.name]: [Number(event.target.value), pointList[index][order].coordinates[1]]},
    //                 ...pointList[index].slice(order + 1),
    //             ],
    //             ...pointList.slice(index + 1)
    //         ]
    //     // }
    // }
    // export const handleChangeLatitude = (event: ChangeEvent<HTMLInputElement>) => {
    //     return ([
    //             ...pointList[index].slice(0, order),
    //             {...pointList[index][order], [event.target.name]: [pointList[index][order].coordinates[0], Number(event.target.value)]},
    //             ...pointList[index].slice(order + 1),
    //         ])
    // }
    export const remove = (points: Point[], index: number) => {
        return points.splice(index, 1)
    }