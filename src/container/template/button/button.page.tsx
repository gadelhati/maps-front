import './button.page.css'

interface IButtonPage {
    name: string|number,
    function?: any,
    hidden?: boolean,
    disabled?: boolean,
}

export const ButtonPage = (button: IButtonPage) => {
    return(
        <button className='page' hidden={button.hidden} disabled={button.disabled} onClick={() => button.function()} >{button.name}</button>
    )
}