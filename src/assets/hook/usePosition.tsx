import { useEffect, useState } from "react"
// https://html-css-js.com/css/generator/transform/
// https://css-tricks.com/almanac/properties/t/transform/#rotate
// https://kushagra.dev/blog/css-only-3d-card/
// https://polypane.app/css-3d-transform-examples/

export const usePosition = () => {
    const [ movement, setMovement ] = useState({
        backgroundColor: 'lightblue',
        transform: `perspective(1000px) rotateX(0deg)`,
        boxShadow: `0px 0px 21px 5px rgba(0,0,0,0.54)`,
    })
    const controller = new AbortController();
    const box = document.querySelector("body") as HTMLInputElement | null

    useEffect(()=>{
        callParalax()
        return (()=>{
            controller.abort()
        })
    }, [movement])
    const callParalax = () => {
        if (box !== null) {
            box.addEventListener("mousemove", setParalax, false);
        }
    }
    const setParalax = (event: any) => {
        if (box !== null) {
            let abcissa: number = Math.floor((event.pageX * 100)/box?.offsetWidth -50)
            let ordenada: number = Math.floor((event.pageY * 100)/box?.offsetHeight -50)
            setMovement({
                backgroundColor: `rgb(${event.clientX % 255}, ${event.clientY % 255}, 150)`,
                transform: `perspective(1000px) rotateY(${abcissa}deg) rotateX(${ordenada*-1}deg)`,
                boxShadow: `${abcissa*-1}px ${ordenada*-1}px 21px 5px rgba(0,0,0,0.54)`,
            });
        }
    }
    return { movement }
}