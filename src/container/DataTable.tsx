import { useRef, useState } from "react"
import { Search } from "../component/search"
import Modal, { ModalData } from "./Modal"
// import { Pageable } from "../component/pageable"
import { Page } from "../component/page"

interface Data<T extends Object> {
    object: T,
    list: T[],
    search: Search,
    // pageable: Pageable,
    pageable: Page,
    url: string,
}

export const DataTable = <T extends Object>(data: Data<T>) => {
    const [state, setState] = useState(data.object)
    const modalRef = useRef<ModalData>(null)

    const showType = (content: any) => {
        switch (typeof content) {
            case 'boolean': {
                return content ? 'true' : 'false'
            }
            case 'string': {
                return content
            }
            // number, undefined, typeof value.getMonth === 'function'
            // case 'function' : {
            //     return new Date(content)
            // }
            case 'object': {
                return Array.isArray(content) ? content[0].name : content.name
            }
            default: { return null }
        }
    }
    const newItem = () => {
        show(data.object)
    }
    const show = (row: T) => {
        setState(row)
        if(modalRef.current) {
            modalRef.current.showModal()
        }
    }
    return (
        <>
        <button onClick={newItem}>New</button>
        <Modal object={state} ref={modalRef} url={data.url} />
        <table>
            <thead>
                <tr key={Math.random()} >
                    {data.list[0] !== undefined &&
                        Object.keys(data.list[0]).map((column: string) => {
                            return <th key={Math.random()} >{column}</th>
                        })}
                </tr>
            </thead>
            <tbody>
                {data.list.map((row: T) => {
                    return <tr key={Math.random()} onClick={() => show(row)}>{Object.values(row).map((column: any) => {
                        return <td key={Math.random()} >{showType(column)}</td>
                    })}</tr>
                })}
            </tbody>
            <tfoot>
                {/* <tr key={Math.random()} >Total Elements: {data.pageable.totalElements}</tr> */}
                {/* <tr key={Math.random()} >Total Elements: {data.pageable.page.totalElements}</tr> */}
            </tfoot>
        </table>
        </>
    )
}