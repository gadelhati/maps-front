import { useRequest } from "../../assets/hook/useRequest"
import { initialSearch, Search } from "../../component/search"
import { DataTable, DataTableContent } from "./DataTable";
import { useInput } from "../../assets/hook/useInput";
import '../template/inputgroup.css'
import { Identifiable } from "../../component/identifiable";
import { useState } from "react";
import { initialPrivilege, initialPrivilegeValidation } from "../../component/privilege";
import { initialRole, initialRoleValidation } from "../../component/role";
import { initialChart, initialChartValidation } from "../../component/chart";
import { initialAddress, initialAddressValidation } from "../../component/address";
import { initialBlindSignal, initialBlindSignalValidation } from "../../component/blindSignal";
import { initialChartArea, initialChartAreaValidation } from "../../component/chartArea";
import { initialCity, initialCityValidation } from "../../component/city";
import { initialCountry, initialCountryValidation } from "../../component/country";
import { initialGaugeStation, initialGaugeStationValidation } from "../../component/gaugeStation";
import { initialItem, initialItemValidation } from "../../component/item";
import { initialLot, initialLotValidation } from "../../component/lot";
import { initialMaritimeArea, initialMaritimeAreaValidation } from "../../component/maritimeArea";
import { initialOrder, initialOrderValidation } from "../../component/order";
import { initialOrderItem, initialOrderItemValidation } from "../../component/orderItem";
import { initialPerson, initialPersonValidation } from "../../component/person";
import { initialPoint, initialPointValidation } from "../../component/point";
import { initialPolygon, initialPolygonValidation } from "../../component/polygon";
import { initialProvider, initialProviderValidation } from "../../component/provider";
import { initialState, initialStateValidation } from "../../component/state";
import { initialStock, initialStockValidation } from "../../component/stock";
import { initialUser, initialUserValidation } from "../../component/user";
import './generic.component.css'

interface Data<T extends Object, V extends Object> {
    url: string,
    object: T,
    validator: V,
}

export const GenericComponent = <T extends Identifiable, V extends Object>(generic: Data<T, V>) => {
    
    const { state , handleInput } = useInput<Search>(initialSearch)
    const [ data, setData ] = useState<DataTableContent<Identifiable, Object>>(({url: generic.url, object: generic.object, validator: initialPrivilege, search: state, onChangeSearch: handleInput }))
    const { response, request } = useRequest(data.url, state )

    const setObject = (name: string) => {
        setOptions(name)
        setData(prev => ({...prev, request: request, response: response }));
    }
    const setOptions = (name: string) => {
        switch(name) {
            case 'address': setData(prev => ({...prev, 
                url: 'address', object: initialAddress, validator: initialAddressValidation}));
                break;
            case 'blindSignal': setData(prev => ({...prev, 
                url: 'blindSignal', object: initialBlindSignal, validator: initialBlindSignalValidation}));
                break;
            case 'chart': setData(prev => ({...prev, 
                url: 'chart', object: initialChart, validator: initialChartValidation}));
                break;
            case 'chartArea': setData(prev => ({...prev, 
                url: 'chartArea', object: initialChartArea, validator: initialChartAreaValidation}));
                break;
            case 'city': setData(prev => ({...prev, 
                url: 'city', object: initialCity, validator: initialCityValidation}));
                break;
            case 'country': setData(prev => ({...prev, 
                url: 'country', object: initialCountry, validator: initialCountryValidation}));
                break;
            case 'gaugeStation': setData(prev => ({...prev, 
                url: 'gaugeStation', object: initialGaugeStation, validator: initialGaugeStationValidation}));
                break;
            case 'item': setData(prev => ({...prev, 
                url: 'item', object: initialItem, validator: initialItemValidation}));
                break;
            case 'lot': setData(prev => ({...prev, 
                url: 'lot', object: initialLot, validator: initialLotValidation}));
                break;
            case 'maritimeArea': setData(prev => ({...prev, 
                url: 'maritimeArea', object: initialMaritimeArea, validator: initialMaritimeAreaValidation}));
                break;
            case 'order': setData(prev => ({...prev, 
                url: 'order', object: initialOrder, validator: initialOrderValidation}));
                break;
            case 'orderItem': setData(prev => ({...prev, 
                url: 'orderItem', object: initialOrderItem, validator: initialOrderItemValidation}));
                break;
            case 'person': setData(prev => ({...prev, 
                url: 'person', object: initialPerson, validator: initialPersonValidation}));
                break;
            case 'point': setData(prev => ({...prev, 
                url: 'point', object: initialPoint, validator: initialPointValidation}));
                break;
            case 'polygon': setData(prev => ({...prev, 
                url: 'polygon', object: initialPolygon, validator: initialPolygonValidation}));
                break;
            case 'privilege': setData(prev => ({...prev, 
                url: 'privilege', object: initialPrivilege, validator: initialPrivilegeValidation}));
                break;
            case 'provider': setData(prev => ({...prev, 
                url: 'provider', object: initialProvider, validator: initialProviderValidation}));
                break;
            case 'role': setData(prev => ({...prev, 
                url: 'role', object: initialRole, validator: initialRoleValidation}));
                break;
            case 'state': setData(prev => ({...prev, 
                url: 'state', object: initialState, validator: initialStateValidation}));
                break;
            case 'stock': setData(prev => ({...prev, 
                url: 'stock', object: initialStock, validator: initialStockValidation}));
                break;
            case 'user': setData(prev => ({...prev, 
                url: 'user', object: initialUser, validator: initialUserValidation}));
                break;
            default: setData(prev => ({...prev, 
                url: 'chart', object: initialChart, validator: initialChartValidation}));
                break;
        }
        return data
    }
    return (
        <>
            <select id="header" onChange={(event)=>setObject(event.target.value)}>
                <option value={'chart'}>Chart</option>
                <option value={'chartArea'}>Chart Area</option>
                <option value={'city'}>City</option>
                <option value={'country'}>Country</option>
                <option value={'gaugeStation'}>Gauge Station</option>
                <option value={'maritimeArea'}>Maritime Area</option>
                <option value={'privilege'}>Privilege</option>
                <option value={'role'}>Role</option>
                <option value={'state'}>State</option>
                <option value={'user'}>User</option>
            </select>
            <DataTable url={data.url} object={data.object} validator={data.validator} search={state} onChangeSearch={handleInput} response={response} request={request} />
        </>
    )
}