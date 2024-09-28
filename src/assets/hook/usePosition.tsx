import { useEffect, useState } from "react"

export const usePosition = () => {
    const [ position, setPosition] = useState<{ x: number, y: number }>({ x:0, y:0 })
    const controller = new AbortController();
    const box = document.querySelector("body") as HTMLInputElement | null

    useEffect(()=>{
        callParalax()
        return (()=>{
            controller.abort()
        })
    }, [position])
    const callParalax = () => {
        if (box !== null) {
            box.addEventListener("mousemove", setParalax, false);
        }
    }
    const setParalax = (event: any) => {
        if (box !== null) {
            setPosition({ x: Math.floor((event.pageX * 100)/box?.offsetWidth), y: Math.floor((event.pageY * 100)/box?.offsetHeight) })
        }
    }
    return { position }
}