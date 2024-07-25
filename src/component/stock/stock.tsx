export interface Stock {
    readonly id: string,
    maximumBulk: number,
    currentBulk: number,
}

export const initialStock: Stock = {
    id: '',
    maximumBulk: 0,
    currentBulk: 0,
}