import { useEffect, useState } from "react"
import './ChartMenu.scss'
import mar from './../mark.json'

interface Chart {
    south: number,
    west: number,
    north: number,
    east: number
    image: File
}

export const ChartMenu = ({setShow}: any) => {
    const loop: number[] = [0, 1]
    const [chart, setChart] = useState<number>(0)

    useEffect(() => {

    }, [])
    const showMenu = (index: number) => {
        return index
    }
    const handleMouseEvent = (index: number) => {
        setChart(index)
    }
    const show = () => {
        setShow()
    }
    return (
        <div className="templatemenu">
            <div className="chartmenu">
                {loop.map((index: number) => (
                    <div key={index} onClick={()=>setShow(index)} className={chart > index ? "chartmenuitem left" : chart < index ? "chartmenuitem right" : "chartmenuitem center"} onMouseOver={() => handleMouseEvent(index)}>
                        <img src={mar[index].urlImage}></img><div className="name">{showMenu(index)}</div>
                    </div>
                ))}
                <span>aqui: {JSON.stringify(chart)}</span>
            </div>
        </div>
    )
}