import './button.css'

interface IButton {
    category?: string,
    name?: string,
    function?: any,
    hidden?: boolean,
    disabled?: boolean,
}

export const Button = (button: IButton) => {
    return(
        <button typeof={button.category} onClick={() => button.function()} hidden={button.hidden} disabled={button.disabled}>{button.name}</button>
    )
}