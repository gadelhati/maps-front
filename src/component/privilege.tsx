import { Identifiable, initialHateoas } from "./identifiable"

export interface Privilege extends Identifiable {
    readonly id: string,
    name: string,
}
export interface PrivilegeValidation {
    readonly id: string,
    readonly name: string,
}
export const initialPrivilegeValidation: PrivilegeValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[a-zA-Z0-9]+$`,
}
export const initialPrivilege: Privilege = {
    id: '',
    links: initialHateoas,
    name: '',
}