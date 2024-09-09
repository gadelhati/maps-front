import { useEffect, useState } from "react"
import { api } from "../api/api"
import { initialPage, Page } from "../../component/page"
// import { initialPageable, Pageable } from "../../component/pageable"

export const useRequest = <T extends Object>(url: string, value?: string, page?: number, size?: number, sort?: { key?: string, order?: string }) => {
    const [states, setStates] = useState<T[]>([])
    // const [pageable, setPageable] = useState<Pageable>(initialPageable)
    const [pageable, setPageable] = useState<Page>(initialPage)
    const controller = new AbortController();

    useEffect(() => {
        retrieve(url)
        return (() => {
            controller.abort()
        })
    }, [])
    const retrieve = async (uri: string) => {
        await api.get<T>(value === undefined ? `/${uri}` : `/${uri}?value=${value}`,
            { params: { page: page, size: size, sort: sort === undefined ? undefined : `${sort?.key},${sort.order}` } }
        ).then((response: any) => {
            setStates(response.data.content)
            setPageable(response.data.page)
        })
    }
    return { states, setStates, pageable, retrieve }
}