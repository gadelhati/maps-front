interface Page {
    size: number,
	number: number,
	totalElements: number,
	totalPages: number,
}
const initialPage: Page = {
	size: 0,
	number: 0,
	totalElements: 0,
	totalPages: 0,
}
export interface Response {
	content: [],
	page: Page
}
export const initialResponse: Response = {
	content: [],
	page: initialPage
}