import { initialRole } from "../role/role";
// import { Privilege } from '../privilege/privilege.interface';
import { Role } from '../role/role';

export interface User {
	readonly id: string,
	username: string,
	email: string,
    password: string,
	active: boolean,
	role: Role[]
}

export const initialUser: User = {
	id: '',
	username: '',
	email: '',
	password: '',
	active: true,
	role: [initialRole]
}