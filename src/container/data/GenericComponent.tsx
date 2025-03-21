import { useRequest } from "../../assets/hook/useRequest"
import { initialSearch, Search } from "../../component/search"
import { DataTable } from "./DataTable";
import { useInput } from "../../assets/hook/useInput";
import '../template/inputgroup.css'

interface Data<T extends Object, S extends Object> {
    object: T,
    validation: S,
    url: string,
}

export const GenericComponent = <T extends Object, S extends Object>(object: Data<T, S>) => {
    
    const { state , handleInput } = useInput<Search>(initialSearch)
    const { states, pageable } = useRequest<T>(object.url, state )

    return (
        <>
        {JSON.stringify(state)}
        <DataTable object={object.object} validation={object.validation} list={states} pageable={pageable} search={state} url={object.url} function={handleInput} />
        </>
    )
}