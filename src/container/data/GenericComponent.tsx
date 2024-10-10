import { useEffect } from "react"
import { useRequest } from "../../assets/hook/useRequest"
import { intialSearch, Search } from "../../component/search"
import { DataTable } from "./DataTable";
import { useInput } from "../../assets/hook/useInput";
import '../template/inputgroup.css'
import { usePosition } from "../../assets/hook/usePosition";
// https://www.cssportal.com/css-clip-path-generator/

interface Data<T extends Object> {
    object: T,
    url: string,
}

export const GenericComponent = <T extends Object>(object: Data<T>) => {
    const controller = new AbortController();
    // const [isInterface] = useIsInterface<T, User>(initialRole, initialUser)
    const { state: search, handleInput: handleSearch } = useInput<Search>(intialSearch)
    const { states, pageable, retrieve } = useRequest<T>(object.url, search.value, search.page, search.size, { key: search.key, order: search.order })
    const { movement } = usePosition()

    useEffect(() => {
        retrieve(object.url)
        return (() => {
            controller.abort()
        })
    }, [search])
    const showModal = () => {
        (document.querySelector('#dial') as HTMLDialogElement).showModal()
    }
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
            <dialog id="dial" style={{...movement}} >
                <>Teste</>
                <div style={{ boxShadow: movement.boxShadow }}>
                    {JSON.stringify(movement)}
                </div>
            </dialog>
            <button onClick={showModal}>dialogue</button>
            <DataTable object={object.object} list={states} pageable={pageable} search={search} url={object.url} />
        </>
    )
}