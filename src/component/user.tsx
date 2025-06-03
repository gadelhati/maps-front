import { Identifiable, initialHateoas } from './identifiable'
import { initialRole, Role } from './role'

export interface User extends Identifiable {
	readonly id: string,
	username: string,
	email: string,
    password: string,
	active: boolean,
	role: Role[]
}
export interface UserValidation {
	readonly id: string,
	readonly username: string,
	readonly email: string,
    readonly password: string,
	readonly active: string,
	readonly role: string,
}
export const initialUserValidation: UserValidation = {
	id: `^[a-zA-Z0-9]+$`,
	username: `^[a-zA-Z0-9]+$`,
	email: `^[a-zA-Z0-9]+$`,
	password: `^[a-zA-Z0-9]+$`,
	active: `^[a-zA-Z0-9]+$`,
	role: `^[a-zA-Z0-9]+$`,
}
export const initialUser: User = {
	id: '',
	links: initialHateoas,
	username: '',
	email: '',
	password: '',
	active: true,
	role: [initialRole],
}

export interface UserAuth {
	username: string,
    password: string,
	totpKey: string,
	version: Date,
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
	version: new Date(),
}