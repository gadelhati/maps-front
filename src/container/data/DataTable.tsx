import { useEffect, useRef, useState } from "react"
import { Search } from "../../component/search"
import Modal, { ModalData } from "./Modal"
import { Response } from "../../component/response"
// import '../template/table.css'
import { GButton } from "./GButton"
import { QRCodeSVG } from "qrcode.react"
import { Identifiable } from "../../component/identifiable"
import { useInput } from "../../assets/hook/useInput"
// import { createToast, toastDetails } from '../page/toast.message'

export interface DataTableContent<T extends Object, V extends Object> {
    url: string,
    object: T,
    validator: V,
    search: Search,
    onChangeSearch: any,
    response?: Response,
    request?: any,
}

export const DataTable = <T extends Identifiable, V extends Object>(data: DataTableContent<T, V>) => {
    const { state, setState, handleInput, handleSelect, handleMultiSelect } = useInput<T>(data.object)
    const modalRef = useRef<ModalData>(null)
    const [refreshTrigger, setRefreshTrigger] = useState<boolean>(true)

    useEffect(() => {
        data.search.page = 0
    }, [data.search.value])
    useEffect(() => {
        data.request(data.url, data.search)
    }, [refreshTrigger])
    const showType = (content: any) => {
        if (content === null) {
            return ''
        }
        if (typeof content.getMonth === 'function') {
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
            case 'function': {
                return new Date(content)
            }
            case 'object': {
                return Array.isArray(content) ? showObject(content[0]) : showObject(content)
            }
            default: { return null }
        }
    }
    const showObject = (content: Record<string, any>) => {
        if (content.hasOwnProperty('href')) {
            return content?.href
        } else if (content.hasOwnProperty('coordinates')) {
            return content?.coordinates
        } else if (content.hasOwnProperty('name')) {
            return content?.name
        }
    }
    const newItem = () => {
        show(data.object)
    }
    const show = (row: T) => {
        setState(row)
        if (modalRef.current) {
            modalRef.current.showModal()
        }
    }
    const filterVisibleColumns = (columns: string[]) => {
        return columns.filter(column => column !== 'id');
    }
    const filterVisibleValues = (row: T) => {
        const entries = Object.entries(row);
        const filteredEntries = entries.filter(([key]) => key !== 'id');
        return filteredEntries.map(([_, value]) => value);
    }
    const handleActionComplete = () => {
        setRefreshTrigger(!refreshTrigger);
        data.request(data.url, data.search);
    }
    return (
        <>
            <Modal 
                url={data.url} 
                object={state} 
                validator={data.validator} 
                onObjectChange={setState} 
                handleInput={handleInput} 
                handleSelect={handleSelect} 
                handleMultiSelect={handleMultiSelect}
                ref={modalRef}
                onActionComplete={handleActionComplete}
            />
            <table>
                <thead>
                    <tr>
                        <th colSpan={Object.keys(data.object).length - 2}>
                            <select name={'sort.key'} value={data.search.sort.key} onChange={data.onChangeSearch}>
                                {filterVisibleColumns(Object.keys(data.object)).map((element) =>{
                                    return <option key={`option-${element}`} value={element}>{element}</option>
                                })}
                            </select>
                            <input name={'value'} value={data.search.value} onChange={data.onChangeSearch}></input>
                        </th>
                        <th>
                            <GButton onClick={newItem}>New</GButton>
                        </th>
                    </tr>
                    <tr key={'header-sorting-row'} data-name={'sort.order'} data-value={data.search.sort.order === 'ASC' ? 'DESC' : 'ASC'} onClick={data.onChangeSearch} >
                        {data?.response?.content !== undefined &&
                            filterVisibleColumns(Object.keys(data.object)).map((column: string, index) => {
                                return <th key={column+index}>
                                        <div data-name={'sort.key'} data-value={column} onClick={data.onChangeSearch}>{column}</div>
                                    </th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {data?.response?.content?.map((row: T) => {
                        return <tr key={row.id} onClick={() => show(row)}>
                            {filterVisibleValues(row).map((column: any, index: number) => {
                                if (Array.isArray(column) && column[0].hasOwnProperty('href')) { 
                                    return (<td key={`${row.id}-${index}`}>
                                            <a href={showType(column)} target="_blank"><QRCodeSVG value={showType(column)}/></a>
                                        </td>)
                                } else { 
                                    return <td key={`${row.id}-${index}`}>{showType(column)}</td> 
                                }
                            })}
                        </tr>
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <select name={'size'} value={data.search.size} onChange={data.onChangeSearch}>
                                <option value={5}>5</option>
                                <option value={15}>15</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <GButton name={'page'} onClick={data.onChangeSearch} value={0} disabled={data.search.page <= 0}>{"<<"}</GButton>
                            {data.search.page > 0 &&
                                <GButton name={'page'} onClick={data.onChangeSearch} value={Number(data.search.page) - 1}>{Number(data.search.page)}</GButton>
                            }
                            <GButton name={'page'} onClick={data.onChangeSearch} value={data.search.page}>{Number(data.search.page) + 1}</GButton>
                            {data.response !== undefined && data.search.page < data?.response?.page?.totalPages - 1 &&
                                <GButton name={'page'} onClick={data.onChangeSearch} value={Number(data.search.page) + 1}>{Number(data.search.page) + 2}</GButton>
                            }
                            <GButton name={'page'} onClick={data?.onChangeSearch} value={data.response !== undefined ? data?.response?.page?.totalPages - 1 : ''} disabled={data.response !== undefined && data.search.page >= data?.response?.page?.totalPages - 1}>{">>"}</GButton>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Total Elements: {data?.response?.page?.totalElements}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}