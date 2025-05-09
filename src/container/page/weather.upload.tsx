import { useState, ChangeEvent, useTransition } from 'react';
import { Button } from '../template/button/button';
import { createAll, retrieve } from '../../service/service.crud';
// import { initialErrorMessage } from '../../assets/error/errorMessage.initial';
// import { ErrorMessage } from '../../assets/error/errorMessage';
// import '../template/upload.css'
import { initialSearch } from '../../component/search';

export const WeatherUpload = <T extends { id: string, name: string }>(object: any) => {
    const [state, setState] = useState<T[]>([object.object])
    // const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [ispending, startTransition] = useTransition()

    const createAllItems = () => {
        createAll<T>('weather', state).then(() => {
            retrieveItem()
            refresh()
        })
    }
    const retrieveItem = async () => {
        await retrieve("weather", initialSearch).then((obj: any) => {
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
        const weathers : T[] = []
        const fileReader = new FileReader()
        fileReader.readAsText(event.target.files?.[0] as File)
        fileReader.onload = (event) => {
            const fileAsText = event.target?.result
            if (typeof fileAsText === 'string') {
                let itens: T[] = JSON.parse(fileAsText.toString());
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