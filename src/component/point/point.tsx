export interface Point {
    readonly id: string,
    type: string,
    coordinates: [number, number],
}

export const initialPoint : Point = {
    id: '',
    type: '',
    coordinates: [0, 0],
}