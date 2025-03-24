import { Hateoas } from "./hetoas"

export interface Point extends Hateoas {
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
    type: '',
    coordinates: [0, 0],
	links: {
        rel: '',
        href: '',
    },
}