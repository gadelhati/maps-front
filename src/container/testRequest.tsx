import { useEffect } from "react"
import { useRequest } from "../assets/hook/useRequest"
import { intialSearch, Search } from "../component/search"
import { DataTable } from "./DataTable";
import { useInput } from "../assets/hook/useInput";
import './template/inputgroup.css'

interface Url<T extends Object> {
    url: string,
    object: T,
}

export const TestComponent = <T extends Object>(object: Url<T>) => {
    const controller = new AbortController();
    // const [isInterface] = useIsInterface<T, User>(initialRole, initialUser)
    const { state: search, setState: setSearch, handleInput: handleSearch } = useInput<Search>(intialSearch)
    const { states, pageable, retrieve } = useRequest<T>(object.url, search.value, search.page, search.size, { key: search.key, order: search.order })

    useEffect(() => {
        retrieve()
        return (() => {
            controller.abort()
        })
    }, [search])
    return (
        <>
            {/* <select key={Math.random()} name={'key'} onChange={handleInputChange} value={search.key} >
                {states[0] !== undefined && Object.keys(states[0])?.map(((result: any) => {
                    return <option key={Math.random()} value={result}>{result}</option>
                }))}
            </select> */}
            {/* FIND ON DATA TABLE */}
            {intialSearch !== undefined && Object.entries(search).map(([key, value]: [string, any]) => {
                return <span key={key + 'span'} className={'inputgroup tooltip'} data-tip={[]} style={{ display: 'flex' }}>
                    <input key={key} type={typeof value} name={key} value={value} onChange={handleSearch} placeholder={key} ></input>
                    <label htmlFor={key}>{key}</label>
                </span>
            })}
            <DataTable object={object.object} list={states} pageable={pageable} search={search} />
        </>
    )
}