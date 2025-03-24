import { Hateoas } from './hetoas'
import { initialRole, Role } from './role'

export interface User extends Hateoas {
	readonly id: string,
	username: string,
	email: string,
    password: string,
	active: boolean,
	roles: Role[]
}
export interface UserValidation {
	readonly id: string,
	readonly username: string,
	readonly email: string,
    readonly password: string,
	readonly active: string,
	readonly roles: Role[],
}
export const initialUserValidation: UserValidation = {
	id: `^[a-zA-Z0-9]+$`,
	username: `^[a-zA-Z0-9]+$`,
	email: `^[a-zA-Z0-9]+$`,
	password: `^[a-zA-Z0-9]+$`,
	active: `^[a-zA-Z0-9]+$`,
	roles: [initialRole],
}
export const initialUser: User = {
	id: '',
	username: '',
	email: '',
	password: '',
	active: true,
	roles: [initialRole],
	links: {
        rel: '',
        href: '',
    },
}

export interface UserAuth {
	username: string,
    password: string,
	totpKey: string,
}
export interface UserAuthValidation {
	readonly username: string,
    readonly password: string,
	readonly totpKey: string,
}
export const initialUserAuthValidation: UserAuthValidation = {
	username: `^[a-zA-Z0-9]+$`,
	password: `^[a-zA-Z0-9]+$`,
	totpKey: `^[a-zA-Z0-9]+$`,
}
export const initialUserAuth: UserAuth = {
	username: '',
	password: '',
	totpKey: '',
}