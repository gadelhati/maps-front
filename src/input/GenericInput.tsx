import { useState } from 'react'
import '../pages/GoogleMap.scss'

export const GenericInput = (group: any) => {
    const [index, setIndex] = useState<number>(1)

    const indexs = (number: number) => {
        setIndex(number)
    }
    return (
        <>
            <div className='tabs'>
                <button className='tab' onClick={() => indexs(1)}>1</button>
                <button className='tab' onClick={() => indexs(2)}>2</button>
            </div>
            <div className={index === 1 ? 'inputgroup' : 'hide'}>
                <span className='prefix'><input hidden={group.hidden} type="checkbox" />1{group.prefix && group.prefix}</span>
                <input type={group.type}></input>
                <span className='suffix'>{group.suffix}</span>
            </div>

            <div className={index === 2 ? 'inputgroup' : 'hide'}>
                <span className='prefix'><input hidden={group.hidden} type="checkbox" />2{group.prefix && group.prefix}</span>
                <input type={group.type}></input>
                <span className='suffix'>{group.suffix}</span>
            </div>
        </>
    )
}