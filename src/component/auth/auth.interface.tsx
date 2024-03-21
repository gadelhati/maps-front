export interface Auth {
    readonly accessToken: string,
	tokenType: string,
	username: string,
	roles: []
}