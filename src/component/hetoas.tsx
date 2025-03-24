export interface Hateoas {
    links: {
        rel: string,
        href: string,
    },
}
export const initialHateoas : Hateoas = {
    links: {
        rel: '',
        href: '',
    },
}