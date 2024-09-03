import { ChangeEvent, useEffect, useState } from "react"
import { useRequest } from "../assets/hook/useRequest"
import { intialSearch, Search } from "../component/search"
import { DataTable } from "./DataTable";
import './template/inputgroup.css'

export interface Url {
    url: string,
}

export const TestComponent = <T extends Object>(object: Url) => {
    const controller = new AbortController();
    // const [state, setState] = useState<T>()
    // const [isInterface] = useIsInterface<T, User>(initialRole, initialUser)
    const [search, setSearch] = useState<Search>(intialSearch)
    const {states, pageable, retrieve} = useRequest<T>(object.url, search.value, search.page, search.size, { key: search.key, order: search.order})

    useEffect(()=>{
        retrieve()
        return (()=>{
            controller.abort()
        })
    }, [search])
    const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        // if (new RegExp(event.target.pattern).test(event.target.value) || event.target.value === '') { 
            setSearch({...search, page: 0, [event.target.name]: value})
        // }
    }
    return (
        <>
            <select key={Math.random()} name={'key'} onChange={handleInputChange} value={search.key} >
                {states[0] !== undefined && Object.keys(states[0])?.map(((result: any) => {
                    return <option key={Math.random()} value={result}>{result}</option>
                }))}
            </select>
            {Object.entries(search).map(([key, value]: any)=>{
                return <span key={key + 'span'} className={'inputgroup tooltip'} data-tip={[]} style={{ display: 'flex' }}>
                    <input key={key} type={typeof value} name={key} value={value} onChange={handleInputChange} placeholder={key} ></input>
                    <label htmlFor={key}>{key}</label>
                </span>    
            })}
            <DataTable list={states} pageable={pageable} search={search} />
        </>
    )
}