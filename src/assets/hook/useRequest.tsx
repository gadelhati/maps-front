import { useCallback, useEffect, useState } from "react"
import { ErrorMessage } from "../error/errorMessage"
import { initialErrorMessage } from "../error/errorMessage.initial"
import { initialResponse, Response } from "../../component/response"
import { api } from "../api/api"
import { Search } from "../../component/search"

export const useRequest = (url: string, search: Search) => {
    const [response, setResponse] = useState<Response>(initialResponse)
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])

    useEffect(() => {
        const controller = new AbortController();
        request(url, search, controller.signal).catch(()=>{});
        return (() => {
            controller.abort()
        })
    }, [url, search])

    const request = useCallback(async (url: string, search?: Search, signal?: AbortSignal ) => {
        if(search?.page === undefined && search?.size === undefined){
            return await api.get<Response>(`/${url}`)
            .then((response: any) => { setResponse(response.data) })
            .catch(error => { return setError(error) })
        } else if (search?.sort?.order === undefined) {
            return await api.get<Response>(`/${url}?value=${search?.value}`, { params: { page: search?.page, size: search?.size }, signal } )
                .then((response: any) => { setResponse(response.data) })
                .catch(error => { return setError(error) })
            } else {
                return await api.get<Response>(`/${url}?value=${search?.value}`, { params: { page: search?.page, size: search?.size, sort: `${search?.sort?.key},${search?.sort?.order}` }, signal } )
                .then((response: any) => { setResponse(response.data) })
                .catch(error => { return setError(error) })
            }
    }, [url, search])

    return { response, error, request }
}