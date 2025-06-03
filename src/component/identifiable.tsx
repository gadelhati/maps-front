export interface Identifiable {
    readonly id: string,
    links: Hateoas,
}

interface Hateoas {
    rel: string,
    href: string,
}

export const initialHateoas : Hateoas = {
    rel: '',
    href: '',
}

export const initialIdentifiable : Identifiable = {
    id: '',
    links: initialHateoas,
}