import { ButtonHTMLAttributes } from "react"

export const GButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({name, ...props}) => {
    return (
        <div className="ginput">
            <button {...props} name={name} id={name} ></button>
            {/* {name && <label htmlFor={name}>{name.charAt(0)+name.slice(1)}</label>} */}
        </div>
    )
}