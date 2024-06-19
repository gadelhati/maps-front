import { vector } from "./menu"
import { retrieve } from '../../service/service.crud'

export const accessList = () => {
    
    let list: boolean[] = []
    vector.map((element: string[], index: number) => {
        retrieve(element[0], 20, 20, '', '').then((data: any) => {
            if (Array.isArray(data)) {
                list[index]=false
            }else {
                list[index]=true
            }
        }).catch(() => {})
    })
    return list
}