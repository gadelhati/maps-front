import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./assets/hook/useAuth";

export const RequireAuth = ({ allowedRoles }: any) => {
    const { username, roles } = useAuth();
    const location = useLocation();

    return (
        roles?.find((role: any) => allowedRoles?.includes(role))
            ? <Outlet />
            : username
                ? <Navigate to="/notAllowed" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}