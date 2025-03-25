export interface Auth {
    readonly accessToken: string,
	refreshToken: string,
	tokenType: string,
	role: []
}

export const initialAuth : Auth = {
    accessToken: '',
	refreshToken: '',
	tokenType: '',
	role: []
}