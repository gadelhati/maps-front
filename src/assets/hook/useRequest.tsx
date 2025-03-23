import { useCallback, useEffect, useState } from "react"
import { ErrorMessage } from "../error/errorMessage"
import { initialErrorMessage } from "../error/errorMessage.initial"
import { initialPageable, Pageable } from "../../component/pageable"
import { api } from "../api/api"
import { Search } from "../../component/search"

export const useRequest = <T extends Object>(url: string, search: Search) => {
    const [states, setStates] = useState<T[]>([])
    const [pageable, setPageable] = useState<Pageable>(initialPageable)
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])

    useEffect(() => {
        const controller = new AbortController();
        request(url, search, controller.signal).catch(()=>{});
        return (() => {
            controller.abort()
        })
    }, [search])
    const request = useCallback(async (url: string, search?: Search, signal?: AbortSignal ) => {
        if(search?.page === undefined && search?.size === undefined){
            return await api.get<T>(`/${url}`)
            .then((response: any) => { setObject(response) })
            .catch(error => { return setError(error) })
        } else if (search?.sort?.order === undefined) {
            return await api.get<T>(`/${url}?value=${search?.value}`, { params: { page: search?.page, size: search?.size }, signal } )
                .then((response: any) => { setObject(response) })
            } else {
                return await api.get<T>(`/${url}?value=${search?.value}`, { params: { page: search?.page, size: search?.size, sort: `${search?.sort?.key},${search?.sort?.order}` }, signal } )
                .then((response: any) => { setObject(response) })
            }
    }, [url, search])
    const setObject = (response: any) => {
        if (response.data.content.length !== 0) {
            setStates(response.data.content)
            setPageable(response.data.page)
        }
    }
    return { states, pageable, error, request }
}