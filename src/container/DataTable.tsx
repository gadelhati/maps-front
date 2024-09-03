import { useState } from "react"

export interface Data<T extends Object> {
    list: T[],
}

export const DataTable = (data: any) => {
    const [state, setState] = useState([])
    const show = (content: any) => {
        switch(typeof content) {
            case 'boolean' : {
                return content ? 'true' : 'false'
            }
            case 'string' : {
                return content
            }
            // number, undefined, typeof value.getMonth === 'function'
            // case 'function' : {
            //     return new Date(content)
            // }
            case 'object' : {
                return Array.isArray(content) ? content[0].name : content.name
            }
            default : { return null }
        }
    }
    return (
        <table>
            <thead>
                <tr>{JSON.stringify(state)}</tr>
                <tr key={Math.random()} >
                    {data.list[0] !== undefined &&
                        Object.keys(data.list[0]).map((column: string)=>{
                        return <th key={Math.random()} >{column}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {data.list.map((row: any)=>{
                    return <tr key={Math.random()} onClick={()=>setState(row)}>{Object.values(row).map((column: any)=>{
                        return <td key={Math.random()} >{show(column)}</td>
                    })}</tr>
                })}
            </tbody>
            <tfoot>
                <tr key={Math.random()} >Total Elements: {data.pageable.totalElements}</tr>
            </tfoot>
        </table>
    )
}