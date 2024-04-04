import { Route, HashRouter, Routes } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import { isValidToken } from "./service/service.token"

import { GenericForm } from "./container/page/generic.form";
import { initialUser } from "./component/user/user.initial";
import { initialRole } from "./component/role/role.initial";
import { NotAllowed } from "./container/page/not.allowed";
import { AuthProvider } from "./component/auth/auth.provider";
import { Login } from "./container/page/login/login";
import { Home } from "./container/page//home";
import { Profile } from "./container/page/profile";
import { initialGaugeStation } from "./component/gauge_station/gauge_station.initial";
import { initialCountry } from "./component/country/country.initial";
import { initialCity } from "./component/city/city.initial";
import { initialBlind } from "./component/blind/blind.initial";
import { initialState } from "./component/state/state.initial";
import { SideList } from "./container/template/sidebar/side.list";
import { LeafletMap } from "./container/maps/leaflet.map";
import './routes.css'

export const ROLES = {
    'USER': '7c12004d-e843-4e00-be40-01845ad75834',
    'MODERATOR': '52c57a80-4e3b-4a41-a864-58d0cea25b14',
    'ADMIN': '8652ec73-0a53-433c-93be-420f1d90c681',
    'REVIEWER': 'b8b37d04-628d-4939-b200-2a5e48909cd9',
    'VERIFIER': '927c96c5-6884-433a-9479-836efbb1ed87',
    'OPERATOR': '83366ed6-b0f2-4ef3-9658-e8bd9a8e3d39',
    'VIEWER': '55c16ae7-b918-4b31-b920-deb4af049075',
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
                            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                                <Route path="/user" element={<GenericForm key='user' object={initialUser} url={'user'} />}></Route>
                                <Route path="/role" element={<GenericForm key='role' object={initialRole} url={'role'} />}></Route>
                            </Route>
                            <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]} />}>
                                <Route path="/home" element={<Home />}></Route>
                                <Route path="/profile" element={<Profile />}></Route>
                                <Route path="/leafletMap" element={<LeafletMap />}></Route>
                                <Route path="/blind" element={<GenericForm key='blind' object={initialBlind} url={'blind'} />}></Route>
                                <Route path="/gauge-station" element={<GenericForm key='gauge-station' object={initialGaugeStation} url={'gauge_station'} />}></Route>
                                <Route path="/city" element={<GenericForm key='city' object={initialCity} url={'city'} />}></Route>
                                <Route path="/state" element={<GenericForm key='state' object={initialState} url={'state'} />}></Route>
                                <Route path="/country" element={<GenericForm key='country' object={initialCountry} url={'country'} />}></Route>
                            </Route>
                        </Routes>
                    </div>
                </div>
            </AuthProvider>
        </HashRouter>
    )
}