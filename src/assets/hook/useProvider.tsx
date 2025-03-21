import { createContext, useState } from "react";
import { getToken, isValidToken } from "../../service/service.token";
import { Auth, initialAuth } from "../../component/auth";

export const AuthContext = createContext<Auth>(initialAuth as Auth);

export const AuthProvider = ({ children }: any) => {
    const [state, ] = useState<Auth>(isValidToken() ? getToken() : initialAuth)

    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    )
}