interface HateoasLink {
    rel: string,
    href: string,
}
const initialHateoasLink : HateoasLink = {
    rel: '',
    href: '',
}
export interface Hateoas {
    links: HateoasLink,
}
export const initialHateoas : Hateoas = {
    links: initialHateoasLink,
}