import { initialRole } from "./role";
// import { Privilege } from './privilege.interface';
import { Role } from './role';

export interface User {
	readonly id: string,
	username: string,
	email: string,
    password: string,
	totpKey: string,
	active: boolean,
	role: Role[]
}

export const initialUser: User = {
	id: '',
	username: '',
	email: '',
	password: '',
	totpKey: '',
	active: true,
	role: [initialRole]
}