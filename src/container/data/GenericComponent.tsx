import { useRequest } from "../../assets/hook/useRequest"
import { initialSearch, Search } from "../../component/search"
import { DataTable } from "./DataTable";
import { useInput } from "../../assets/hook/useInput";
import '../template/inputgroup.css'
import { Identifiable } from "../../component/identifiable";

interface Data<T extends Object, V extends Object> {
    url: string,
    object: T,
    validator: V,
}

export const GenericComponent = <T extends Identifiable, V extends Object>(generic: Data<T, V>) => {
    
    const { state , handleInput } = useInput<Search>(initialSearch)
    const { response, request } = useRequest(generic.url, state )

    return (
        <DataTable url={generic.url} object={generic.object} validator={generic.validator} search={state} onChangeSearch={handleInput} response={response} request={request} />
    )
}