import { InputInterface, InputInterfaceString, InputInterfaceNumber, InputInterfaceBoolean } from "./input.interface"

export const SetAtributes = (initial: InputInterface) => {
    var value
    var valueString: InputInterfaceString
    var valueNumber: InputInterfaceNumber
    var valueBoolean: InputInterfaceBoolean

    value = JSON.parse(JSON.stringify(initial))

    if (typeof initial.value === 'string') {    
        valueString = JSON.parse(JSON.stringify(initial))
        value = valueString
    }if (typeof initial.value === 'number') {    
        valueNumber = JSON.parse(JSON.stringify(initial))
        value = valueNumber
    } else if (typeof initial.value === 'boolean') {
        valueBoolean = JSON.parse(JSON.stringify(initial))
        value = valueBoolean
    } else {
        value = JSON.parse(JSON.stringify(initial))
    }
    return value
}