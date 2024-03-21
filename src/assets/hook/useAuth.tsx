import { useContext } from "react";
import { AuthContext } from "../../component/auth/auth.provider";

export const useAuth = () => {
    return useContext(AuthContext);
}