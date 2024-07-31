import { useContext } from "react";
import { AuthContext } from "./useProvider";

export const useAuth = () => {
    return useContext(AuthContext);
}