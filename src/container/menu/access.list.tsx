import { vector } from "./menu"
import { retrieve } from '../../service/service.crud'
import { Search } from "../../component/search"

export const accessList = () => {
    
    let list: boolean[] = []
    vector.map((element: string[], index: number) => {
        let searched: Search = {page: 20, size: 20, sort: {key: '', order: 'ASC'}, value: ''}
        retrieve(element[0], searched).then((data: any) => {
            if (Array.isArray(data)) {
                list[index]=false
            }else {
                list[index]=true
            }
        }).catch(() => {})
    })
    return list
}