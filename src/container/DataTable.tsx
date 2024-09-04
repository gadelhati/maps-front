import { useInput } from "../assets/hook/useInput"
import { Search } from "../component/search"
import { Pageable } from "../component/pageable"

export interface Data<T extends Object> {
    object: T,
    list: T[],
    pageable: Pageable,
    search: Search,
}

export const DataTable = <T extends Object>(data: Data<T>) => {
    const { state: state1, setState: setState1, handleInput: handleInput1 } = useInput(data.object)
    const show = (content: any) => {
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
    return (
        <>
            {data.object !== undefined && Object.entries(state1).map(([key, value]: [string, any]) => {
                return <span key={key + 'span'} className={'inputgroup tooltip'} data-tip={[]} style={{ display: 'flex' }}>
                    <input key={key} type={typeof value} name={key} value={value} onChange={handleInput1} placeholder={key} ></input>
                    <label htmlFor={key}>{key}</label>
                </span>
            })}
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
                        return <tr key={Math.random()} onClick={() => setState1(row)}>{Object.values(row).map((column: any) => {
                            return <td key={Math.random()} >{show(column)}</td>
                        })}</tr>
                    })}
                </tbody>
                <tfoot>
                    <tr key={Math.random()} >Total Elements: {data.pageable.totalElements}</tr>
                </tfoot>
            </table>
        </>
    )
}