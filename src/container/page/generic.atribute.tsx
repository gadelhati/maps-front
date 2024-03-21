import { initialAtribute } from "../../component/atribute/atribute.initial";

export const AtributeSet = <T extends Object>(initial: T) => {
    var atributes: [{ type: string, worth: any }]
    atributes = [initialAtribute]

    let type_name: string
    atributes.shift()
    Object.entries(initial).map(([key, value]) => {
        if (key === 'password')
            type_name = 'password'
        else if (key === 'id')
            type_name = 'hidden'
        else if (typeof value === 'boolean')
            type_name = 'checkbox'
        else if (typeof value === 'number')
            type_name = 'number'
        else if (value === undefined)
            type_name = 'undefined'
        else if (typeof value.getMonth === 'function')
            type_name = 'date'
        else if (Array.isArray(value))
            type_name = 'array'
        else if (typeof value === 'object')
            type_name = 'object'
        else
            type_name = 'text'
        atributes.push({ type: type_name, worth: value })
    })
    return atributes
}