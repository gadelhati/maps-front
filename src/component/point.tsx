import { Identifiable, initialHateoas } from "./identifiable"

export interface Point extends Identifiable {
    readonly id: string,
    type: string,
    coordinates: [number, number],
}
export interface PointValidation {
    readonly id: string,
    readonly type: string,
    readonly coordinates: string,
}
export const initialPointValidation: PointValidation = {
    id: `^[a-zA-Z0-9]+$`,
    type: `^[a-zA-Z0-9]+$`,
    coordinates: `^[a-zA-Z0-9]+$`,
}
export const initialPoint : Point = {
    id: '',
    links: initialHateoas,
    type: '',
    coordinates: [0, 0],
}