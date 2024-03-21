export const SubAtributeSet = (initial: Object) => {
    var subAtributes: Object[][]
    subAtributes = []

    subAtributes.shift()
    Object.keys(initial).map(([key]) => {
        subAtributes.push([key])
    })
    return subAtributes
}