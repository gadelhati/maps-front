import { useRef, useState } from "react"
import { Search } from "../../component/search"
import Modal, { ModalData } from "./Modal"
import { Pageable } from "../../component/pageable"
import '../template/table.css'
import { GButton } from "./button"
import { GInput } from "./input"

interface Data<T extends Object, V extends Object> {
    object: T,
    validation: V,
    list: T[],
    search: Search,
    pageable: Pageable,
    url: string,
    function: any,
}
export const DataTable = <T extends Object, V extends Object>(data: Data<T, V>) => {
    const [state, setState] = useState<T>(data.object)
    const modalRef = useRef<ModalData>(null)

    const handleStateChange = (updatedState: T) => {
        setState(updatedState)
    }
    const showType = (content: any) => {
        if(content === null) {
            return 'null'
        }
        if(typeof content.getMonth === 'function') {
            return 'date'
        }
        switch (typeof content) {
            case 'boolean': {
                return content ? 'true' : 'false'
            }
            case 'number': {
                return content
            }
            case 'string': {
                return content
            }
            case 'function' : {
                return new Date(content)
            }
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
    const filterVisibleColumns = (columns: string[]) => {
        return columns.filter(column => column !== 'id' && column !== 'links');
    }
    const filterVisibleValues = (row: T) => {
        const entries = Object.entries(row);
        const filteredEntries = entries.filter(([key]) => key !== 'id' && key !== 'links');
        return filteredEntries.map(([_, value]) => value);
    }
    return (
        <>
            <GButton onClick={newItem}>New</GButton>
            <Modal object={state} validation={data.validation} ref={modalRef} url={data.url} onStateChange={handleStateChange} />
            <table>
                <thead>
                    <tr>
                        <td>{data.search.sort.key}</td>
                        <td><GInput name={'value'} value={data.search.value} onChange={data.function}></GInput></td>
                    </tr>
                    <tr key={Math.random()} data-name={'sort.order'} data-value={data.search.sort.order === 'ASC' ? 'DESC' : 'ASC'} onClick={data.function} >
                        {data.list[0] !== undefined &&
                            filterVisibleColumns(Object.keys(data.list[0])).map((column: string) => {
                                return <>
                                    <th key={column}>
                                        <div data-name={'sort.key'} data-value={column} onClick={data.function}>{column}</div>
                                    </th>
                                </>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.list.map((row: T) => {
                        return <tr key={Math.random()} onClick={() => show(row)}>
                            {filterVisibleValues(row).map((column: any) => {
                                return <td key={Math.random()} >{showType(column)}</td>
                            })}
                        </tr>
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                        <select name={'size'} value={data.search.size} onChange={data.function}>
                            <option value={5}>5</option>
                            <option value={15}>15</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        </td>
                        <td><GButton name={'page'} onClick={data.function} value={0} disabled={data.search.page <= 0}>{"<<"}</GButton></td>
                        <td>{data.search.page > 0 &&
                            <GButton name={'page'} onClick={data.function} value={Number(data.search.page) - 1}>{Number(data.search.page)}</GButton>
                        }</td>
                        <td><GButton name={'page'} onClick={data.function} value={data.search.page}>{Number(data.search.page) + 1}</GButton></td>
                        <td>{data.search.page < data?.pageable?.totalPages - 1 &&
                            <GButton name={'page'} onClick={data.function} value={Number(data.search.page) + 1}>{Number(data.search.page) + 2}</GButton>
                        }</td>
                        <td><GButton
                            name={'page'}
                            onClick={data.function}
                            value={Number(data?.pageable?.totalPages) - 1}
                            disabled={data.search.page >= data?.pageable?.totalPages - 1}>
                            {">>"}
                        </GButton></td>
                    </tr>
                    <tr key={'totalPages'} ><td>Total Elements: {data.pageable.totalElements}</td></tr>
                </tfoot>
            </table>
        </>
    )
}