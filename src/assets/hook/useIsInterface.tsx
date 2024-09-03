import { useEffect, useState } from "react";

export const useIsInterface = <T extends Object, S extends Object>(one: T, two: S) => {
    const [ state, setState] = useState<boolean>(true)
    useEffect(()=>{
        // const isObject = () => {
            Object.entries(one).forEach(([key])=>{
                if(!(key in two)) { setState(false) }
            })
        // }
        // isObject()
    })
    return [ state ]
}