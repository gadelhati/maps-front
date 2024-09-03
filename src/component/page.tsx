interface PageIn {
    size: number,
	number: number,
	totalElements: number,
	totalPages: number,
}

const initialPageIn: PageIn = {
	size: 0,
	number: 0,
	totalElements: 0,
	totalPages: 0,
}

export interface Page {
	content: [],
	page: PageIn
}

export const initialPage: Page = {
	content: [],
	page: initialPageIn
}