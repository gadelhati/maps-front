import { Route, HashRouter, Routes } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import { isValidToken } from "./service/service.token"

import { AuthProvider } from "./component/auth/auth.provider";
import { GenericForm } from "./container/page/generic.form";
import { Home } from "./container/page//home";
import { LeafletMap } from "./container/maps/leaflet.map";
import { Login } from "./container/page/login/login";
import { NotAllowed } from "./container/page/not.allowed";
import { Profile } from "./container/page/profile";
import { SideList } from "./container/template/sidebar/side.list";

import { initialBlind } from "./component/blind/blind";
import { initialChart } from "./component/chart/chart";
import { initialChartArea } from "./component/chart_area/chart_area";
import { initialCity } from "./component/city/city";
import { initialCountry } from "./component/country/country";
import { initialGaugeStation } from "./component/gauge_station/gauge_station";
import { initialMaritimeArea } from "./component/maritime_area/maritime_area";
import { initialRole } from "./component/role/role";
import { initialState } from "./component/state/state";
import { initialUser } from "./component/user/user";
import './routes.css'
import { initialStock } from "./component/stock/stock";
import { initialPerson } from "./component/person/person";
import { initialProduct } from "./component/product/product";
import { initialAddress } from "./component/address/address";
import { initialLot } from "./component/lot/lot";
import { initialOrder } from "./component/order/order";
import { initialOrderItem } from "./component/order_item/order_item";
import { Wms } from "./container/wms/wms";

export const ROLES = {
    'USER': '7c12004d-e843-4e00-be40-01845ad75834',
    'MODERATOR': '52c57a80-4e3b-4a41-a864-58d0cea25b14',
    'ADMIN': '8652ec73-0a53-433c-93be-420f1d90c681',
    'VIEWER': '55c16ae7-b918-4b31-b920-deb4af049075',
    'OPERATOR': '83366ed6-b0f2-4ef3-9658-e8bd9a8e3d39',
    'REVIEWER': 'b8b37d04-628d-4939-b200-2a5e48909cd9',
    'VERIFIER': '927c96c5-6884-433a-9479-836efbb1ed87',
}

export default function AppRoutes() {

    return (
        <HashRouter>
            <AuthProvider>
                <div className='routes all'>
                    {isValidToken() && <SideList />}
                    <div className='routes main'>
                        <Routes>
                            <Route path="*" element={<Login />}></Route>
                            <Route path="/" element={<Login />}></Route>
                            <Route path="/notAllowed" element={<NotAllowed />}></Route>
                            <Route path="/wms" element={<Wms />}></Route>
                            <Route path="/stock" element={<GenericForm key='stock' object={initialStock} url={'stock'} />}></Route>
                            <Route path="/person" element={<GenericForm key='person' object={initialPerson} url={'person'} />}></Route>
                            <Route path="/product" element={<GenericForm key='product' object={initialProduct} url={'product'} />}></Route>
                            <Route path="/address" element={<GenericForm key='address' object={initialAddress} url={'address'} />}></Route>
                            <Route path="/lot" element={<GenericForm key='lot' object={initialLot} url={'lot'} />}></Route>
                            <Route path="/order" element={<GenericForm key='order' object={initialOrder} url={'order'} />}></Route>
                            <Route path="/orderItem" element={<GenericForm key='orderItem' object={initialOrderItem} url={'orderItem'} />}></Route>
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
        </HashRouter>
    )
}