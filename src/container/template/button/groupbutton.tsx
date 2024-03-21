import './groupbutton.css'

interface IGroupButton {
    name: string,
}

export const GroupButtonT = (button: IGroupButton) => {
    return(
        <button typeof={button.name} className='group'/>
    )
}