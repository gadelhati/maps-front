import { Hateoas } from "./hetoas"

export interface Privilege extends Hateoas {
    readonly id: string,
    name: string,
}
export interface PrivilegeValidation {
    readonly id: string,
    readonly name: string,
}
export const initialPrivilegeValidation: PrivilegeValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[0-9]+$`,
}
export const initialPrivilege: Privilege = {
    id: '',
    name: '',
	links: {
        rel: '',
        href: '',
    },
}