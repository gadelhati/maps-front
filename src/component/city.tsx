import { initialState, State } from "./state";

export interface City {
    readonly id: string,
    code: string,
    name: string,
    state: State,
}

export const initialCity : City = {
    id: '',
    code: '',
    name: '',
    state: initialState,
}