// import { initialPrivilege } from "./privilege.initial";
// import { Privilege } from "./privilege.interface";

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