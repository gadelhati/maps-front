import { Route, BrowserRouter, Routes } from "react-router-dom";
import { isValidToken } from "./service/service.token"

import { AuthProvider } from "./assets/hook/useProvider";
import { GenericForm } from "./container/page/generic.form";
import { Home } from "./container/page/home";
import { LeafletMap } from "./container/maps/leaflet.map";
import { Login } from "./container/page/login/login";
import { NotAllowed } from "./container/page/not.allowed";
import { Profile } from "./container/page/profile";
import { SideList } from "./container/page/side.list";

import { initialBlind } from "./component/blind";
import { initialChart } from "./component/chart";
import { initialChartArea } from "./component/chart_area";
import { initialCity } from "./component/city";
import { initialCountry, initialCountryValidation } from "./component/country";
import { initialGaugeStation } from "./component/gauge_station";
import { initialMaritimeArea } from "./component/maritime_area";
import { initialRole } from "./component/role";
import { initialState } from "./component/state";
import { initialUser } from "./component/user";
import './container/template/routes.css'
import { initialStock } from "./component/stock";
import { initialPerson } from "./component/person";
import { initialItem } from "./component/item";
import { initialAddress } from "./component/address";
import { initialLot } from "./component/lot";
import { initialOrder } from "./component/order";
import { initialOrderItem } from "./component/order_item";
import { Wms } from "./container/page/wms";
import { GenericComponent } from "./container/data/GenericComponent";
import { RequireAuth } from "./assets/hook/useRequireAuth";

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
                                <Route path="/grole" element={<GenericComponent object={initialCountry} validation={initialCountryValidation} url={'country'} />}></Route>
                                <Route path="/wms" element={<Wms />}></Route>
                                <Route path="/stock" element={<GenericForm key='stock' object={initialStock} url={'stock'} />}></Route>
                                <Route path="/person" element={<GenericForm key='person' object={initialPerson} url={'person'} />}></Route>
                                <Route path="/item" element={<GenericForm key='item' object={initialItem} url={'item'} />}></Route>
                                <Route path="/address" element={<GenericForm key='address' object={initialAddress} url={'address'} />}></Route>
                                <Route path="/lot" element={<GenericForm key='lot' object={initialLot} url={'lot'} />}></Route>
                                <Route path="/order" element={<GenericForm key='order' object={initialOrder} url={'order'} />}></Route>
                                <Route path="/orderItem" element={<GenericForm key='orderItem' object={initialOrderItem} url={'orderItem'} />}></Route>
                            </Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                                <Route path="/user" element={<GenericForm key='user' object={initialUser} url={'user'} />}></Route>
                                <Route path="/role" element={<GenericForm key='role' object={initialRole} url={'role'} />}></Route>
                            </Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.OPERATOR, ROLES.REVIEWER, ROLES.VERIFIER]} />}>
                                <></>
                            </Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]} />}>
                                <Route path="/home" element={<Home />}></Route>
                                <Route path="/profile" element={<Profile />}></Route>
                                <Route path="/leafletMap" element={<LeafletMap />}></Route>

                                <Route path="/blind" element={<GenericForm key='blind' object={initialBlind} url={'blind'} />}></Route>
                                <Route path="/chart" element={<GenericForm key='chart' object={initialChart} url={'chart'} />}></Route>
                                <Route path="/chart-area" element={<GenericForm key='chart-area' object={initialChartArea} url={'chartArea'} />}></Route>
                                <Route path="/city" element={<GenericForm key='city' object={initialCity} url={'city'} />}></Route>
                                <Route path="/country" element={<GenericForm key='country' object={initialCountry} url={'country'} />}></Route>
                                <Route path="/gauge-station" element={<GenericForm key='gauge-station' object={initialGaugeStation} url={'gaugeStation'} />}></Route>
                                <Route path="/maritime-area" element={<GenericForm key='maritime-area' object={initialMaritimeArea} url={'maritimeArea'} />}></Route>
                                <Route path="/state" element={<GenericForm key='state' object={initialState} url={'state'} />}></Route>
                            </Route>
                        </Routes>
                    </div>
                </div>
            </AuthProvider>
        </BrowserRouter>
    )
}