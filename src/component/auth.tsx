export interface Auth {
    readonly accessToken: string,
	tokenType: string,
	username: string,
	roles: []
}

export const initialAuth : Auth = {
    accessToken: '',
	tokenType: '',
	username: '',
	roles: []
}