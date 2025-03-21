import { InputHTMLAttributes } from "react"

export const GInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({name, ...props}) => {
    return (
        <div className="ginput">
            <input required {...props} name={name} id={name} ></input>
            {name && <label htmlFor={name}>{name.charAt(0)+name.slice(1)}</label>}
        </div>
    )
}