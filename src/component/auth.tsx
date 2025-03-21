export interface Auth {
    readonly accessToken: string,
	refreshToken: string,
	tokenType: string,
	roles: []
}

export const initialAuth : Auth = {
    accessToken: '',
	refreshToken: '',
	tokenType: '',
	roles: []
}