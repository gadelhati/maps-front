export interface Search {
    page: number,
    size: number,
    sort: {
        key: string,
        order: 'ASC' | 'DESC',
    },
    value: string,
}
export const initialSearch: Search = {
    page: 0,
    size: 15,
    sort: {
        key: 'id',
        order: 'ASC',
    },
    value: '',
}