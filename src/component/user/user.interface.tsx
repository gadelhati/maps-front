// import { Privilege } from '../privilege/privilege.interface';
import { Role } from '../role/role.interface';

export interface User {
	readonly id: string,
	username: string,
	email: string,
    password: string,
	active: boolean,
	role: Role[]
}