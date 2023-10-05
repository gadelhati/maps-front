import { useEffect, useState } from "react"
import chart1511 from './../../assets/1511geotiff.png'
import './ChartMenu.scss'

interface Chart {
    south: number,
    west: number,
    north: number,
    east: number
    image: File
}

export const ChartMenu = () => {
    const loop: number[] = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    const [chart, setChart] = useState<number>(0)

    useEffect(() => {

    }, [])
    const showMenu = (index: number) => {
        return index
    }
    const handleMouseEvent = (index: number) => {
        setChart(index)
    }
    return (
        <div className="templatemenu">
            <div className="chartmenu">
                {loop.map((index: number) => (
                    <div className={chart > index ? "chartmenuitem left" : chart < index ? "chartmenuitem right" : "chartmenuitem center"} onMouseOver={() => handleMouseEvent(index)}>
                        <img src={chart1511}></img><div className="name">{showMenu(index)}</div>
                    </div>
                ))}
                <span>aqui: {JSON.stringify(chart)}</span>
            </div>
        </div>
    )
}