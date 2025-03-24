import { Route, BrowserRouter, Routes } from "react-router-dom";
import { isValidToken } from "./service/service.token"

import { AuthProvider } from "./assets/hook/useProvider";
import { Home } from "./container/page/home";
import { LeafletMap } from "./container/maps/leaflet.map";
import { Login } from "./container/page/login/login";
import { NotAllowed } from "./container/page/not.allowed";
import { Profile } from "./container/page/profile";
import { SideList } from "./container/page/side.list";

import { initialBlindSignal, initialBlindSignalValidation } from "./component/blindSignal";
import { initialChart, initialChartValidation } from "./component/chart";
import { initialChartArea, initialChartAreaValidation } from "./component/chartArea";
import { initialCity, initialCityValidation } from "./component/city";
import { initialCountry, initialCountryValidation } from "./component/country";
import { initialGaugeStation, initialGaugeStationValidation } from "./component/gaugeStation";
import { initialMaritimeArea, initialMaritimeAreaValidation } from "./component/maritimeArea";
import { initialRole, initialRoleValidation } from "./component/role";
import { initialState, initialStateValidation } from "./component/state";
import { initialUser, initialUserValidation } from "./component/user";
import './container/template/routes.css'
import { initialStock, initialStockValidation } from "./component/stock";
import { initialPerson, initialPersonValidation } from "./component/person";
import { initialItem, initialItemValidation } from "./component/item";
import { initialAddress, initialAddressValidation } from "./component/address";
import { initialLot, initialLotValidation } from "./component/lot";
import { initialOrder } from "./component/order";
import { initialOrderItem, initialOrderItemValidation } from "./component/orderItem";
import { Wms } from "./container/page/wms";
import { GenericComponent } from "./container/data/GenericComponent";
import { RequireAuth } from "./assets/hook/useRequireAuth";
import { initialPrivilege, initialPrivilegeValidation } from "./component/privilege";
import { initialPolygon, initialPolygonValidation } from "./component/polygon";
import { initialPoint, initialPointValidation } from "./component/point";
import { initialProvider, initialProviderValidation } from "./component/provider";

export const ROLES = {
    'ADMIN': 'ADMIN',
    'MODERATOR': 'MODERATOR',
    'USER': 'USER',
    'VERIFIER': 'VERIFIER',
    'REVIEWER': 'REVIEWER',
    'OPERATOR': 'OPERATOR',
    'VIEWER': 'VIEWER',
}

export default function AppRoutes() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <div className='routes all'>
                    {isValidToken() && <SideList />}
                    <div className='routes main'>
                        <Routes>
                            <Route path="*" element={<Login />}></Route>
                            <Route path="/" element={<Login />}></Route>
                            <Route path="/notAllowed" element={<NotAllowed />}></Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                                <Route path="/user" element={<GenericComponent url={'user'} object={initialUser} validator={initialUserValidation} />}></Route>
                                <Route path="/role" element={<GenericComponent url={'role'} object={initialRole} validator={initialRoleValidation} />}></Route>
                                <Route path="/privilege" element={<GenericComponent url={'privilege'} object={initialPrivilege} validator={initialPrivilegeValidation} />}></Route>
                            </Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.OPERATOR, ROLES.REVIEWER, ROLES.VERIFIER]} />}>
                                <Route path="/wms" element={<Wms />}></Route>
                                <Route path="/addess" element={<GenericComponent url={'addess'} object={initialAddress} validator={initialAddressValidation} />}></Route>
                                <Route path="/item" element={<GenericComponent url={'item'} object={initialItem} validator={initialItemValidation} />}></Route>
                                <Route path="/lot" element={<GenericComponent url={'lot'} object={initialLot} validator={initialLotValidation} />}></Route>
                                <Route path="/order-item" element={<GenericComponent url={'orderItem'} object={initialOrderItem} validator={initialOrderItemValidation} />}></Route>
                                <Route path="/order" element={<GenericComponent url={'order'} object={initialOrder} validator={initialOrderItemValidation} />}></Route>
                                <Route path="/person" element={<GenericComponent url={'person'} object={initialPerson} validator={initialPersonValidation} />}></Route>
                                <Route path="/provider" element={<GenericComponent url={'provider'} object={initialProvider} validator={initialProviderValidation} />}></Route>
                                <Route path="/stock" element={<GenericComponent url={'stock'} object={initialStock} validator={initialStockValidation} />}></Route>
                            </Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]} />}>
                                <Route path="/home" element={<Home />}></Route>
                                <Route path="/profile" element={<Profile />}></Route>
                                <Route path="/leafletMap" element={<LeafletMap />}></Route>

                                <Route path="/blindSignal" element={<GenericComponent url={'blindSignal'} object={initialBlindSignal} validator={initialBlindSignalValidation} />}></Route>
                                <Route path="/chart" element={<GenericComponent url={'chart'} object={initialChart} validator={initialChartValidation} />}></Route>
                                <Route path="/chartArea" element={<GenericComponent url={'chartArea'} object={initialChartArea} validator={initialChartAreaValidation} />}></Route>
                                <Route path="/city" element={<GenericComponent url={'city'} object={initialCity} validator={initialCityValidation} />}></Route>
                                <Route path="/country" element={<GenericComponent url={'country'} object={initialCountry} validator={initialCountryValidation} />}></Route>
                                <Route path="/gaugeStation" element={<GenericComponent url={'gaugeStation'} object={initialGaugeStation} validator={initialGaugeStationValidation} />}></Route>
                                <Route path="/maritimeArea" element={<GenericComponent url={'maritimeArea'} object={initialMaritimeArea} validator={initialMaritimeAreaValidation} />}></Route>
                                <Route path="/state" element={<GenericComponent url={'state'} object={initialState} validator={initialStateValidation} />}></Route>
                                <Route path="/point" element={<GenericComponent url={'point'} object={initialPoint} validator={initialPointValidation} />}></Route>
                                <Route path="/polygon" element={<GenericComponent url={'polygon'} object={initialPolygon} validator={initialPolygonValidation} />}></Route>
                            </Route>
                        </Routes>
                    </div>
                </div>
            </AuthProvider>
        </BrowserRouter>
    )
}