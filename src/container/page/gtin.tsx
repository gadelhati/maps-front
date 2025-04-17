import { useEffect, useState } from "react"

export const Gtin = () => {
    const [state, setState] = useState(0)
    useEffect(()=>{
        setState(checkDigit('0789119301007'))
    })
    const checkDigit = (vector: string):number => {
        const digits = vector.toString().split('').reverse().map(Number);
        const total = digits.map((digit, index) => 
            index % 2 === 0 ? digit * 3 : digit
        ).reduce((sum, value) => sum + value, 0);
        const remainder = total % 10;
        return remainder === 0 ? 0 : 10 - remainder;
    }
    return (
        <>{JSON.stringify(state)}</>
    )
}