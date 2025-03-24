import { Hateoas } from "./hetoas"

export interface ChartArea extends Hateoas {
    readonly id: string,
    name: string,
}
export interface ChartAreaValidation {
    readonly id: string,
    readonly name: string,
}
export const initialChartAreaValidation: ChartAreaValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[a-zA-Z0-9]+$`,
}
export const initialChartArea : ChartArea = {
    id: '',
    name: '',
    links: {
        rel: '',
        href: '',
    },
}