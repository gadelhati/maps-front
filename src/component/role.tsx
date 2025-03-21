import { initialPrivilege, Privilege } from "./privilege"

export interface Role {
    readonly id: string,
    name: string,
    privileges: Privilege[]
}
export interface RoleValidation {
    readonly id: string,
    readonly name: string,
    readonly privileges: string[],
}
export const initialRoleValidation: RoleValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[0-9]+$`,
    privileges: [`^[0-9]+$`],
}
export const initialRole: Role = {
    id: '',
    name: '',
    privileges: [initialPrivilege],
}