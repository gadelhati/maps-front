import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"

export const useHook = <T extends Object>(state: T) => {
    const [ hook, setHook ] = useState<T>(state)
    useEffect(() => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            setHook({...hook, [event.target.name]: event.target.value })
        }
        document.addEventListener('change', ()=>handleChange)
        return (() => {
            document.removeEventListener('change', ()=>handleChange)
        })
    }, [hook])
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setHook({...hook, [event.target.name]: event.target.value })
        return hook
    }
    return { hook, setHook, handleChange }
}