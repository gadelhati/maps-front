import { useEffect, useState } from "react"
import { useRequest } from "../../assets/hook/useRequest"
import { intialSearch, Search } from "../../component/search"
import { DataTable } from "./DataTable";
import { useInput } from "../../assets/hook/useInput";
import '../template/inputgroup.css'
import { usePosition } from "../../assets/hook/usePosition";
import './position.css'
// https://html-css-js.com/css/generator/transform/
// https://css-tricks.com/almanac/properties/t/transform/#rotate
// https://kushagra.dev/blog/css-only-3d-card/

interface Data<T extends Object> {
    object: T,
    url: string,
}

export const GenericComponent = <T extends Object>(object: Data<T>) => {
    const controller = new AbortController();
    // const [isInterface] = useIsInterface<T, User>(initialRole, initialUser)
    const { state: search, handleInput: handleSearch } = useInput<Search>(intialSearch)
    const { states, pageable, retrieve } = useRequest<T>(object.url, search.value, search.page, search.size, { key: search.key, order: search.order })
    // const { position } = usePosition()
    const [ position, setPosition] = useState<{ x: number, y: number }>({ x:0, y:0 })
    const box = document.querySelector("body") as HTMLInputElement | null
    const [ movement, setMovement ] = useState({
        backgroundColor: 'lightblue',
        // height: `${position.x}%`,
        // width: `${position.y}%`,
        transform: `perspective(1000px) rotateX(${position.y}deg)`,
        boxShadow: `${position.x}px ${position.y}px 21px 5px rgba(0,0,0,0.54)`,
    })

    useEffect(() => {
        retrieve(object.url)
        move()
        callParalax()
        return (() => {
            controller.abort()
        })
    }, [search])
    const callParalax = () => {
        if (box !== null) {
            box.addEventListener("mousemove", setParalax, false);
        }
    }
    const setParalax = (event: any) => {
        if (box !== null) {
            let abcissa: number = Math.floor((event.pageX * 100)/box?.offsetWidth -50)
            let ordenada: number = Math.floor((event.pageY * 100)/box?.offsetHeight -50)

            setPosition({ x: ordenada/2, y: abcissa/2 })
            setMovement({
                backgroundColor: `rgb(${event.clientX % 255}, ${event.clientY % 255}, 150)`,
                // height: `${position.x}%`,
                // width: `${position.y}%`,
                // transform: `skew(${position.y}rad)`,
                transform:
                    `perspective(1000px) rotateY(${abcissa}deg) rotateX(${ordenada*-1}deg)`,
                boxShadow: `${abcissa*-1}px ${ordenada*-1}px 21px 5px rgba(0,0,0,0.54)`,
            });
        }
    }
    // const handleMouseMove = (event: React.MouseEvent<HTMLDialogElement>) => {
    //     setMovement({
    //         backgroundColor: `rgb(${event.clientX % 255}, ${event.clientY % 255}, 150)`,
    //         // height: `${position.x}%`,
    //         // width: `${position.y}%`,
    //         // transform: `skew(${position.y}rad)`,
    //         transform: `rotateX(${position.y}deg) rotateY(-${position.x}deg)`
    //     });
    // };
    const move = () => {
        let box1 = document.querySelector("body") as HTMLInputElement | null
        // box1?.setAttribute("style", `height: ${position.x}%`);
        if(box1?.style !== null && box1?.style.height !== null) {
            // box1?.style?.height = position.x
        }
        // box1?.setAttribute("style", `color: red`);
        // let elem = document?.getElementById('dial') as HTMLInputElement | null
        // setStyleAttribute(elem, {'font-size':'12px', color: 'red', 'margin-top': '5px'});
    }
    const showModal = () => {
        (document.querySelector('#dial') as HTMLDialogElement).showModal()
    }
    return (
        <>
            {/* <select key={Math.random()} name={'key'} onChange={handleInputChange} value={search.key} >
                {states[0] !== undefined && Object.keys(states[0])?.map(((result: any) => {
                    return <option key={Math.random()} value={result}>{result}</option>
                }))}
            </select> */}
            {/* FIND ON DATA TABLE */}
            {intialSearch !== undefined && Object.entries(search).map(([key, value]: [string, any]) => {
                return <span key={key + 'span'} className={'inputgroup tooltip'} data-tip={[]} style={{ display: 'flex' }}>
                    <input key={key} type={typeof value} name={key} value={value} onChange={handleSearch} placeholder={key} ></input>
                    <label htmlFor={key}>{key}</label>
                </span>
            })}
            {/* <dialog open={true} id="dial" style={{ height: `${position.x}%` }} > */}
            {/* <dialog open={true} id="dial" onMouseMove={(event)=>handleMouseMove(event)} style={{...movement}} > */}
            <dialog id="dial" style={{...movement}} >
                <div /*style={{...movement}} */>
                    {JSON.stringify(movement)}
                    {JSON.stringify(position.x)}{" | "}
                    {JSON.stringify(position.y)}
                </div>
            </dialog>
            <button onClick={showModal}>dialogue</button>
            <DataTable object={object.object} list={states} pageable={pageable} search={search} url={object.url} />
        </>
    )
}