// import { initialPrivilege } from "../privilege/privilege.initial";
// import { Privilege } from "../privilege/privilege.interface";

export interface Role {
    readonly id: string,
    name: string,
    // privileges: Privilege[]
}

export const initialRole : Role = {
    id: '',
    name: '',
    // privileges: [initialPrivilege]
}