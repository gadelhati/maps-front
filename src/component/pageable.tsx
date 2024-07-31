export interface Pageable {
    content: [],
    pageable: {
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean
        },
        offset: number,
        pageNumber: number,
        pageSize: number,
        paged: boolean,
        unpaged: boolean
    },
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    first: boolean,
    numberOfElements: number,
    empty: boolean
}

export const initialPageable: Pageable = {
    content: [],
    pageable: {
        sort: {
            empty: true,
            sorted: false,
            unsorted: true
        },
        offset: 0,
        pageNumber: 0,
        pageSize: 0,
        paged: true,
        unpaged: false
    },
    last: false,
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
    sort: {
        empty: true,
        sorted: false,
        unsorted: true
    },
    first: true,
    numberOfElements: 3,
    empty: false
}