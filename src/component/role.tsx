import { Identifiable, initialHateoas } from "./identifiable"
import { initialPrivilege, Privilege } from "./privilege"

export interface Role extends Identifiable {
    readonly id: string,
    name: string,
    privilege: Privilege[]
}
export interface RoleValidation {
    readonly id: string,
    readonly name: string,
    readonly privilege: string,
}
export const initialRoleValidation: RoleValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[a-zA-Z0-9]+$`,
    privilege: `^[a-zA-Z0-9]+$`,
}
export const initialRole: Role = {
    id: '',
    links: initialHateoas,
    name: '',
    privilege: [initialPrivilege],
}