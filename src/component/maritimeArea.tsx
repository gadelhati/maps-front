import { Hateoas } from "./hetoas";
import { initialPolygon } from "./polygon";
import { Polygon } from "./polygon";

export interface MaritimeArea extends Hateoas {
    readonly id: string,
    code: string,
    name: string,
    start: string,
    finish: string,
    polygon: Polygon,
    multiPolygon: string,
}
export interface MaritimeAreaValidation {
    readonly id: string,
    readonly name: string,
    readonly privileges: string[],
}
export const initialMaritimeAreaValidation: MaritimeAreaValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[0-9]+$`,
    privileges: [`^[0-9]+$`],
}
export const initialMaritimeArea : MaritimeArea = {
    id: '',
    code: '',
    name: '',
    start: '',
    finish: '',
    polygon: initialPolygon,
    multiPolygon: '',
	links: {
        rel: '',
        href: '',
    },
}