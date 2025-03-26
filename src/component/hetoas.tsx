import { Identifiable } from "./identifiable"

interface HateoasLink {
    rel: string,
    href: string,
}
const initialHateoasLink : HateoasLink = {
    rel: '',
    href: '',
}
export interface Hateoas extends Identifiable {
    links: HateoasLink,
}
export const initialHateoas : Hateoas = {
    id: '',
    links: initialHateoasLink,
}