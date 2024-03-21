import { useState, ChangeEvent, useTransition } from 'react';
import { Button } from '../button/button';
import { Weather } from '../../../component/weather/weather.interface';
import { initialWeather } from '../../../component/weather/weather.initial';
import { createAll, retrieve } from '../../../service/service.crud';
// import { initialErrorMessage } from '../../assets/error/errorMessage.initial';
// import { ErrorMessage } from '../../assets/error/errorMessage';
import './upload.css'

export const WeatherUpload = () => {
    const [state, setState] = useState<Weather[]>([initialWeather])
    // const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [ispending, startTransition] = useTransition()

    const createAllItems = () => {
        createAll<Weather>('weather', state).then(() => {
            retrieveItem()
            refresh()
        })
    }
    const retrieveItem = async () => {
        await retrieve("weather", 0, 20, '', '').then((obj: any) => {
            startTransition(() => setState(obj?.ok))
        })
    }
    const refresh = () => {
        window.location.reload()
    }
    // const executed = (): boolean => {
    //     let executed: boolean = false
    //     error?.map((element: any) => { if("" == element.field) return executed = true })
    //     return executed
    // }
    const handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
        const weathers : Weather[] = []
        const fileReader = new FileReader()
        fileReader.readAsText(event.target.files?.[0] as File)
        fileReader.onload = (event) => {
            const fileAsText = event.target?.result
            if (typeof fileAsText === 'string') {
                let itens: Weather[] = JSON.parse(fileAsText.toString());
                itens.forEach((item, index) => {
                    weathers[index] = item
                })
            } else {
                console.log("This file cannot be used!")
            }
        };
        setState(weathers)
    }
    return (
        <div>
            <input className='find' type="file" onChange={handleInputFile} ></input>
            <Button disabled={ispending ? true : false} category="success" function={createAllItems} name='Upload'/>
            <Button disabled={true} hidden={ispending ? false : true} name='Carregando'/>
            {/* <Button disabled={true} hidden={executed()? false : true}>Executado</Button> */}
        </div>
    );
}