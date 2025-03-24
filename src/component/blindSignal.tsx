import { Hateoas } from "./hetoas"

export interface BlindSignal extends Hateoas {
    readonly id: string,
    category: string,
}
export interface BlindSignalValidation {
    readonly id: string,
    readonly category: string,
}
export const initialBlindSignalValidation: BlindSignalValidation = {
    id: `^[a-zA-Z0-9]+$`,
    category: `^[a-zA-Z0-9]+$`,
}
export const initialBlindSignal : BlindSignal = {
    id: '',
    category: '',
    links: {
        rel: '',
        href: '',
    },
}