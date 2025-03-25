import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./useProvider";

export const useAuth = () => {
    return useContext(AuthContext);
}

export const RequireAuth = ({ allowedRoles }: any) => {
    const { role, accessToken } = useAuth();
    const location = useLocation();

    return (
        role?.find((role: any) => allowedRoles?.includes(role))
            ? <Outlet />
            : accessToken
                ? <Navigate to="/notAllowed" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}