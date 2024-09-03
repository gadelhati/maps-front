import { useEffect, useState } from "react"
import { api } from "../api/api"
import { initialPage, Page } from "../../component/page"

export const useRequest = <T extends Object>(url: string, value?: string, page?: number, size?: number, sort?: { key?: string, order?: string }) => {
    const [states, setStates] = useState<T[]>([])
    const [pageable, setPageable] = useState<Page>(initialPage)
    const controller = new AbortController();

    useEffect(()=>{
        retrieve()
        return (()=>{
            controller.abort()
        })
    }, [])
    const retrieve = async () => {
        await api.get<T>(value === undefined ? `/${url}` : `/${url}?value=${value}`,
            { params: { page: page, size: size, sort: sort === undefined ? undefined : `${sort?.key},${sort.order}` }}
        ).then((response: any)=> {
            setStates(response.data.content)
            setPageable(response.data.page)
        })
    }
    return { states, pageable, retrieve }
}